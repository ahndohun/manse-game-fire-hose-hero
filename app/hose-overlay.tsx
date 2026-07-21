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
const POINTER_HOSE_ORIGIN: AimPoint = { x: 0.5, y: 1.03 };
const STREAM_SAG = 0.035;
const DROPLET_COUNT = 38;
const DROPLET_SPEED = 1.95;
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

      // In camera play the child's own aiming wrist becomes the hose nozzle.
      // Pointer play uses a large first-person nozzle at the bottom of the TV.
      const originPoint = state.source === "camera" && state.rawWrist !== null
        ? state.rawWrist
        : POINTER_HOSE_ORIGIN;
      const origin: Vec = { x: originPoint.x * width, y: originPoint.y * height };
      const tip: Vec = { x: endpoint.x * width, y: endpoint.y * height };
      const control: Vec = {
        x: (origin.x + tip.x) / 2,
        y: Math.min(origin.y, tip.y) + height * STREAM_SAG,
      };
      const baseWidth = Math.max(7, width * 0.0135);
      const now = nowMs / 1000;

      // Layered stream body: turbulent mist, pressurized blue body, white core.
      context.lineCap = "round";
      context.lineJoin = "round";
      const layers: Array<[number, string]> = [
        [3.4, "rgba(63, 176, 222, 0.18)"],
        [2.05, "rgba(80, 196, 235, 0.54)"],
        [1.08, "rgba(121, 221, 250, 0.88)"],
        [0.38, "rgba(239, 253, 255, 0.98)"],
      ];
      for (const [scale, color] of layers) {
        context.beginPath();
        context.moveTo(origin.x, origin.y);
        const pressureWobble = Math.sin(now * 15) * baseWidth * 0.18;
        context.quadraticCurveTo(control.x, control.y + pressureWobble, tip.x, tip.y);
        context.strokeStyle = color;
        context.lineWidth = baseWidth * scale;
        context.stroke();
      }

      // Animated droplets racing along the arc with a perpendicular wobble.
      for (let i = 0; i < DROPLET_COUNT; i += 1) {
        const phase = (i / DROPLET_COUNT + now * DROPLET_SPEED) % 1;
        const point = quadraticAt(origin, control, tip, phase);
        const wobble = (rand(i) - 0.5) * baseWidth * 3.1 * Math.sin(now * 11 + i * 1.7);
        const size = baseWidth * (0.16 + rand(i + 100) * 0.3) * (0.5 + phase);
        context.beginPath();
        context.arc(point.x, point.y + wobble, Math.max(1, size), 0, Math.PI * 2);
        context.fillStyle = `rgba(190, 230, 255, ${0.25 + phase * 0.55})`;
        context.fill();
      }

      // Splash at the impact point: multiple droplets plus two pressure rings.
      const ringPhase = (now * 1.4) % 1;
      for (let ring = 0; ring < 2; ring += 1) {
        const phase = (ringPhase + ring * 0.5) % 1;
        context.beginPath();
        context.arc(tip.x, tip.y, baseWidth * (0.8 + phase * 3.1), 0, Math.PI * 2);
        context.strokeStyle = `rgba(156, 231, 255, ${0.72 * (1 - phase)})`;
        context.lineWidth = Math.max(2, baseWidth * 0.25);
        context.stroke();
      }
      for (let i = 0; i < 12; i += 1) {
        const angle = (i / 12) * Math.PI * 2 + now * 0.7;
        const radius = baseWidth * (1.1 + rand(i + 220) * 2.8);
        context.beginPath();
        context.ellipse(
          tip.x + Math.cos(angle) * radius,
          tip.y + Math.sin(angle) * radius,
          Math.max(1.4, baseWidth * 0.16),
          Math.max(2.2, baseWidth * 0.38),
          angle,
          0,
          Math.PI * 2,
        );
        context.fillStyle = "rgba(206, 244, 255, .72)";
        context.fill();
      }
      context.beginPath();
      context.arc(tip.x, tip.y, baseWidth * 0.8, 0, Math.PI * 2);
      context.fillStyle = "rgba(215, 242, 255, 0.9)";
      context.fill();

      // A readable first-person brass nozzle replaces the old debug dot.
      const angle = Math.atan2(tip.y - origin.y, tip.x - origin.x);
      context.save();
      context.translate(origin.x, origin.y);
      context.rotate(angle);
      const nozzleLength = state.source === "camera" ? baseWidth * 3.2 : baseWidth * 6.2;
      const nozzleRadius = state.source === "camera" ? baseWidth * 0.95 : baseWidth * 1.55;
      const metal = context.createLinearGradient(-nozzleLength, 0, nozzleLength, 0);
      metal.addColorStop(0, "#273844");
      metal.addColorStop(0.48, "#d8a941");
      metal.addColorStop(0.72, "#ffe38a");
      metal.addColorStop(1, "#8a5b1f");
      context.fillStyle = metal;
      context.beginPath();
      context.roundRect(-nozzleLength * 0.72, -nozzleRadius, nozzleLength, nozzleRadius * 2, nozzleRadius * 0.38);
      context.fill();
      context.strokeStyle = "rgba(255,238,173,.9)";
      context.lineWidth = Math.max(2, baseWidth * 0.2);
      context.stroke();
      context.fillStyle = "#142732";
      context.beginPath();
      context.ellipse(nozzleLength * 0.28, 0, nozzleRadius * 0.44, nozzleRadius * 0.84, 0, 0, Math.PI * 2);
      context.fill();
      if (state.source !== "camera") {
        context.fillStyle = "#b72f26";
        context.beginPath();
        context.roundRect(-nozzleLength * 1.4, -nozzleRadius * 0.9, nozzleLength * 0.75, nozzleRadius * 1.8, nozzleRadius * 0.4);
        context.fill();
        context.strokeStyle = "#ffd45e";
        context.lineWidth = Math.max(3, baseWidth * 0.22);
        context.stroke();
      }
      context.restore();
    };
    frameHandle = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameHandle);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hose-overlay" aria-hidden="true" />;
}
