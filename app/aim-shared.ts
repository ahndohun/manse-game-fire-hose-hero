// Shared aim state for Fire Hose Hero's "aim-from-distance" architecture.
//
// The engine's PlayerSnapshot intentionally never exposes pose frames, so the
// pose-provider wrapper (camera mode) and the pointer handler (simulator mode)
// write per-frame aim data into this mutable object. The hose overlay reads it
// every requestAnimationFrame and draws the water stream on top of the stage.
// No engine code is involved in this channel.

export interface AimPoint {
  x: number;
  y: number;
}

export type AimSource = "none" | "pointer" | "camera";

export interface AimState {
  /** Stream endpoint in normalized stage coordinates (0..1), null when unknown. */
  endpoint: AimPoint | null;
  /** Last raw wrist position before ray projection (camera mode only). */
  rawWrist: AimPoint | null;
  /** Arm currently driving the aim (camera mode). */
  side: "left" | "right";
  /** Who last wrote the endpoint. */
  source: AimSource;
  /** performance.now() stamp of the last endpoint write; used to fade stale aim. */
  updatedAtMs: number;
}

export function createAimState(): AimState {
  return {
    endpoint: null,
    rawWrist: null,
    side: "right",
    source: "none",
    updatedAtMs: 0,
  };
}

export function resetAimState(state: AimState): void {
  state.endpoint = null;
  state.rawWrist = null;
  state.side = "right";
  state.source = "none";
  state.updatedAtMs = 0;
}
