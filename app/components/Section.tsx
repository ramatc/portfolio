"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({
  id,
  number,
  title,
  description,
  children,
}: SectionProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      data-section={id}
      className="scroll-mt-24 py-16 md:py-24"
    >
      <motion.header
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
        className="mb-12 max-w-2xl md:mb-16"
      >
        <div className="flex items-baseline gap-3 font-mono text-xs text-fg-subtle">
          <span aria-hidden="true">{number}</span>
          <span
            className="h-px flex-1 bg-border-subtle"
            aria-hidden="true"
          />
        </div>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-[40ch] text-pretty text-base text-fg-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </motion.header>
      {children}
    </section>
  );
};

export default Section;
