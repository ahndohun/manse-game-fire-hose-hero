import type {
  RendererFactory,
  RendererFactoryOptions,
  RuntimeLandmark,
  RuntimePose,
  RuntimeRenderFrame,
  RuntimeRenderer,
  RuntimeTarget,
} from "@manse/runtime-web";
import type { AimState } from "./aim-shared";
import type { FireMissionState } from "./mission-state";

const MISSION_SECONDS = 90;
const TOTAL_FIRES = 12;
const FONT = '"Avenir Next", Avenir, "Segoe UI", system-ui, sans-serif';
const MONO = 'ui-monospace, "SFMono-Regular", Menlo, monospace';

type ParticleKind = "steam" | "water" | "spark";

interface Particle {
  readonly kind: ParticleKind;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly bornAtMs: number;
  readonly lifeMs: number;
  readonly size: number;
  readonly seed: number;
}

interface Size {
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
}

const COPY = {
  en: {
    unit: "FIREHOUSE 07",
    mission: "RESCUE IN PROGRESS",
    score: "SCORE",
    firesOut: "FIRES OUT",
    pressure: "HOSE PRESSURE",
    combo: "STEADY STREAM",
    alarm: "ALARM",
    waveLocations: ["GARAGE DOORS", "UPPER WINDOWS", "ROOFTOP RESCUE"],
    allClear: "ALL CLEAR",
    allClearBody: "Firehouse 07 is safe. Mission complete.",
    tryAgain: "REGROUP & RESPOND",
    tryAgainBody: "The alarm is still active. Take a breath and try again.",
    waveClear: "AREA SECURED",
    cameraReady: "LOCAL CAMERA · LIVE",
    simulatorReady: "POINTER TRAINING · LIVE",
  },
  ko: {
    unit: "소방서 07",
    mission: "구조 작전 진행 중",
    score: "점수",
    firesOut: "진압한 불",
    pressure: "호스 압력",
    combo: "연속 진압",
    alarm: "출동",
    waveLocations: ["차고 입구", "위층 창문", "옥상 구조"],
    allClear: "진압 완료",
    allClearBody: "소방서 07이 안전해졌어요. 임무 성공입니다.",
    tryAgain: "숨 고르고 재출동",
    tryAgainBody: "아직 경보가 울리고 있어요. 잠깐 쉬고 다시 도전해요.",
    waveClear: "구역 확보",
    cameraReady: "기기 내 카메라 · 실행 중",
    simulatorReady: "포인터 훈련 · 실행 중",
  },
} as const;

export function createFireHoseRendererFactory(
  aim: AimState,
  mission: FireMissionState,
): RendererFactory {
  return (options) => new FireHoseRenderer(options, aim, mission);
}

class FireHoseRenderer implements RuntimeRenderer {
  readonly kind = "canvas2d" as const;
  readonly element: HTMLDivElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly hitIds = new Set<string>();
  private readonly particles: Particle[] = [];
  private lastImpactAtMs = -Infinity;
  private destroyed = false;

  constructor(
    private readonly options: RendererFactoryOptions,
    private readonly aim: AimState,
    private readonly mission: FireMissionState,
  ) {
    this.element = options.document.createElement("div");
    this.element.dataset.manseRenderer = "fire-hose-hero";
    this.element.setAttribute("role", "img");
    this.element.setAttribute("aria-label", "Fire Hose Hero augmented-reality play field");
    Object.assign(this.element.style, {
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: "320px",
      overflow: "hidden",
      background: "#071824",
      touchAction: "none",
    });
    this.canvas = options.document.createElement("canvas");
    this.canvas.setAttribute("aria-hidden", "true");
    Object.assign(this.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    const context = this.canvas.getContext("2d", { alpha: false });
    if (context === null) throw new Error("Canvas 2D is unavailable.");
    this.context = context;
    this.element.append(this.canvas);
    options.container.append(this.element);
  }

  render(frame: RuntimeRenderFrame): void {
    if (this.destroyed) return;
    const size = resize(this.element, this.canvas, frame.tier);
    const { context } = this;
    context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    context.clearRect(0, 0, size.width, size.height);

    this.captureImpacts(frame.targets, frame.timestampMs, size);
    const impactAge = frame.timestampMs - this.lastImpactAtMs;
    const shake = !frame.reducedStimulation && impactAge >= 0 && impactAge < 210
      ? Math.sin(impactAge * 0.19) * (1 - impactAge / 210) * 7
      : 0;

    context.save();
    context.translate(shake, shake * -0.45);
    if (frame.video !== null && frame.video.readyState >= 2) {
      drawVideoCover(context, frame.video, size, frame.mirror);
      drawCameraGrade(context, size);
    } else {
      drawFirehouseSet(context, size, frame.timestampMs, frame.reducedStimulation);
    }
    drawWorldFrame(context, size);
    drawFirefighterCostume(context, size, frame.poseFrame?.poses ?? [], frame.timestampMs);
    for (const target of frame.targets) {
      drawFireTarget(context, size, target, frame.timestampMs, frame.reducedStimulation);
    }
    this.drawParticles(frame.timestampMs, size, frame.reducedStimulation);
    context.restore();

    drawMissionHud(context, size, frame, this.aim, this.mission);
    drawWaveMoment(context, size, frame, this.mission);
    if (frame.caption !== null && this.mission.outcome === "active") {
      drawCaption(context, size, frame.caption);
    }
    drawOutcome(context, size, this.mission, frame.timestampMs, frame.reducedStimulation);
  }

  destroy(): void {
    this.destroyed = true;
    this.particles.length = 0;
    this.element.remove();
  }

  private captureImpacts(targets: readonly RuntimeTarget[], nowMs: number, size: Size): void {
    for (const target of targets) {
      if (!target.hit || this.hitIds.has(target.id)) continue;
      this.hitIds.add(target.id);
      this.lastImpactAtMs = nowMs;
      const x = target.x * size.width;
      const y = target.y * size.height;
      const amount = this.options.reducedStimulation ? 10 : 34;
      for (let index = 0; index < amount; index += 1) {
        const seed = hash(`${target.id}:${index}`);
        const angle = seeded(seed) * Math.PI * 2;
        const speed = 35 + seeded(seed + 11) * 155;
        const kind: ParticleKind = index % 5 === 0 ? "spark" : index % 3 === 0 ? "water" : "steam";
        this.particles.push({
          kind,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (kind === "steam" ? 75 : 10),
          bornAtMs: nowMs,
          lifeMs: 620 + seeded(seed + 17) * 680,
          size: 4 + seeded(seed + 23) * 12,
          seed,
        });
      }
    }
  }

  private drawParticles(nowMs: number, size: Size, reduced: boolean): void {
    const { context } = this;
    for (let index = this.particles.length - 1; index >= 0; index -= 1) {
      const particle = this.particles[index];
      if (particle === undefined) continue;
      const progress = (nowMs - particle.bornAtMs) / particle.lifeMs;
      if (progress >= 1) {
        this.particles.splice(index, 1);
        continue;
      }
      const time = (nowMs - particle.bornAtMs) / 1000;
      const gravity = particle.kind === "water" ? 230 : particle.kind === "spark" ? 160 : -18;
      const x = particle.x + particle.vx * time;
      const y = particle.y + particle.vy * time + gravity * time * time * 0.5;
      const alpha = Math.max(0, 1 - progress);
      context.save();
      context.globalAlpha = alpha * (reduced ? 0.6 : 1);
      if (particle.kind === "steam") {
        context.fillStyle = "#dff8ff";
        context.shadowColor = "rgba(214,248,255,.65)";
        context.shadowBlur = 16;
        context.beginPath();
        context.arc(x, y, particle.size * (0.75 + progress), 0, Math.PI * 2);
        context.fill();
      } else if (particle.kind === "water") {
        context.fillStyle = "#8fe6ff";
        context.beginPath();
        context.ellipse(x, y, particle.size * 0.34, particle.size, seeded(particle.seed) * Math.PI, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillStyle = "#ffd45e";
        context.translate(x, y);
        context.rotate(progress * 3 + particle.seed);
        context.fillRect(-particle.size * 0.12, -particle.size, particle.size * 0.24, particle.size * 2);
      }
      context.restore();
    }
    // Keep stale particles bounded on unusually long sessions.
    if (this.particles.length > 180) this.particles.splice(0, this.particles.length - 180);
    void size;
  }
}

function resize(element: HTMLElement, canvas: HTMLCanvasElement, tier: RuntimeRenderFrame["tier"]): Size {
  const width = Math.max(1, element.clientWidth || 960);
  const height = Math.max(1, element.clientHeight || 620);
  const deviceRatio = typeof devicePixelRatio === "number" ? devicePixelRatio : 1;
  const tierLimit = tier === "S" || tier === "A" ? 2 : tier === "B" ? 1.5 : 1;
  const dpr = Math.min(deviceRatio, tierLimit);
  const pixelWidth = Math.round(width * dpr);
  const pixelHeight = Math.round(height * dpr);
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  return { width, height, dpr };
}

function drawVideoCover(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  size: Size,
  mirror: boolean,
): void {
  const sourceWidth = Math.max(1, video.videoWidth || 1280);
  const sourceHeight = Math.max(1, video.videoHeight || 720);
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = size.width / size.height;
  let sx = 0;
  let sy = 0;
  let sw = sourceWidth;
  let sh = sourceHeight;
  if (sourceRatio > targetRatio) {
    sw = sourceHeight * targetRatio;
    sx = (sourceWidth - sw) / 2;
  } else {
    sh = sourceWidth / targetRatio;
    sy = (sourceHeight - sh) / 2;
  }
  context.save();
  if (mirror) {
    context.translate(size.width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(video, sx, sy, sw, sh, 0, 0, size.width, size.height);
  context.restore();
}

function drawCameraGrade(context: CanvasRenderingContext2D, size: Size): void {
  context.fillStyle = "rgba(4, 27, 40, .16)";
  context.fillRect(0, 0, size.width, size.height);
  const vignette = context.createRadialGradient(
    size.width * 0.5,
    size.height * 0.43,
    size.width * 0.08,
    size.width * 0.5,
    size.height * 0.48,
    size.width * 0.72,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.72, "rgba(2,17,26,.12)");
  vignette.addColorStop(1, "rgba(2,13,20,.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, size.width, size.height);
}

function drawFirehouseSet(
  context: CanvasRenderingContext2D,
  size: Size,
  nowMs: number,
  reduced: boolean,
): void {
  const sky = context.createLinearGradient(0, 0, 0, size.height);
  sky.addColorStop(0, "#153a52");
  sky.addColorStop(0.48, "#23657a");
  sky.addColorStop(1, "#0a2734");
  context.fillStyle = sky;
  context.fillRect(0, 0, size.width, size.height);

  const glow = context.createRadialGradient(size.width * 0.78, size.height * 0.22, 0, size.width * 0.78, size.height * 0.22, size.width * 0.38);
  glow.addColorStop(0, "rgba(255,211,112,.32)");
  glow.addColorStop(1, "rgba(255,211,112,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, size.width, size.height);

  // Firehouse facade.
  const facadeY = size.height * 0.14;
  context.fillStyle = "#7e3328";
  roundedRect(context, size.width * 0.055, facadeY, size.width * 0.89, size.height * 0.73, 18);
  context.fill();
  context.save();
  context.globalAlpha = 0.32;
  context.strokeStyle = "#f6b07d";
  context.lineWidth = 2;
  const brickHeight = Math.max(24, size.height * 0.055);
  const brickWidth = Math.max(56, size.width * 0.09);
  for (let y = facadeY + brickHeight; y < size.height * 0.86; y += brickHeight) {
    context.beginPath();
    context.moveTo(size.width * 0.055, y);
    context.lineTo(size.width * 0.945, y);
    context.stroke();
    const row = Math.floor((y - facadeY) / brickHeight);
    for (let x = size.width * 0.055 + (row % 2 === 0 ? brickWidth : brickWidth / 2); x < size.width * 0.945; x += brickWidth) {
      context.beginPath();
      context.moveTo(x, y - brickHeight);
      context.lineTo(x, y);
      context.stroke();
    }
  }
  context.restore();

  context.fillStyle = "#102735";
  for (const x of [0.12, 0.38, 0.64]) {
    roundedRect(context, size.width * x, size.height * 0.35, size.width * 0.22, size.height * 0.45, 10);
    context.fill();
    context.strokeStyle = "#d7b072";
    context.lineWidth = Math.max(3, size.width * 0.004);
    context.stroke();
  }

  context.save();
  context.translate(size.width * 0.5, size.height * 0.235);
  context.fillStyle = "#f7d56b";
  context.shadowColor = "rgba(255,208,75,.5)";
  context.shadowBlur = reduced ? 0 : 18 + Math.sin(nowMs / 260) * 5;
  roundedRect(context, -size.width * 0.17, -size.height * 0.06, size.width * 0.34, size.height * 0.105, 9);
  context.fill();
  context.shadowBlur = 0;
  context.fillStyle = "#50201b";
  context.font = `800 ${Math.max(16, size.width * 0.027)}px ${FONT}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("FIREHOUSE 07", 0, -size.height * 0.006);
  context.restore();

  const ground = context.createLinearGradient(0, size.height * 0.77, 0, size.height);
  ground.addColorStop(0, "rgba(22,52,60,.88)");
  ground.addColorStop(1, "#061b25");
  context.fillStyle = ground;
  context.fillRect(0, size.height * 0.77, size.width, size.height * 0.23);
  context.strokeStyle = "rgba(178,220,218,.18)";
  context.lineWidth = 2;
  for (let index = -2; index <= 2; index += 1) {
    context.beginPath();
    context.moveTo(size.width * 0.5, size.height * 0.77);
    context.lineTo(size.width * (0.5 + index * 0.3), size.height);
    context.stroke();
  }
}

function drawWorldFrame(context: CanvasRenderingContext2D, size: Size): void {
  const left = context.createLinearGradient(0, 0, size.width * 0.12, 0);
  left.addColorStop(0, "rgba(5,18,26,.78)");
  left.addColorStop(1, "rgba(5,18,26,0)");
  context.fillStyle = left;
  context.fillRect(0, 0, size.width * 0.13, size.height);
  const right = context.createLinearGradient(size.width, 0, size.width * 0.87, 0);
  right.addColorStop(0, "rgba(5,18,26,.78)");
  right.addColorStop(1, "rgba(5,18,26,0)");
  context.fillStyle = right;
  context.fillRect(size.width * 0.87, 0, size.width * 0.13, size.height);

  context.strokeStyle = "rgba(164,229,244,.18)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(size.width * 0.028, size.height * 0.19);
  context.lineTo(size.width * 0.028, size.height * 0.82);
  context.moveTo(size.width * 0.972, size.height * 0.19);
  context.lineTo(size.width * 0.972, size.height * 0.82);
  context.stroke();
}

function drawFireTarget(
  context: CanvasRenderingContext2D,
  size: Size,
  target: RuntimeTarget,
  nowMs: number,
  reduced: boolean,
): void {
  const minimum = Math.min(size.width, size.height);
  const base = Math.max(44, Math.min(98, target.radius * minimum * 1.18));
  const pulse = reduced ? 1 : 1 + Math.sin(nowMs / 210 + hash(target.id) * 0.01) * 0.055;
  const extinguish = Math.min(1, target.dwellProgress);
  const x = target.x * size.width;
  const y = target.y * size.height;

  context.save();
  context.translate(x, y);

  if (target.hit) {
    context.globalAlpha = 0.72;
    context.fillStyle = "rgba(13,38,47,.72)";
    roundedRect(context, -base * 0.82, base * 0.42, base * 1.64, base * 0.34, base * 0.12);
    context.fill();
    context.strokeStyle = "rgba(123,220,238,.85)";
    context.lineWidth = Math.max(3, base * 0.055);
    context.beginPath();
    context.arc(0, 0, base * 0.63, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#d8f8ff";
    context.font = `900 ${base * 0.68}px ${FONT}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("✓", 0, 1);
    context.restore();
    return;
  }

  // A readable target halo that still looks like part of the fiction.
  context.globalAlpha = 0.64;
  context.strokeStyle = extinguish > 0 ? "#9cecff" : "#ffd45e";
  context.lineWidth = Math.max(3, base * 0.06);
  context.setLineDash([base * 0.22, base * 0.11]);
  context.beginPath();
  context.arc(0, 0, base * (0.92 + (reduced ? 0 : Math.sin(nowMs / 330) * 0.025)), 0, Math.PI * 2);
  context.stroke();
  context.setLineDash([]);
  context.globalAlpha = 1;

  // Burning window/crate anchors each fire in the room instead of floating circles.
  context.fillStyle = "rgba(20,27,30,.86)";
  context.strokeStyle = "rgba(244,205,131,.72)";
  context.lineWidth = Math.max(2, base * 0.035);
  roundedRect(context, -base * 0.72, base * 0.33, base * 1.44, base * 0.48, base * 0.1);
  context.fill();
  context.stroke();
  context.strokeStyle = "rgba(244,205,131,.34)";
  context.beginPath();
  context.moveTo(-base * 0.58, base * 0.55);
  context.lineTo(base * 0.58, base * 0.55);
  context.stroke();

  const flameSize = base * pulse * (1 - extinguish * 0.48);
  context.save();
  context.translate(0, base * 0.28 + extinguish * base * 0.23);
  context.shadowColor = extinguish > 0.55 ? "rgba(129,226,255,.7)" : "rgba(255,91,37,.8)";
  context.shadowBlur = reduced ? 6 : 22 * (1 - extinguish * 0.55);
  drawFlame(context, flameSize, nowMs, hash(target.id), extinguish, reduced);
  context.restore();

  if (extinguish > 0) {
    // Circular pressure gauge communicates dwell without looking like the old target.
    context.strokeStyle = "rgba(196,242,255,.23)";
    context.lineWidth = Math.max(6, base * 0.11);
    context.beginPath();
    context.arc(0, 0, base * 1.04, -Math.PI / 2, Math.PI * 1.5);
    context.stroke();
    context.strokeStyle = "#9beaff";
    context.beginPath();
    context.arc(0, 0, base * 1.04, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * extinguish);
    context.stroke();
    const steamCount = reduced ? 2 : 5;
    for (let index = 0; index < steamCount; index += 1) {
      const phase = (nowMs / 1_100 + index / steamCount) % 1;
      context.globalAlpha = extinguish * (1 - phase) * 0.62;
      context.fillStyle = "#e2f9ff";
      context.beginPath();
      context.arc(
        (index - (steamCount - 1) / 2) * base * 0.18 + Math.sin(nowMs / 260 + index) * base * 0.06,
        -base * 0.35 - phase * base * 1.25,
        base * (0.06 + phase * 0.11),
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    context.globalAlpha = 1;
  }
  context.restore();
}

function drawFlame(
  context: CanvasRenderingContext2D,
  size: number,
  nowMs: number,
  seed: number,
  extinguish: number,
  reduced: boolean,
): void {
  const sway = reduced ? 0 : Math.sin(nowMs / 155 + seed) * size * 0.08;
  context.save();
  context.translate(sway, 0);
  context.beginPath();
  context.moveTo(0, -size * 0.88);
  context.bezierCurveTo(size * 0.18, -size * 0.56, size * 0.58, -size * 0.38, size * 0.5, size * 0.14);
  context.bezierCurveTo(size * 0.46, size * 0.58, size * 0.17, size * 0.72, 0, size * 0.75);
  context.bezierCurveTo(-size * 0.23, size * 0.73, -size * 0.58, size * 0.48, -size * 0.5, size * 0.05);
  context.bezierCurveTo(-size * 0.42, -size * 0.29, -size * 0.15, -size * 0.42, 0, -size * 0.88);
  context.closePath();
  const outer = context.createLinearGradient(0, -size, 0, size);
  outer.addColorStop(0, extinguish > 0.65 ? "#8eddf5" : "#ffe36f");
  outer.addColorStop(0.45, extinguish > 0.5 ? "#4baac8" : "#ff8c2f");
  outer.addColorStop(1, extinguish > 0.35 ? "#276b83" : "#d63222");
  context.fillStyle = outer;
  context.fill();

  context.beginPath();
  context.moveTo(0, -size * 0.36);
  context.bezierCurveTo(size * 0.22, -size * 0.05, size * 0.24, size * 0.35, 0, size * 0.48);
  context.bezierCurveTo(-size * 0.28, size * 0.24, -size * 0.18, -size * 0.03, 0, -size * 0.36);
  context.closePath();
  context.fillStyle = extinguish > 0.5 ? "#d8f8ff" : "#fff2ad";
  context.fill();

  // Friendly face turns an abstract hazard into a readable character without trivializing it.
  context.fillStyle = "rgba(61,27,19,.8)";
  context.beginPath();
  context.arc(-size * 0.13, size * 0.08, size * 0.035, 0, Math.PI * 2);
  context.arc(size * 0.13, size * 0.08, size * 0.035, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(61,27,19,.8)";
  context.lineWidth = Math.max(2, size * 0.026);
  context.beginPath();
  context.arc(0, size * 0.17, size * 0.13, 0.12 * Math.PI, 0.88 * Math.PI);
  context.stroke();
  context.restore();
}

function drawFirefighterCostume(
  context: CanvasRenderingContext2D,
  size: Size,
  poses: readonly RuntimePose[],
  nowMs: number,
): void {
  let landmarks: readonly RuntimeLandmark[] = [];
  let score = -Infinity;
  for (const pose of poses) {
    if (pose.score > score) {
      score = pose.score;
      landmarks = pose.landmarks;
    }
  }
  if (landmarks.length === 0) return;
  const point = (name: string) => landmarks.find((landmark) => landmark.name === name && confidence(landmark) >= 0.35);
  const leftShoulder = point("left_shoulder");
  const rightShoulder = point("right_shoulder");
  const leftHip = point("left_hip");
  const rightHip = point("right_hip");
  const nose = point("nose");
  if (leftShoulder === undefined || rightShoulder === undefined) return;
  const lx = leftShoulder.x * size.width;
  const ly = leftShoulder.y * size.height;
  const rx = rightShoulder.x * size.width;
  const ry = rightShoulder.y * size.height;
  const shoulderSpan = Math.max(54, Math.hypot(rx - lx, ry - ly));
  const hipLeftX = (leftHip?.x ?? leftShoulder.x + 0.03) * size.width;
  const hipLeftY = (leftHip?.y ?? leftShoulder.y + 0.28) * size.height;
  const hipRightX = (rightHip?.x ?? rightShoulder.x - 0.03) * size.width;
  const hipRightY = (rightHip?.y ?? rightShoulder.y + 0.28) * size.height;

  context.save();
  context.globalAlpha = 0.82;
  context.beginPath();
  context.moveTo(lx, ly);
  context.lineTo(rx, ry);
  context.lineTo(hipRightX, hipRightY);
  context.lineTo(hipLeftX, hipLeftY);
  context.closePath();
  context.fillStyle = "rgba(37,51,55,.78)";
  context.fill();
  context.strokeStyle = "rgba(255,205,78,.95)";
  context.lineWidth = Math.max(5, shoulderSpan * 0.07);
  context.stroke();
  context.beginPath();
  context.moveTo(lx * 0.48 + hipLeftX * 0.52, ly * 0.48 + hipLeftY * 0.52);
  context.lineTo(rx * 0.48 + hipRightX * 0.52, ry * 0.48 + hipRightY * 0.52);
  context.strokeStyle = "rgba(227,241,224,.92)";
  context.lineWidth = Math.max(6, shoulderSpan * 0.09);
  context.stroke();
  context.strokeStyle = "rgba(255,205,78,.95)";
  context.lineWidth = Math.max(3, shoulderSpan * 0.045);
  context.stroke();

  if (nose !== undefined) {
    const hx = nose.x * size.width;
    const hy = nose.y * size.height - shoulderSpan * 0.55;
    const helmetWidth = shoulderSpan * 0.82;
    const helmetHeight = shoulderSpan * 0.5;
    context.save();
    context.translate(hx, hy);
    context.rotate(Math.sin(nowMs / 900) * 0.015);
    context.fillStyle = "#c83d2d";
    context.strokeStyle = "#70251e";
    context.lineWidth = Math.max(3, shoulderSpan * 0.035);
    context.beginPath();
    context.ellipse(0, 0, helmetWidth * 0.5, helmetHeight * 0.5, 0, Math.PI, Math.PI * 2);
    context.lineTo(helmetWidth * 0.58, helmetHeight * 0.18);
    context.lineTo(-helmetWidth * 0.58, helmetHeight * 0.18);
    context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle = "#ffd45e";
    context.beginPath();
    context.moveTo(0, -helmetHeight * 0.25);
    context.lineTo(helmetWidth * 0.17, -helmetHeight * 0.03);
    context.lineTo(helmetWidth * 0.11, helmetHeight * 0.2);
    context.lineTo(-helmetWidth * 0.11, helmetHeight * 0.2);
    context.lineTo(-helmetWidth * 0.17, -helmetHeight * 0.03);
    context.closePath();
    context.fill();
    context.fillStyle = "#64251f";
    context.font = `900 ${Math.max(11, helmetHeight * 0.28)}px ${FONT}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("07", 0, helmetHeight * 0.02);
    context.restore();
  }
  context.restore();
}

function drawMissionHud(
  context: CanvasRenderingContext2D,
  size: Size,
  frame: RuntimeRenderFrame,
  aim: AimState,
  mission: FireMissionState,
): void {
  const copy = COPY[mission.locale];
  const compact = size.width < 560;
  const pad = compact ? 9 : Math.max(14, size.width * 0.022);
  const panelHeight = compact ? 64 : Math.max(70, Math.min(102, size.height * 0.145));
  const leftWidth = compact ? size.width * 0.34 : Math.max(180, Math.min(280, size.width * 0.25));
  const rightWidth = compact ? size.width * 0.42 : Math.max(190, Math.min(300, size.width * 0.27));

  context.save();
  context.fillStyle = "rgba(5, 20, 29, .86)";
  context.strokeStyle = "rgba(160, 229, 244, .25)";
  context.lineWidth = 1;
  roundedRect(context, pad, pad, leftWidth, panelHeight, 14);
  context.fill();
  context.stroke();
  roundedRect(context, size.width - pad - rightWidth, pad, rightWidth, panelHeight, 14);
  context.fill();
  context.stroke();

  context.fillStyle = "#9ac6ce";
  context.font = `700 ${compact ? 8 : Math.max(9, size.width * 0.009)}px ${MONO}`;
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(copy.score, pad + 15, pad + 12);
  context.fillStyle = "#fff4c4";
  context.font = `900 ${compact ? 28 : Math.max(30, panelHeight * 0.43)}px ${FONT}`;
  context.fillText(String(mission.score).padStart(4, "0"), pad + 13, pad + (compact ? 23 : 28));
  if (!compact && mission.combo > 1 && performanceNow() - mission.lastHitAtMs < 4_000) {
    context.fillStyle = "#9eeaff";
    context.font = `800 ${Math.max(10, panelHeight * 0.13)}px ${MONO}`;
    context.fillText(`${mission.combo}× ${copy.combo}`, pad + leftWidth * 0.57, pad + panelHeight * 0.58);
  }

  const rightX = size.width - pad - rightWidth;
  context.fillStyle = "#9ac6ce";
  context.font = `700 ${compact ? 8 : Math.max(9, size.width * 0.009)}px ${MONO}`;
  context.fillText(copy.firesOut, rightX + 15, pad + 12);
  context.fillStyle = "white";
  context.font = `900 ${compact ? 27 : Math.max(28, panelHeight * 0.42)}px ${FONT}`;
  context.fillText(`${mission.firesOut}/${TOTAL_FIRES}`, rightX + 13, pad + (compact ? 24 : 29));

  const elapsed = mission.startedAtMs > 0 ? Math.max(0, frame.timestampMs - mission.startedAtMs) : 0;
  const remaining = Math.max(0, MISSION_SECONDS - Math.floor(elapsed / 1000));
  const secondsText = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  context.fillStyle = remaining <= 15 ? "#ff8d70" : "#ffd45e";
  context.font = `800 ${compact ? 16 : Math.max(18, panelHeight * 0.28)}px ${MONO}`;
  context.textAlign = "right";
  context.fillText(secondsText, rightX + rightWidth - 12, pad + panelHeight * (compact ? 0.54 : 0.47));

  if (!compact) {
    const statusWidth = Math.min(size.width * 0.34, 360);
    const statusX = (size.width - statusWidth) / 2;
    context.fillStyle = "rgba(5,20,29,.8)";
    roundedRect(context, statusX, pad, statusWidth, Math.max(42, panelHeight * 0.52), 999);
    context.fill();
    context.fillStyle = "#76d6e8";
    context.beginPath();
    context.arc(statusX + 20, pad + Math.max(42, panelHeight * 0.52) / 2, 5, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "white";
    context.font = `800 ${Math.max(10, size.width * 0.011)}px ${MONO}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(frame.video === null ? copy.simulatorReady : copy.cameraReady, size.width / 2 + 5, pad + Math.max(42, panelHeight * 0.52) / 2);
  }

  const gaugeWidth = compact ? Math.min(158, size.width * 0.48) : Math.max(150, Math.min(270, size.width * 0.25));
  const gaugeHeight = compact ? 10 : 13;
  const gaugeX = (size.width - gaugeWidth) / 2;
  const gaugeY = size.height - (compact ? 38 : Math.max(54, size.height * 0.105));
  context.fillStyle = "rgba(5,20,29,.76)";
  roundedRect(context, gaugeX - 12, gaugeY - (compact ? 17 : 21), gaugeWidth + 24, compact ? 35 : 45, 13);
  context.fill();
  context.fillStyle = "#a9cbd1";
  context.font = `700 ${compact ? 7 : Math.max(8, size.width * 0.008)}px ${MONO}`;
  context.textAlign = "left";
  context.textBaseline = "bottom";
  context.fillText(copy.pressure, gaugeX, gaugeY - 3);
  context.fillStyle = "rgba(151,218,231,.2)";
  roundedRect(context, gaugeX, gaugeY, gaugeWidth, gaugeHeight, 999);
  context.fill();
  const pressure = aim.endpoint === null ? 0.16 : 0.86 + Math.sin(frame.timestampMs / 140) * 0.055;
  const pressureGradient = context.createLinearGradient(gaugeX, 0, gaugeX + gaugeWidth, 0);
  pressureGradient.addColorStop(0, "#46a7c0");
  pressureGradient.addColorStop(1, "#d8f8ff");
  context.fillStyle = pressureGradient;
  roundedRect(context, gaugeX, gaugeY, gaugeWidth * Math.max(0, Math.min(1, pressure)), gaugeHeight, 999);
  context.fill();
  context.restore();
}

function drawWaveMoment(
  context: CanvasRenderingContext2D,
  size: Size,
  frame: RuntimeRenderFrame,
  mission: FireMissionState,
): void {
  const wave = waveIndex(mission.sceneId);
  const copy = COPY[mission.locale];
  if (wave > 0) {
    const elapsed = frame.timestampMs - mission.waveStartedAtMs;
    if (elapsed >= 0 && elapsed < 1_900) {
      const progress = Math.min(1, elapsed / 420);
      const exit = elapsed > 1_500 ? 1 - (elapsed - 1_500) / 400 : 1;
      context.save();
      context.globalAlpha = Math.max(0, Math.min(progress, exit));
      context.translate(0, (1 - progress) * -34);
      const compact = size.width < 560;
      const width = compact ? size.width * 0.62 : Math.min(size.width * 0.66, 640);
      const x = (size.width - width) / 2;
      const y = compact ? size.height * 0.22 : size.height * 0.27;
      const bannerHeight = compact ? 62 : Math.max(82, size.height * 0.135);
      context.fillStyle = "rgba(192,55,42,.94)";
      context.shadowColor = "rgba(0,0,0,.35)";
      context.shadowBlur = 28;
      roundedRect(context, x, y, width, bannerHeight, compact ? 12 : 16);
      context.fill();
      context.shadowBlur = 0;
      context.fillStyle = "#ffd45e";
      context.font = `900 ${compact ? 18 : Math.max(19, size.width * 0.027)}px ${FONT}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(`${copy.alarm} ${wave}`, size.width / 2, y + bannerHeight * 0.38);
      context.fillStyle = "white";
      context.font = `800 ${compact ? 11 : Math.max(13, size.width * 0.017)}px ${MONO}`;
      context.fillText(copy.waveLocations[wave - 1] ?? "", size.width / 2, y + bannerHeight * 0.72);
      context.restore();
    }
  }
  if (frame.celebrationProgress > 0 && mission.outcome === "active") {
    const pulse = Math.sin(frame.celebrationProgress * Math.PI);
    context.save();
    context.globalAlpha = Math.max(0, pulse);
    context.fillStyle = "rgba(9,39,46,.86)";
    roundedRect(context, size.width * 0.32, size.height * 0.38, size.width * 0.36, size.height * 0.14, 18);
    context.fill();
    context.strokeStyle = "#9cecff";
    context.lineWidth = 3;
    context.stroke();
    context.fillStyle = "white";
    context.font = `900 ${Math.max(22, size.width * 0.034)}px ${FONT}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(copy.waveClear, size.width / 2, size.height * 0.45);
    context.restore();
  }
}

function drawOutcome(
  context: CanvasRenderingContext2D,
  size: Size,
  mission: FireMissionState,
  nowMs: number,
  reduced: boolean,
): void {
  if (mission.outcome !== "victory" && mission.outcome !== "failed") return;
  const copy = COPY[mission.locale];
  const victory = mission.outcome === "victory";
  context.save();
  context.fillStyle = victory ? "rgba(4,31,38,.78)" : "rgba(41,18,17,.78)";
  context.fillRect(0, 0, size.width, size.height);
  const width = Math.min(size.width * 0.75, 760);
  const height = Math.min(size.height * 0.48, 350);
  const x = (size.width - width) / 2;
  const y = (size.height - height) / 2;
  const scale = reduced ? 1 : 1 + Math.sin(nowMs / 420) * 0.008;
  context.translate(size.width / 2, size.height / 2);
  context.scale(scale, scale);
  context.translate(-size.width / 2, -size.height / 2);
  const panel = context.createLinearGradient(x, y, x, y + height);
  panel.addColorStop(0, victory ? "#173f49" : "#542a25");
  panel.addColorStop(1, victory ? "#0b2932" : "#291918");
  context.fillStyle = panel;
  context.shadowColor = "rgba(0,0,0,.5)";
  context.shadowBlur = 46;
  roundedRect(context, x, y, width, height, 24);
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = victory ? "#9cecff" : "#ff9a7f";
  context.lineWidth = 3;
  context.stroke();
  context.fillStyle = victory ? "#ffd45e" : "#ff9a7f";
  context.font = `900 ${Math.max(32, Math.min(72, size.width * 0.068))}px ${FONT}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(victory ? copy.allClear : copy.tryAgain, size.width / 2, y + height * 0.34);
  context.fillStyle = "white";
  context.font = `600 ${Math.max(14, Math.min(24, size.width * 0.022))}px ${FONT}`;
  context.fillText(victory ? copy.allClearBody : copy.tryAgainBody, size.width / 2, y + height * 0.57, width * 0.82);
  context.fillStyle = "#b8dbe0";
  context.font = `800 ${Math.max(12, size.width * 0.014)}px ${MONO}`;
  context.fillText(`${copy.score} ${String(mission.score).padStart(4, "0")} · ${copy.firesOut} ${mission.firesOut}/${TOTAL_FIRES}`, size.width / 2, y + height * 0.77);
  context.restore();
}

function drawCaption(context: CanvasRenderingContext2D, size: Size, caption: string): void {
  const compact = size.width < 560;
  const fontSize = compact ? 13 : Math.max(14, Math.min(25, size.width * 0.02));
  context.save();
  context.font = `700 ${fontSize}px ${FONT}`;
  const maxWidth = compact ? size.width * 0.84 : Math.min(size.width * 0.72, 760);
  const lines = wrapText(context, caption, maxWidth - fontSize * 2.2).slice(0, 2);
  const height = Math.max(50, lines.length * fontSize * 1.38 + fontSize * 1.1);
  const x = (size.width - maxWidth) / 2;
  const y = size.height - height - (compact ? 76 : Math.max(80, size.height * 0.14));
  context.fillStyle = "rgba(4,17,25,.8)";
  roundedRect(context, x, y, maxWidth, height, 14);
  context.fill();
  context.strokeStyle = "rgba(162,228,241,.2)";
  context.lineWidth = 1;
  context.stroke();
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  lines.forEach((line, index) => {
    context.fillText(line, size.width / 2, y + height / 2 + (index - (lines.length - 1) / 2) * fontSize * 1.35);
  });
  context.restore();
}

function waveIndex(sceneId: string | null): number {
  if (sceneId === "alarm-one") return 1;
  if (sceneId === "alarm-two") return 2;
  if (sceneId === "alarm-three") return 3;
  return 0;
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current.length === 0 ? word : `${current} ${word}`;
    if (context.measureText(next).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  const r = Math.min(Math.max(0, radius), Math.abs(width) / 2, Math.abs(height) / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function confidence(landmark: RuntimeLandmark): number {
  return Math.min(landmark.visibility, landmark.presence);
}

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function seeded(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43_758.5453;
  return value - Math.floor(value);
}

function performanceNow(): number {
  return typeof performance === "undefined" ? Date.now() : performance.now();
}
