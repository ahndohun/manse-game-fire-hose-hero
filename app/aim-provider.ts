// Aim-from-distance pose provider wrapper for Fire Hose Hero.
//
// Wraps the engine's createDefaultPoseProvider WITHOUT modifying the engine:
//  - kind "mediapipe": every emitted frame is transformed so the arm ray
//    (elbow -> wrist) is projected to a fixed-distance impact point, and BOTH
//    wrist landmarks are rewritten to that smoothed impact point. The engine's
//    standard touch_targets evaluator (limb "hands" reads left_wrist /
//    right_wrist via getLimbPoints, gated by min(visibility, presence) >= 0.45)
//    then scores the impact point unchanged.
//  - kind "simulated" / "replay": the default provider is returned untouched so
//    pointer control (player.setPointer) and E2E keep working byte-identically.

import {
  createDefaultPoseProvider,
  type PoseFrameListener,
  type PoseInputSource,
  type PoseProviderMetrics,
  type ProviderFactory,
  type ProviderFactoryOptions,
  type RuntimeLandmark,
  type RuntimePose,
  type RuntimePoseFrame,
  type RuntimePoseProvider,
} from "@manse/runtime-web";
import type { AimPoint, AimState } from "./aim-shared";

// --- Aim tuning: generous on purpose, tweak during the real-camera feel test ---

/** Impact = elbow + rayDir * armLength * this multiplier (fixed distance factor). */
const AIM_REACH_MULTIPLIER = 3.2;
/** EMA weight of the newest impact sample (0..1). Higher = snappier, lower = smoother. */
const AIM_EMA_ALPHA = 0.38;
/** Minimum min(visibility, presence) required on both elbow and wrist to trust an arm. */
const MIN_ARM_CONFIDENCE = 0.3;
/** Minimum elbow->wrist length (normalized) before the fresh ray direction is trusted. */
const MIN_ARM_LENGTH = 0.03;
/** Rewritten landmarks get at least this visibility/presence so the engine's 0.45 gate passes. */
const REWRITTEN_CONFIDENCE = 0.95;
/** Keep the projected impact point inside the stage with this margin. */
const STAGE_MARGIN = 0.02;

type ArmSide = "left" | "right";

interface ArmRay {
  side: ArmSide;
  confidence: number;
  wrist: AimPoint;
  impact: AimPoint;
}

/** Pick the most visible arm (elbow + wrist confidence) and project its ray. */
function pickAimRay(pose: RuntimePose): ArmRay | null {
  let best: ArmRay | null = null;
  for (const side of ["left", "right"] as const) {
    const elbow = pose.landmarks.find((landmark) => landmark.name === `${side}_elbow`);
    const wrist = pose.landmarks.find((landmark) => landmark.name === `${side}_wrist`);
    if (elbow === undefined || wrist === undefined) continue;
    const confidence = Math.min(
      Math.min(elbow.visibility, elbow.presence),
      Math.min(wrist.visibility, wrist.presence),
    );
    if (confidence < MIN_ARM_CONFIDENCE) continue;
    const dx = wrist.x - elbow.x;
    const dy = wrist.y - elbow.y;
    const length = Math.hypot(dx, dy);
    if (length < MIN_ARM_LENGTH) continue;
    const reach = length * AIM_REACH_MULTIPLIER;
    const candidate: ArmRay = {
      side,
      confidence,
      wrist: { x: wrist.x, y: wrist.y },
      impact: { x: elbow.x + (dx / length) * reach, y: elbow.y + (dy / length) * reach },
    };
    if (best === null || candidate.confidence > best.confidence) best = candidate;
  }
  return best;
}

/** Rewrite both wrists + the aiming hand's fingers to the impact point. */
function rewritePose(pose: RuntimePose, side: ArmSide, impact: AimPoint): RuntimePose {
  const handNames = new Set([
    "left_wrist",
    "right_wrist",
    `${side}_index`,
    `${side}_pinky`,
    `${side}_thumb`,
  ]);
  const landmarks: RuntimeLandmark[] = pose.landmarks.map((landmark) =>
    handNames.has(landmark.name)
      ? {
          ...landmark,
          x: impact.x,
          y: impact.y,
          visibility: Math.max(landmark.visibility, REWRITTEN_CONFIDENCE),
          presence: Math.max(landmark.presence, REWRITTEN_CONFIDENCE),
        }
      : landmark,
  );
  return { landmarks, score: pose.score };
}

function clampImpact(point: AimPoint): AimPoint {
  return {
    x: Math.min(1 - STAGE_MARGIN, Math.max(STAGE_MARGIN, point.x)),
    y: Math.min(1 - STAGE_MARGIN, Math.max(STAGE_MARGIN, point.y)),
  };
}

/**
 * RuntimePoseProvider decorator: transforms every emitted frame once, fans the
 * transformed frame out to subscribers, and reports the transformed frame from
 * getLatestFrame(). Everything else delegates to the wrapped engine provider.
 */
class AimPoseProvider implements RuntimePoseProvider {
  private readonly listeners = new Set<PoseFrameListener>();
  private readonly innerUnsubscribe: () => void;
  private latest: RuntimePoseFrame | null = null;
  private smoothed: AimPoint | null = null;

  constructor(
    private readonly inner: RuntimePoseProvider,
    private readonly aim: AimState,
  ) {
    this.innerUnsubscribe = inner.subscribe((frame) => this.handleFrame(frame));
  }

  get id(): string {
    return this.inner.id;
  }

  get kind(): "mediapipe" | "simulated" | "replay" {
    return this.inner.kind;
  }

  get state(): RuntimePoseProvider["state"] {
    return this.inner.state;
  }

  initialize(): Promise<void> {
    return this.inner.initialize();
  }

  async start(source?: PoseInputSource): Promise<void> {
    this.smoothed = null;
    this.latest = null;
    return this.inner.start(source);
  }

  pause(): void {
    this.inner.pause();
  }

  resume(): void {
    this.inner.resume();
  }

  stop(): Promise<void> {
    return this.inner.stop();
  }

  async destroy(): Promise<void> {
    this.innerUnsubscribe();
    this.listeners.clear();
    this.latest = null;
    await this.inner.destroy();
  }

  subscribe(listener: PoseFrameListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getLatestFrame(): RuntimePoseFrame | null {
    return this.latest;
  }

  getMetrics(): PoseProviderMetrics {
    return this.inner.getMetrics();
  }

  private handleFrame(frame: RuntimePoseFrame): void {
    const transformed = this.transformFrame(frame);
    this.latest = transformed;
    for (const listener of this.listeners) listener(transformed);
  }

  private transformFrame(frame: RuntimePoseFrame): RuntimePoseFrame {
    let bestPoseIndex = -1;
    let bestRay: ArmRay | null = null;
    frame.poses.forEach((pose, index) => {
      const ray = pickAimRay(pose);
      if (ray !== null && (bestRay === null || ray.confidence > bestRay.confidence)) {
        bestRay = ray;
        bestPoseIndex = index;
      }
    });
    // No confident arm this frame: pass the frame through unchanged so no
    // stale impact point can keep scoring while the player is out of view.
    if (bestRay === null) return frame;
    const ray: ArmRay = bestRay;

    const raw = ray.impact;
    this.smoothed = this.smoothed === null
      ? raw
      : {
          x: AIM_EMA_ALPHA * raw.x + (1 - AIM_EMA_ALPHA) * this.smoothed.x,
          y: AIM_EMA_ALPHA * raw.y + (1 - AIM_EMA_ALPHA) * this.smoothed.y,
        };
    const impact = clampImpact(this.smoothed);

    this.aim.endpoint = impact;
    this.aim.rawWrist = ray.wrist;
    this.aim.side = ray.side;
    this.aim.source = "camera";
    this.aim.updatedAtMs = performance.now();

    const poses: RuntimePose[] = frame.poses.map((pose, index) =>
      index === bestPoseIndex ? rewritePose(pose, ray.side, impact) : pose,
    );
    return { ...frame, poses };
  }
}

/**
 * Provider factory for createMansePlayer. Camera frames are rewritten to the
 * projected aim impact point; simulated/replay providers pass through exactly
 * as the engine builds them.
 */
export function createAimProviderFactory(aim: AimState): ProviderFactory {
  return async (options: ProviderFactoryOptions) => {
    const inner = await createDefaultPoseProvider(options);
    if (options.kind !== "mediapipe") return inner;
    return new AimPoseProvider(inner, aim);
  };
}
