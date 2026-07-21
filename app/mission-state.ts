import type { PlayerPhase } from "@manse/runtime-web";
import type { GameLocale } from "./game-config";

export type MissionOutcome = "idle" | "active" | "victory" | "failed";

export interface FireMissionState {
  locale: GameLocale;
  phase: PlayerPhase;
  sceneId: string | null;
  startedAtMs: number;
  waveStartedAtMs: number;
  score: number;
  combo: number;
  bestCombo: number;
  firesOut: number;
  lastHitAtMs: number;
  lastHitTargetId: string | null;
  outcome: MissionOutcome;
}

export function createFireMissionState(locale: GameLocale = "en"): FireMissionState {
  return {
    locale,
    phase: "idle",
    sceneId: null,
    startedAtMs: 0,
    waveStartedAtMs: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    firesOut: 0,
    lastHitAtMs: 0,
    lastHitTargetId: null,
    outcome: "idle",
  };
}

export function resetFireMissionState(state: FireMissionState, locale: GameLocale): void {
  Object.assign(state, createFireMissionState(locale));
}

export function enterMissionScene(state: FireMissionState, sceneId: string, nowMs: number): void {
  state.sceneId = sceneId;
  state.waveStartedAtMs = nowMs;
  if (sceneId === "alarm-one" && state.startedAtMs === 0) {
    state.startedAtMs = nowMs;
    state.outcome = "active";
  } else if (sceneId === "all-clear") {
    state.outcome = "victory";
  } else if (sceneId === "mission-failed") {
    state.outcome = "failed";
  }
}

export function registerFireOut(state: FireMissionState, targetId: string, nowMs: number): void {
  if (state.lastHitTargetId === targetId) return;
  state.combo = nowMs - state.lastHitAtMs <= 4_000 ? state.combo + 1 : 1;
  state.bestCombo = Math.max(state.bestCombo, state.combo);
  state.firesOut += 1;
  state.score += 100 + Math.max(0, state.combo - 1) * 35;
  state.lastHitAtMs = nowMs;
  state.lastHitTargetId = targetId;
}
