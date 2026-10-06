"use client";

import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  visitor?: string;
}

const FACTS = [
  { label: "Ahora", value: "Consultoría Global · Banca y fintech" },
  { label: "Stack", value: "React · NestJS · Next.js" },
  { label: "Base", value: "Buenos Aires · Remoto o híbrido" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const GLOW_HEIGHT = 180;
const HORIZON_MASK =
  "linear-gradient(to right, transparent 8%, black 36%, black 64%, transparent 92%)";

/**
 * A wide, shallow horizon of brand light above the facts row: a thin lit
 * edge with atmosphere rising above it and a faint wash spilling below.
 * The body stays transparent so the page background carries through.
 */
const Horizon = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[max(220vw,2400px)] -translate-x-1/2"
    style={{ marginTop: -GLOW_HEIGHT }}
  >
    <div
      className="hero-horizon relative"
      style={{
        height: GLOW_HEIGHT * 3,
        maskImage: HORIZON_MASK,
        WebkitMaskImage: HORIZON_MASK,
      }}
    >
      {/* Atmosphere above the edge */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: GLOW_HEIGHT,
          background:
            "radial-gradient(28% 100% at 50% 100%, hsl(var(--brand) / 0.26), transparent 75%)",
        }}
      />
      {/* Light spilling just below the edge */}
      <div
        className="absolute inset-x-0"
        style={{
          top: GLOW_HEIGHT,
          height: GLOW_HEIGHT,
          background:
            "radial-gradient(22% 100% at 50% 0%, hsl(var(--brand-soft) / 0.12), transparent 80%)",
        }}
      />
      {/* The lit edge */}
      <div
        className="absolute inset-x-0 aspect-[4/1] rounded-[50%]"
        style={{
          top: GLOW_HEIGHT,
          boxShadow:
            "inset 0 1px 0 0 hsl(var(--brand-soft) / 0.8), 0 -2px 24px -6px hsl(var(--brand) / 0.7)",
        }}
      />
    </div>
  </div>
);

const Hero = ({ visitor }: HeroProps) => {
  const reduceMotion = useReducedMotion();
  const delay = (i: number) => (reduceMotion ? 0 : 0.08 + i * 0.08);

  return (
    <section
      id="top"
      data-section="top"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-y-clip text-center"
    >
      {/* Faint light behind the name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[420px] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand) / 0.09), transparent)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        className="flex w-full flex-col items-center gap-5 md:gap-6"
      >
        <motion.h1
          variants={fadeUp(delay(0))}
          className="text-balance font-semibold tracking-tighter text-fg text-[clamp(3rem,9vw,5rem)] md:text-[clamp(4rem,10vw,7rem)] lg:text-[clamp(5rem,13vw,10.5rem)] [line-height:0.9]"
        >
          Ramiro
          <br />
          Tanquias.
        </motion.h1>

        <motion.span
          variants={fadeUp(delay(1))}
          className="font-mono text-sm uppercase tracking-[0.22em] text-fg-muted md:text-base"
        >
          Full Stack Developer
        </motion.span>

        <motion.p
          variants={fadeUp(delay(2))}
          className="mt-1 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
        >
          {visitor ? (
            <>
              Hola, <span className="text-fg">{visitor}</span>. Desarrollo
            </>
          ) : (
            <>Desarrollo</>
          )}{" "}
          productos web <span className="text-fg">de punta a punta</span>:
          desde la <span className="text-fg">API y los datos</span> hasta la{" "}
          <span className="text-fg">interfaz que usa la gente</span>.
        </motion.p>

        <motion.div
          variants={fadeUp(delay(3))}
          className="mt-3 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#contacto"
            className="group inline-flex h-11 items-center gap-2 rounded-md bg-fg px-5 text-sm font-medium text-bg-base shadow-xs transition-all duration-200 ease-smooth hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base active:scale-[0.98] motion-reduce:transition-none"
          >
            Hablemos
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
          <a
            href="/CV-RAMIRO-TANQUIAS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-bg-elevated px-5 text-sm font-medium text-fg transition-all duration-200 ease-smooth hover:border-border-strong hover:bg-bg-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base active:scale-[0.98] motion-reduce:transition-none"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Descargar CV
          </a>
        </motion.div>

        <div className="relative mt-14 w-full max-w-3xl pt-10 md:mt-20 md:pt-12">
          <Horizon />
          <motion.dl
            variants={fadeUp(delay(4))}
            className="relative grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-6"
          >
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.a
        href="#experiencia"
        aria-label="Ver experiencia"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1.5 text-fg-subtle transition-colors hover:text-fg"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDown
          className="h-4 w-4 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        />
      </motion.a>
    </section>
  );
};

export default Hero;
