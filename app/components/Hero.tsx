"use client";

import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  visitor?: string;
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const Hero = ({ visitor }: HeroProps) => {
  const reduceMotion = useReducedMotion();
  const delay = (i: number) => (reduceMotion ? 0 : 0.08 + i * 0.08);

  return (
    <section
      id="top"
      data-section="top"
      className="relative flex min-h-screen flex-col items-center justify-center text-center"
    >
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
          Desarrollador Web Fullstack
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
          experiencias web que combinan{" "}
          <span className="text-fg">rendimiento</span>,{" "}
          <span className="text-fg">usabilidad</span> y una{" "}
          <span className="text-fg">ejecución técnica sólida</span>.
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
