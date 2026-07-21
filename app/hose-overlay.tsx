"use client";

// Hose-stream overlay for Fire Hose Hero (Step 1 of aim-from-distance).
//
// Absolutely-positioned <canvas> over div.stage (pointer-events: none). Every
// rAF it reads the shared AimState and draws a stylized water stream from a
// hose nozzle at the bottom corner of the stage to the current aim endpoint —
// the pointer position in simulator mode, the smoothed projected impact point
// in camera mode. Pure game-app rendering; the engine is unaware of it.

import { useEffect, useRef } from "react";
import type { AimPoint, AimState } from "./aim-shared";

// --- Hose look & layout constants ---
const HOSE_ORIGIN: AimPoint = { x: 0.07, y: 0.96 }; // bottom-left of the stage
const STREAM_SAG = 0.07; // downward bow of the stream arc, fraction of stage height
const DROPLET_COUNT = 26;
const DROPLET_SPEED = 1.6; // stream segments per second
const STALE_CAMERA_MS = 600; // hide the stream when camera aim goes stale

interface Vec {
  x: number;
  y: number;
}

function quadraticAt(p0: Vec, p1: Vec, p2: Vec, t: number): Vec {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

/** Deterministic pseudo-random in [0, 1) from an integer seed. */
function rand(seed: number): number {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function HoseOverlay({ aim, active }: { aim: AimState; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aimRef = useRef(aim);
  aimRef.current = aim;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    const host = canvas.parentElement;
    if (host === null) return;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(bounds.width * dpr));
      canvas.height = Math.max(1, Math.round(bounds.height * dpr));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frameHandle = 0;
    const draw = (nowMs: number) => {
      frameHandle = requestAnimationFrame(draw);
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      const state = aimRef.current;
      const endpoint = state.endpoint;
      if (!activeRef.current || endpoint === null) return;
      // Camera aim goes stale when the arm leaves the frame; pointer aim is always fresh.
      if (state.source === "camera" && nowMs - state.updatedAtMs > STALE_CAMERA_MS) return;

      const origin: Vec = { x: HOSE_ORIGIN.x * width, y: HOSE_ORIGIN.y * height };
      const tip: Vec = { x: endpoint.x * width, y: endpoint.y * height };
      const control: Vec = {
        x: (origin.x + tip.x) / 2,
        y: Math.min(origin.y, tip.y) + height * STREAM_SAG,
      };
      const baseWidth = Math.max(6, width * 0.012);
      const now = nowMs / 1000;

      // Layered stream body: soft outer glow, blue body, bright core.
      context.lineCap = "round";
      context.lineJoin = "round";
      const layers: Array<[number, string]> = [
        [2.8, "rgba(64, 164, 255, 0.22)"],
        [1.5, "rgba(96, 190, 255, 0.65)"],
        [0.55, "rgba(228, 248, 255, 0.95)"],
      ];
      for (const [scale, color] of layers) {
        context.beginPath();
        context.moveTo(origin.x, origin.y);
        context.quadraticCurveTo(control.x, control.y, tip.x, tip.y);
        context.strokeStyle = color;
        context.lineWidth = baseWidth * scale;
        context.stroke();
      }

      // Animated droplets racing along the arc with a perpendicular wobble.
      for (let i = 0; i < DROPLET_COUNT; i += 1) {
        const phase = (i / DROPLET_COUNT + now * DROPLET_SPEED) % 1;
        const point = quadraticAt(origin, control, tip, phase);
        const wobble = (rand(i) - 0.5) * baseWidth * 2.4 * Math.sin(now * 9 + i * 1.7);
        const size = baseWidth * (0.16 + rand(i + 100) * 0.3) * (0.5 + phase);
        context.beginPath();
        context.arc(point.x, point.y + wobble, Math.max(1, size), 0, Math.PI * 2);
        context.fillStyle = `rgba(190, 230, 255, ${0.25 + phase * 0.55})`;
        context.fill();
      }

      // Splash at the impact point: bright blob plus an expanding ring.
      const ringPhase = (now * 1.4) % 1;
      context.beginPath();
      context.arc(tip.x, tip.y, baseWidth * (0.8 + ringPhase * 2.2), 0, Math.PI * 2);
      context.strokeStyle = `rgba(150, 215, 255, ${0.7 * (1 - ringPhase)})`;
      context.lineWidth = Math.max(2, baseWidth * 0.28);
      context.stroke();
      context.beginPath();
      context.arc(tip.x, tip.y, baseWidth * 0.8, 0, Math.PI * 2);
      context.fillStyle = "rgba(215, 242, 255, 0.9)";
      context.fill();

      // Hose nozzle at the origin.
      context.beginPath();
      context.arc(origin.x, origin.y, baseWidth * 1.5, 0, Math.PI * 2);
      context.fillStyle = "#2b3446";
      context.fill();
      context.beginPath();
      context.arc(origin.x, origin.y, baseWidth * 1.5, 0, Math.PI * 2);
      context.strokeStyle = "rgba(201, 244, 93, 0.9)";
      context.lineWidth = Math.max(2, baseWidth * 0.22);
      context.stroke();
    };
    frameHandle = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameHandle);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hose-overlay" aria-hidden="true" />;
}
