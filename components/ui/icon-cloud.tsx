"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";

import type { TechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

const SPRITE_PX = 80;
const IDLE_SPIN = 0.0022;

/** Perceived luminance (0..1) of a #rrggbb color. */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/** Brand color, nudged when it would vanish against the active background. */
function iconColor(hex: string, dark: boolean): string {
  const lum = luminance(hex);
  if (dark && lum < 0.22) return "#e4e4e7";
  if (!dark && lum > 0.85) return "#52525b";
  return hex;
}

/**
 * Magic UI-style rotating icon sphere, adapted for this site: icons rasterize
 * from local simple-icons path data (recolored per theme), the canvas renders
 * at device pixel ratio, and the loop only runs while visible. Reduced motion
 * shows a static sphere that still responds to drag.
 */
export function IconCloud({
  icons,
  size = 360,
  className,
}: {
  icons: TechIcon[];
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const dark = resolvedTheme !== "light";
    const sprites = icons.map((icon) => {
      const off = document.createElement("canvas");
      off.width = SPRITE_PX;
      off.height = SPRITE_PX;
      const offCtx = off.getContext("2d")!;
      offCtx.scale(SPRITE_PX / 24, SPRITE_PX / 24);
      offCtx.fillStyle = iconColor(icon.hex, dark);
      offCtx.fill(new Path2D(icon.path));
      return off;
    });

    // Fibonacci sphere: evenly spaced points, no clumping at the poles.
    const radius = size * 0.38;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = icons.map((_, i) => {
      const y = 1 - (i / Math.max(icons.length - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return {
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
      };
    });

    const rotation = { x: -0.3, y: 0 };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let visible = true;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      const projected = points.map((p, i) => {
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX + rz * sinX;
        return { i, x: rx, y: ry, z: rz };
      });
      projected.sort((a, b) => a.z - b.z);

      const iconSize = size * 0.13;
      for (const p of projected) {
        const scale = (p.z + radius * 2) / (radius * 3);
        const alpha = Math.max(0.25, Math.min(1, (p.z + radius * 1.5) / (radius * 2)));
        const s = iconSize * scale;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprites[p.i], size / 2 + p.x - s / 2, size / 2 + p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!dragging && !reducedMotion) rotation.y += IDLE_SPIN;
      draw();
      if (visible && !reducedMotion) frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotation.y += (e.clientX - last.x) * 0.005;
      rotation.x += (e.clientY - last.y) * 0.005;
      last = { x: e.clientX, y: e.clientY };
      if (reducedMotion) draw();
    };
    const onPointerUp = () => {
      dragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reducedMotion) {
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(canvas);

    draw();
    if (!reducedMotion) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [icons, size, resolvedTheme, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={cn("max-w-full cursor-grab touch-none active:cursor-grabbing", className)}
      role="img"
      aria-label={`Rotating cloud of technology logos: ${icons.map((i) => i.title).join(", ")}`}
    />
  );
}
