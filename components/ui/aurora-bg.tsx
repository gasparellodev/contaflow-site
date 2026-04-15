"use client";

type Props = {
  className?: string;
  intensity?: "soft" | "normal" | "intense";
};

export function AuroraBg({ className = "", intensity = "normal" }: Props) {
  const opacity =
    intensity === "soft" ? 0.35 : intensity === "intense" ? 0.85 : 0.6;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 animate-aurora-drift will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side at 30% 30%, rgba(78,205,196,0.55) 0%, transparent 70%), radial-gradient(closest-side at 70% 40%, rgba(122,94,255,0.45) 0%, transparent 68%), radial-gradient(closest-side at 50% 80%, rgba(255,182,39,0.35) 0%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(60px)",
          opacity,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(5,11,21,0.6) 80%, #050B15 100%)",
        }}
      />
    </div>
  );
}
