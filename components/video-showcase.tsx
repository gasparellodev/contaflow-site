"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHAPTERS = [
  { t: "0:00", label: "Recebe" },
  { t: "0:15", label: "Categoriza" },
  { t: "0:30", label: "Envia" },
  { t: "0:42", label: "Aprova" },
];

export function VideoShowcase() {
  const vref = useRef<HTMLVideoElement>(null);
  const cref = useRef<HTMLDivElement>(null);
  const inView = useInView(cref, { amount: 0.4, once: true });
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = vref.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#050B15] py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(78,205,196,0.12), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6" ref={cref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#4ECDC4]" />
            Demo · 45s
          </div>
          <h2 className="display-lg text-4xl text-white sm:text-5xl md:text-[64px]">
            Ver é entender.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#141f30] to-[#070d17] p-3 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[10px] text-white/30">contaflow.app · demo</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[#050B15]">
              <video
                ref={vref}
                src="/demo.mp4"
                poster="/screens/01-inbox.png"
                controls={playing}
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
                className="block aspect-video w-full"
              />
              {!playing && (
                <button
                  onClick={play}
                  aria-label="Play demo"
                  className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#050B15]/80 via-[#050B15]/20 to-transparent transition-all hover:bg-[#050B15]/20"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#050B15] shadow-[0_0_40px_rgba(78,205,196,0.5)] transition-transform group-hover:scale-110">
                    <svg className="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Glow */}
          <div
            aria-hidden
            className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-[#4ECDC4]/40 blur-3xl"
          />

          {/* Chapters */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {CHAPTERS.map((c, i) => (
              <motion.button
                key={c.t}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                onClick={() => {
                  const v = vref.current;
                  if (!v) return;
                  const [m, s] = c.t.split(":").map(Number);
                  v.currentTime = m * 60 + s;
                  play();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-[#4ECDC4]/40 hover:text-white"
              >
                <span className="font-mono text-[10px] text-white/40">{c.t}</span>
                {c.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
