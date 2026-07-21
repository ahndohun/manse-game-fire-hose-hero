"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createMansePlayer, type MansePlayer, type PlayerSnapshot, type ProviderKind } from "@manse/runtime-web";
import { createAimState, resetAimState, type AimState } from "./aim-shared";
import { createAimProviderFactory } from "./aim-provider";
import { FireMissionAudio } from "./fire-audio";
import { createFireHoseRendererFactory } from "./fire-hose-renderer";
import { HoseOverlay } from "./hose-overlay";
import { GAME_CONFIG, type GameLocale } from "./game-config";
import {
  createFireMissionState,
  enterMissionScene,
  registerFireOut,
  resetFireMissionState,
} from "./mission-state";

const PACK_URL = `/packs/${GAME_CONFIG.slug}/manse.pack.json`;
const EMPTY: Pick<PlayerSnapshot, "phase" | "sceneId" | "sceneKind" | "provider" | "tier" | "renderer" | "cameraActive" | "targetProgress" | "targets" | "caption"> = {
  phase: "idle",
  sceneId: null,
  sceneKind: null,
  provider: "simulated",
  tier: "A",
  renderer: null,
  cameraActive: false,
  targetProgress: null,
  targets: [],
  caption: null,
};

const UI_COPY = {
  en: {
    kicker: "Firehouse 07 is calling",
    heroNote: "Point your arm like a hose. The stream follows where you aim.",
    gameDetails: "3 alarms · 12 fires · 90-second mission",
    privacy: "Camera stays on this device · no account · no analytics",
    localeLabel: "Choose language",
    playerLabel: "Game player",
    stageLabel: "Interactive motion game stage",
    status: {
      error: "Needs attention",
      busy: "Starting",
      language: "Changing language",
      complete: "Complete",
      idle: "Choose how to play",
      camera: "Camera stays on device",
      simulator: "Simulator live",
    },
    missionSpec: "3 alarms · 12 fires · 90 seconds",
    dispatch: "Dispatch briefing",
    startTitle: "Firehouse 07 needs a hose hero.",
    startDescription: "Sweep the stream onto each fire and hold it steady until the smoke turns cool.",
    stepAim: "Aim with your arm or pointer",
    stepHold: "Hold pressure on the flame",
    stepClear: "Clear all three alarm zones",
    pointerPlay: "Start pointer training",
    cameraPlay: "Suit up with camera",
    comfortableSpace: "Choose a private, comfortable play space.",
    restartPointer: "Restart with pointer",
    switchCamera: "Switch to camera",
    runtimeError: "Something interrupted the game. Restart when you are ready.",
    startError: "The game could not start. Check this browser and try again.",
    footer: `Created by ${GAME_CONFIG.creator}. Built with the open Manse engine. Stop whenever movement feels uncomfortable.`,
    source: "View source ↗",
  },
  ko: {
    kicker: "소방서 07에서 출동 요청",
    heroNote: "팔을 호스처럼 뻗어 보세요. 조준한 곳으로 물줄기가 따라갑니다.",
    gameDetails: "출동 3회 · 불꽃 12개 · 90초 임무",
    privacy: "카메라 영상은 이 기기에만 머물러요 · 계정 불필요 · 분석 도구 없음",
    localeLabel: "언어 선택",
    playerLabel: "게임 플레이어",
    stageLabel: "움직임 게임 플레이 공간",
    status: {
      error: "확인이 필요해요",
      busy: "시작하는 중",
      language: "언어를 바꾸는 중",
      complete: "완료",
      idle: "플레이 방법을 선택하세요",
      camera: "카메라 영상은 기기에만 저장돼요",
      simulator: "포인터 모드 실행 중",
    },
    missionSpec: "출동 3회 · 불꽃 12개 · 90초",
    dispatch: "출동 브리핑",
    startTitle: "소방서 07에 물줄기 영웅이 필요해요.",
    startDescription: "불꽃에 물줄기를 맞추고 연기가 차갑게 식을 때까지 조준을 유지하세요.",
    stepAim: "팔이나 포인터로 조준",
    stepHold: "불꽃 위에 물줄기 유지",
    stepClear: "세 구역의 경보 모두 해제",
    pointerPlay: "포인터 훈련 시작",
    cameraPlay: "카메라로 출동",
    comfortableSpace: "사생활이 보호되고 편안한 놀이 공간을 선택하세요.",
    restartPointer: "포인터로 다시 시작",
    switchCamera: "카메라로 전환",
    runtimeError: "게임이 잠시 멈췄어요. 준비되면 다시 시작해 주세요.",
    startError: "게임을 시작하지 못했어요. 브라우저를 확인하고 다시 시도해 주세요.",
    footer: `${GAME_CONFIG.creator}가 만들고 오픈소스 Manse 엔진으로 제작했습니다. 움직임이 불편하면 언제든 멈추세요.`,
    source: "소스 코드 보기 ↗",
  },
} as const;

type ErrorKind = "runtime" | "start";

function browserLocale(): GameLocale {
  const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  const supported = languages.find((language) => /^(ko|en)(-|$)/i.test(language));
  return supported?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function GameClient() {
  const stageRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<MansePlayer | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const destructionRef = useRef<Promise<void>>(Promise.resolve());
  const runIdRef = useRef(0);
  const aimRef = useRef<AimState>(createAimState());
  const missionRef = useRef(createFireMissionState(GAME_CONFIG.defaultLocale));
  const audioRef = useRef(new FireMissionAudio());
  const pointerReadyAtRef = useRef(Number.POSITIVE_INFINITY);
  const [locale, setLocale] = useState<GameLocale>(GAME_CONFIG.defaultLocale);
  const [snapshot, setSnapshot] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [errorKind, setErrorKind] = useState<ErrorKind | null>(null);

  const destroyActivePlayer = useCallback(() => {
    const player = playerRef.current;
    playerRef.current = null;
    const queued = destructionRef.current
      .catch(() => undefined)
      .then(async () => {
        try {
          await player?.destroy();
        } catch {
          // A later reset still needs to proceed even if disposal was already
          // completed by the runtime during an overlapping mode change.
        }
      });
    destructionRef.current = queued;
    return queued;
  }, []);

  const resetPlayer = useCallback(() => {
    runIdRef.current += 1;
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    resetAimState(aimRef.current);
    pointerReadyAtRef.current = Number.POSITIVE_INFINITY;
    audioRef.current.stop();
    resetFireMissionState(missionRef.current, missionRef.current.locale);
    setSnapshot({ ...EMPTY });
    setBusy(false);
    setResetting(true);
    setErrorKind(null);
    return destroyActivePlayer().finally(() => setResetting(false));
  }, [destroyActivePlayer]);

  const boot = useCallback(async (provider: ProviderKind, selectedLocale: GameLocale) => {
    const container = stageRef.current;
    if (container === null) return;
    const runId = ++runIdRef.current;
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    await destroyActivePlayer();
    if (runId !== runIdRef.current) return;
    resetAimState(aimRef.current);
    resetFireMissionState(missionRef.current, selectedLocale);
    pointerReadyAtRef.current = provider === "simulated"
      ? performance.now() + 3_200
      : Number.POSITIVE_INFINITY;
    setSnapshot({ ...EMPTY });

    const player = createMansePlayer({
      container,
      locale: selectedLocale,
      provider,
      captions: true,
      reducedStimulation: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      // Aim-from-distance: camera frames get their wrists rewritten to the
      // projected aim impact point; simulated/replay pass through untouched.
      providerFactory: createAimProviderFactory(aimRef.current),
      rendererFactory: createFireHoseRendererFactory(aimRef.current, missionRef.current),
      onEvent: (event) => {
        if (runId !== runIdRef.current) return;
        const nowMs = performance.now();
        if (event.type === "target-hit") {
          registerFireOut(missionRef.current, event.targetId, nowMs);
          audioRef.current.targetHit(missionRef.current.combo);
        } else if (event.type === "scene-changed") {
          enterMissionScene(missionRef.current, event.sceneId, nowMs);
          if (event.sceneId === "alarm-two" || event.sceneId === "alarm-three") audioRef.current.waveCleared();
          if (event.sceneId === "all-clear") audioRef.current.victory();
          if (event.sceneId === "mission-failed") audioRef.current.failure();
        } else if (event.type === "complete") {
          audioRef.current.stop();
        } else if (event.type === "error") {
          audioRef.current.stop();
          setErrorKind("runtime");
        }
      },
    });
    playerRef.current = player;
    unsubscribeRef.current = player.subscribe((next) => {
      if (runId === runIdRef.current) {
        missionRef.current.phase = next.phase;
        missionRef.current.sceneId = next.sceneId;
        missionRef.current.locale = selectedLocale;
        setSnapshot(next);
      }
    });
    try {
      await player.load(PACK_URL);
      await player.setup();
      if (provider === "simulated") {
        // Park both synthetic hands outside the mission layout. The runtime's
        // neutral standing pose otherwise overlaps a large reachable target
        // and awards a fire before the player moves.
        player.setPointer(0.04, 0.96, "left");
        player.setPointer(0.96, 0.96, "right");
      }
      await player.play();
      audioRef.current.startWater();
    } catch {
      if (runId === runIdRef.current) {
        audioRef.current.stop();
        setErrorKind("start");
      }
    } finally {
      if (runId === runIdRef.current) setBusy(false);
    }
  }, [destroyActivePlayer]);

  useEffect(() => {
    setLocale(browserLocale());
    if ("serviceWorker" in navigator) void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => {
      runIdRef.current += 1;
      unsubscribeRef.current?.();
      audioRef.current.destroy();
      void destroyActivePlayer();
    };
  }, [destroyActivePlayer]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = (nextLocale: GameLocale) => {
    if (nextLocale === locale) return;
    setLocale(nextLocale);
    // A runtime session owns locale-specific narration and may own the camera.
    // Destroy it instead of mutating in place; the localized start card then
    // lets the player explicitly choose simulator or camera again.
    void resetPlayer();
  };

  const start = (provider: ProviderKind) => {
    if (resetting) return;
    audioRef.current.arm();
    setBusy(true);
    setErrorKind(null);
    void boot(provider, locale);
  };

  const movePointer = (clientX: number, clientY: number) => {
    if (busy || resetting || snapshot.provider !== "simulated") return;
    // Ignore the pointer events generated while the start button disappears.
    // Without this arming window, the old button coordinate can extinguish a
    // fire before the player has made their first intentional move.
    if (performance.now() < pointerReadyAtRef.current) return;
    const bounds = stageRef.current?.getBoundingClientRect();
    if (bounds === undefined || bounds.width === 0 || bounds.height === 0) return;
    const x = (clientX - bounds.left) / bounds.width;
    const y = (clientY - bounds.top) / bounds.height;
    // Simulator mode: the pointer is the stream endpoint (setPointer moves the
    // simulated wrist to the same spot, so the stream tracks the scoring point).
    const aim = aimRef.current;
    aim.endpoint = { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) };
    aim.rawWrist = null;
    aim.source = "pointer";
    aim.updatedAtMs = performance.now();
    try {
      playerRef.current?.setPointer(x, y);
    } catch {
      // Mode changes can overlap one final pointer event.
    }
  };

  const t = UI_COPY[locale];
  const progress = snapshot.targetProgress;
  const errorMessage = errorKind === "runtime"
    ? t.runtimeError
    : errorKind === "start"
      ? t.startError
      : null;
  const overlayActive = snapshot.sceneKind === "challenge"
    && (snapshot.phase === "playing" || snapshot.phase === "celebrating" || snapshot.phase === "paused");
  const status = errorKind !== null
    ? t.status.error
    : busy
      ? t.status.busy
      : resetting
        ? t.status.language
      : snapshot.phase === "complete"
        ? t.status.complete
        : snapshot.phase === "idle"
          ? t.status.idle
          : snapshot.cameraActive
            ? t.status.camera
            : t.status.simulator;

  return (
    <>
      <nav className="topbar" aria-label={t.localeLabel}>
        <span className="manse-mark">MANSE <i aria-hidden="true" /></span>
        <div className="locale-switch" role="group" aria-label={t.localeLabel}>
          <button type="button" aria-pressed={locale === "ko"} onClick={() => changeLocale("ko")} disabled={resetting}>한국어</button>
          <button type="button" aria-pressed={locale === "en"} onClick={() => changeLocale("en")} disabled={resetting}>English</button>
        </div>
      </nav>

      <header className="game-hero">
        <div className="hero-copy">
          <p className="kicker">{t.kicker}</p>
          <h1>{GAME_CONFIG.title[locale]}</h1>
          <p className="summary">{GAME_CONFIG.summary[locale]}</p>
          <div className="hero-details">
            <span className="game-details">{t.gameDetails}</span>
            <span className="privacy-line"><i aria-hidden="true" /> {t.privacy}</span>
          </div>
        </div>
        <figure className="hero-art">
          <img src={GAME_CONFIG.hero.path} alt={GAME_CONFIG.hero.alt[locale]} width="1600" height="900" />
          <figcaption>{t.heroNote}</figcaption>
        </figure>
      </header>

      <section className="player-shell" aria-label={t.playerLabel}>
        <div className="player-bar">
          <span><i className={errorKind === null ? "status-dot" : "status-dot status-error"} aria-hidden="true" /> {status}</span>
          <span>{t.missionSpec}</span>
        </div>
        <div
          className="stage"
          ref={stageRef}
          onPointerDown={(event) => {
            // Let clicks on interactive children (start-card buttons) through:
            // capturing the pointer here would retarget pointerup/click to the
            // stage and the button's onClick would never fire.
            if ((event.target as HTMLElement).closest("button, a")) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            movePointer(event.clientX, event.clientY);
          }}
          onPointerMove={(event) => {
            if ((event.target as HTMLElement).closest("button, a")) return;
            movePointer(event.clientX, event.clientY);
          }}
          data-manse-targets={JSON.stringify(snapshot.targets.map(({ id, x, y, hit }) => ({ id, x, y, hit })))}
          aria-label={t.stageLabel}
        >
          <HoseOverlay aim={aimRef.current} active={overlayActive} />
          {snapshot.phase === "idle" && (
            <div className="start-card">
              <span className="dispatch-label">{t.dispatch}</span>
              <h2>{t.startTitle}</h2>
              <p>{t.startDescription}</p>
              <ol className="briefing-steps">
                <li><span>01</span>{t.stepAim}</li>
                <li><span>02</span>{t.stepHold}</li>
                <li><span>03</span>{t.stepClear}</li>
              </ol>
              <div className="actions">
                <button type="button" onClick={() => start("simulated")} disabled={busy || resetting}>{t.pointerPlay}</button>
                <button className="secondary" type="button" onClick={() => start("mediapipe")} disabled={busy || resetting}>{t.cameraPlay}</button>
              </div>
            </div>
          )}
        </div>
        <div className="player-footer" aria-live="polite">
          <span>{errorMessage ?? t.comfortableSpace}</span>
          <strong>{missionRef.current.firesOut} / 12</strong>
          {snapshot.caption !== null && <span className="sr-only">{snapshot.caption}</span>}
        </div>
        {snapshot.phase !== "idle" && (
          <div className="restart-row">
            <button type="button" onClick={() => start("simulated")} disabled={busy || resetting}>{t.restartPointer}</button>
            <button className="text-button" type="button" onClick={() => start("mediapipe")} disabled={busy || resetting}>{t.switchCamera}</button>
          </div>
        )}
      </section>

      <footer>
        <p>{t.footer}</p>
        <a href={GAME_CONFIG.sourceUrl} target="_blank" rel="noreferrer">{t.source}</a>
      </footer>
    </>
  );
}
