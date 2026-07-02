"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface TerminalLine {
  /** Typed character by character after the prompt; output lines appear whole. */
  cmd?: boolean;
  text: string;
  className?: string;
}

const CMD_SPEED_MS = 45;
const OUT_SPEED_MS = 220;
const CMD_PAUSE_MS = 350;
const LOOP_PAUSE_MS = 12000;

function Prompt() {
  return (
    <span aria-hidden>
      <span className="text-emerald-400">bryan@portfolio</span>
      <span className="text-zinc-500">:~$ </span>
    </span>
  );
}

/**
 * A GIF-style coding loop rendered live: types each command, prints its
 * output, then clears and starts over. The chrome stays dark in both themes,
 * the way a real terminal would. Reduced motion renders the full session
 * statically instead of looping.
 */
export function Terminal({
  lines,
  title = "bryan@portfolio: ~",
  className,
}: {
  lines: TerminalLine[];
  title?: string;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  // {line, chars} — lines before `line` are fully visible; a cmd line at
  // `line` shows its first `chars` characters.
  const [pos, setPos] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const current = lines[pos.line];

    let delay: number;
    let next: { line: number; chars: number };
    if (!current) {
      delay = LOOP_PAUSE_MS;
      next = { line: 0, chars: 0 };
    } else if (current.cmd && pos.chars < current.text.length) {
      delay = CMD_SPEED_MS;
      next = { line: pos.line, chars: pos.chars + 1 };
    } else {
      delay = current.cmd ? CMD_PAUSE_MS : OUT_SPEED_MS;
      next = { line: pos.line + 1, chars: 0 };
    }

    const timer = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(timer);
  }, [pos, lines, reducedMotion]);

  const visible = reducedMotion
    ? lines.map((l) => ({ ...l, partial: undefined as string | undefined }))
    : lines
        .slice(0, pos.line + 1)
        .map((l, i) =>
          i === pos.line
            ? { ...l, partial: l.cmd ? l.text.slice(0, pos.chars) : l.text }
            : { ...l, partial: undefined },
        );

  return (
    <div
      role="img"
      aria-label="Terminal session summarizing Bryan's skills and recent work"
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-zinc-950 text-left shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-2 truncate font-mono text-xs text-zinc-400">
          {title}
        </span>
      </div>
      <div className="h-72 overflow-hidden p-4 font-mono text-[13px] leading-6 sm:h-80">
        {visible.map((line, i) => {
          const isTyping = line.partial !== undefined && line.cmd;
          const text = line.partial ?? line.text;
          const done = !isTyping || text === line.text;
          return (
            <div key={i} className="whitespace-pre-wrap">
              {line.cmd && <Prompt />}
              <span className={cn("text-zinc-100", line.className)}>
                {text}
              </span>
              {!reducedMotion && i === visible.length - 1 && !done && (
                <span className="animate-pulse text-zinc-100">▍</span>
              )}
            </div>
          );
        })}
        {!reducedMotion && pos.line >= lines.length && (
          <div>
            <Prompt />
            <span className="animate-pulse text-zinc-100">▍</span>
          </div>
        )}
      </div>
    </div>
  );
}
