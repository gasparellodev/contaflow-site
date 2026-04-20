"use client";

import type { ReactNode } from "react";

type Props = {
  variant?: "laptop" | "phone";
  tilt?: "left" | "right" | "none";
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper visual 3D: adiciona chrome de device, perspectiva, reflexo e sombra.
 * Mantém children (img ou picture) renderizado dentro da "tela".
 * Respeita prefers-reduced-motion (anima float só se allowed).
 */
export function DeviceFrame({
  variant = "laptop",
  tilt = "left",
  className = "",
  children,
}: Props) {
  const tiltStyle =
    tilt === "left"
      ? "perspective(1600px) rotateY(-6deg) rotateX(2deg)"
      : tilt === "right"
      ? "perspective(1600px) rotateY(6deg) rotateX(2deg)"
      : "none";

  if (variant === "phone") {
    return (
      <div
        className={`relative mx-auto ${className}`}
        style={{
          transform: tiltStyle,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative bg-[#0A0E17] rounded-[42px] p-[6px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/5">
          <div className="rounded-[36px] overflow-hidden bg-[#0A1520] relative">
            {children}
            <div
              className="absolute inset-0 pointer-events-none rounded-[36px]"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 100%)",
                mixBlendMode: "screen",
              }}
              aria-hidden
            />
          </div>
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0A0E17] rounded-full"
            aria-hidden
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: tiltStyle,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative bg-gradient-to-b from-[#1a2332] to-[#0a101a] rounded-t-xl p-2 pb-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/5 border-b-0">
        <div className="flex items-center gap-1.5 px-2 pb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="rounded-lg overflow-hidden bg-[#0A1520] relative">
          {children}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 25%)",
              mixBlendMode: "screen",
            }}
            aria-hidden
          />
        </div>
      </div>
      {/* Base "stand" do laptop */}
      <div
        className="mx-auto bg-gradient-to-b from-[#1a2332] to-[#0a101a] h-1.5 border border-white/5 border-t-0"
        style={{ width: "104%", marginLeft: "-2%", borderRadius: "0 0 12px 12px" }}
        aria-hidden
      />
      {/* Reflexo/sombra no chão */}
      <div
        className="absolute inset-x-8 -bottom-6 h-12 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(78,205,196,0.25) 0%, transparent 70%)",
        }}
        aria-hidden
      />
    </div>
  );
}
