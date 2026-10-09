"use client";

import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonClasses } from "@/app/ui/button";

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
            "radial-gradient(28% 100% at 50% 100%, hsl(var(--brand) / 0.15), transparent 75%)",
        }}
      />
      {/* Light spilling just below the edge */}
      <div
        className="absolute inset-x-0"
        style={{
          top: GLOW_HEIGHT,
          height: GLOW_HEIGHT,
          background:
            "radial-gradient(22% 100% at 50% 0%, hsl(var(--brand-soft) / 0.07), transparent 80%)",
        }}
      />
      {/* The lit edge */}
      <div
        className="absolute inset-x-0 aspect-[4/1] rounded-[50%]"
        style={{
          top: GLOW_HEIGHT,
          boxShadow:
            "inset 0 1px 0 0 hsl(var(--brand-soft) / 0.55), 0 -2px 24px -6px hsl(var(--brand) / 0.4)",
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
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-y-clip text-center supports-[min-height:100svh]:min-h-[100svh]"
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
        className="flex min-h-screen w-full flex-col items-center pb-20 supports-[min-height:100svh]:min-h-[100svh] sm:pb-6 md:pb-8"
      >
        {/* Identity and actions, centered in the space above the horizon */}
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 pt-20 md:gap-6">
          <motion.h1
            variants={fadeUp(delay(0))}
            className="text-balance text-[clamp(3rem,9vw,5rem)] font-semibold tracking-tighter text-fg [line-height:0.9] md:text-[clamp(4rem,10vw,7rem)] lg:text-[clamp(4.5rem,min(13vw,19vh),10.5rem)]"
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
              className={buttonClasses({
                variant: "primary",
                size: "md",
                className: "group",
              })}
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
              className={buttonClasses({ variant: "secondary", size: "md" })}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar CV
            </a>
          </motion.div>
        </div>

        {/* Facts and scroll cue, anchored to the bottom of the viewport */}
        <div className="relative mt-8 w-full max-w-3xl pt-8 sm:mt-12 sm:pt-10 md:pt-12 lg:[@media(max-height:820px)]:mt-8 lg:[@media(max-height:820px)]:pt-8">
          <Horizon />
          <motion.dl
            variants={fadeUp(delay(4))}
            className="relative grid grid-cols-1 gap-3 text-center sm:grid-cols-3 sm:gap-6"
          >
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.a
          href="#experiencia"
          aria-label="Ver experiencia"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="group mt-10 hidden flex-col sm:inline-flex items-center gap-1.5 text-fg-subtle transition-colors hover:text-fg md:mt-12 lg:[@media(max-height:820px)]:mt-6"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown
            className="h-4 w-4 animate-bounce [animation-iteration-count:2.5] motion-reduce:animate-none"
            aria-hidden="true"
          />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
