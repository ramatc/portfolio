"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import Section from "@/app/components/Section";

interface Role {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  duration?: string;
  current?: boolean;
  description: string;
  highlights?: string[];
  stack: string[];
}

const EXPERIENCE: Role[] = [
  {
    role: "Full Stack Developer",
    company: "Consultoría Global S.A.",
    period: "Jul 2024 — Presente",
    current: true,
    description:
      "Desarrollo backend en proyectos del sector bancario y fintech, en el cruce entre infraestructura financiera tradicional y plataformas digitales modernas.",
    highlights: [
      "Modernización de sistemas core bancarios legacy hacia arquitectura de microservicios con NestJS",
      "Integración fintech-banca: APIs internas, servicios de mensajería corporativa y manejo transaccional sobre Oracle y MongoDB",
      "Frontend en React, TypeScript y React Query cuando el módulo lo requiere",
      "Tests automatizados con Jest y React Testing Library, code reviews y decisiones de diseño en equipo",
    ],
    stack: [
      "nest.js",
      "node.js",
      "typescript",
      "oracle",
      "mongodb",
      "react",
      "jest",
    ],
  },
  {
    role: "Tutor React.js",
    company: "Coderhouse",
    companyUrl: "https://www.coderhouse.com",
    period: "Jun 2022 — Ene 2024",
    duration: "1 año 8 meses",
    description:
      "Tutor del curso de React.js en una de las plataformas de educación tech más grandes de Latinoamérica.",
    highlights: [
      "Acompañamiento personalizado a alumnos: dudas técnicas, debugging en vivo y recomendaciones de arquitectura para proyectos finales",
      "Corrección y feedback escrito sobre proyectos entregados, con foco en el por qué de la solución y no solo en si funcionaba",
      "Resolución de dudas de cohorte en sesiones grupales y foros asincrónicos a lo largo de múltiples cohortes",
    ],
    stack: ["react", "javascript"],
  },
];

const Experience = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="experiencia" number="01" title="Experiencia">
      <ol className="relative ml-2 space-y-12 border-l border-border">
        {EXPERIENCE.map((role, i) => (
          <motion.li
            key={role.company}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            className="relative pl-8 md:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[6px] top-2 flex h-3 w-3 items-center justify-center"
            >
              {role.current ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/50 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_12px_-1px_hsl(var(--brand)/0.7)]" />
                </>
              ) : (
                <span className="h-3 w-3 rounded-full bg-bg-elevated ring-2 ring-border" />
              )}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-brand-soft md:text-xl">
                {role.role}
              </h3>
              {role.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-soft">
                  Actualmente
                </span>
              ) : null}
            </div>

            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
              {role.companyUrl ? (
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 font-medium text-fg transition-colors hover:text-brand-soft"
                >
                  {role.company}
                  <ArrowUpRight
                    className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <span className="font-medium text-fg">{role.company}</span>
              )}
              <span className="text-fg-subtle" aria-hidden="true">
                ·
              </span>
              <time className="text-fg-subtle">
                {role.period}
                {role.duration ? ` · ${role.duration}` : ""}
              </time>
            </div>

            <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted md:text-base">
              {role.description}
            </p>

            {role.highlights && role.highlights.length > 0 ? (
              <ul className="mt-4 space-y-1.5">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs leading-relaxed text-fg-muted md:text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fg-subtle md:mt-2"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {role.stack.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {role.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border-subtle bg-bg-elevated/60 px-2 py-1 font-mono text-xs text-fg-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
