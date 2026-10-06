"use client";

import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ACCENT = "#8b7cf6";

const DIAGRAM_LABEL =
  "Diagrama de arquitectura de Coda. Camino síncrono: la web en Next.js llama a la API en NestJS, un monolito modular, que lee y escribe en Postgres, la fuente de verdad. " +
  "Trabajo en segundo plano: la API encola trabajos en Redis con BullMQ; workers en procesos separados (importación de catálogo, recomendaciones, sincronización de búsqueda y notificaciones) los consumen, " +
  "escriben en Postgres y proyectan los datos de búsqueda en Meilisearch. La importación de catálogo consume Spotify y MusicBrainz.";

const WORKERS = [
  { name: "catalog-import", note: "Spotify · MusicBrainz" },
  { name: "recommendations", note: "precálculo" },
  { name: "search-sync", note: "→ Meilisearch" },
  { name: "notifications", note: null },
] as const;

type NodeTone = "default" | "source" | "projection";

const ArchitectureDiagram = () => {
  const reduceMotion = useReducedMotion();

  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion ? {} : { staggerChildren: 0.07 },
    },
  };

  return (
    <motion.div
      role="img"
      aria-label={DIAGRAM_LABEL}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,1fr)]"
    >
      {/* Lane titles (desktop only) */}
      <motion.p
        variants={item}
        className="mb-3 hidden font-mono text-[11px] uppercase tracking-wider text-fg-subtle md:col-start-1 md:row-start-1 md:block"
      >
        Request
      </motion.p>
      <motion.p
        variants={item}
        className="mb-3 hidden font-mono text-[11px] uppercase tracking-wider text-fg-subtle md:col-start-3 md:row-start-1 md:block"
      >
        Segundo plano
      </motion.p>

      {/* Synchronous path */}
      <motion.div variants={item} className="md:col-start-1 md:row-start-2">
        <Node title="Next.js 16" meta="web" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-3">
        <VerticalLink label="HTTP" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-4">
        <Node title="NestJS 11 API" meta="monolito modular" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-5">
        <VerticalLink label="lee y escribe" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-6 md:self-start">
        <Node title="Postgres 17" meta="fuente de verdad" tone="source" />
      </motion.div>

      {/* Cross links (desktop) */}
      <motion.div
        variants={item}
        className="hidden md:col-start-2 md:row-start-4 md:flex"
      >
        <HorizontalLink label="encola" direction="right" />
      </motion.div>
      <motion.div
        variants={item}
        className="hidden md:col-start-2 md:row-start-6 md:flex md:h-[46px] md:self-start"
      >
        <HorizontalLink label="escriben" direction="left" />
      </motion.div>

      {/* Cross link (mobile) */}
      <motion.div variants={item} className="md:hidden">
        <VerticalLink label="la API encola trabajos" />
      </motion.div>

      {/* Background work */}
      <motion.div variants={item} className="md:col-start-3 md:row-start-4">
        <Node title="Redis 7 · BullMQ" meta="colas" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-3 md:row-start-5">
        <VerticalLink label="consumen" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-3 md:row-start-6">
        <div className="rounded-lg border border-border bg-bg-overlay/60 p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-fg">Workers</span>
            <span className="font-mono text-[11px] text-fg-subtle">
              procesos separados
            </span>
          </div>
          <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {WORKERS.map((worker) => (
              <li
                key={worker.name}
                className="rounded-md border border-border-subtle bg-bg-base/60 px-2 py-1.5"
              >
                <span className="block font-mono text-xs text-fg">
                  {worker.name}
                </span>
                {worker.note ? (
                  <span className="block font-mono text-[10px] text-fg-subtle">
                    {worker.note}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <motion.div variants={item} className="md:hidden">
        <VerticalLink label="escriben en Postgres y proyectan" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-3 md:row-start-7">
        <VerticalLink label="search-sync" className="hidden md:flex" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-3 md:row-start-8">
        <Node title="Meilisearch" meta="proyección de lectura" tone="projection" />
      </motion.div>
    </motion.div>
  );
};

const Node = ({
  title,
  meta,
  tone = "default",
}: {
  title: string;
  meta: string;
  tone?: NodeTone;
}) => (
  <div
    className={`flex items-baseline justify-between gap-3 rounded-lg border px-3.5 py-3 ${
      tone === "projection"
        ? "border-dashed border-border-strong bg-transparent"
        : tone === "source"
          ? "bg-bg-overlay"
          : "border-border bg-bg-overlay/60"
    }`}
    style={tone === "source" ? { borderColor: ACCENT } : undefined}
  >
    <span className="text-sm font-medium text-fg">{title}</span>
    <span
      className="font-mono text-[11px] text-fg-subtle"
      style={tone === "source" ? { color: ACCENT } : undefined}
    >
      {meta}
    </span>
  </div>
);

const VerticalLink = ({
  label,
  className = "flex",
}: {
  label: string;
  className?: string;
}) => (
  <div className={`${className} items-center gap-2 py-1.5 pl-5`}>
    <div className="flex flex-col items-center text-border-strong">
      <span className="h-4 w-px bg-border-strong" />
      <ArrowDown className="-mt-1 h-3 w-3" aria-hidden="true" />
    </div>
    <span className="font-mono text-[11px] text-fg-subtle">{label}</span>
  </div>
);

const HorizontalLink = ({
  label,
  direction,
}: {
  label: string;
  direction: "left" | "right";
}) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2">
    <span className="font-mono text-[11px] text-fg-subtle">{label}</span>
    <div className="flex w-full items-center text-border-strong">
      {direction === "left" ? (
        <ArrowLeft className="-mr-1 h-3 w-3 shrink-0" aria-hidden="true" />
      ) : null}
      <span className="h-px flex-1 bg-border-strong" />
      {direction === "right" ? (
        <ArrowRight className="-ml-1 h-3 w-3 shrink-0" aria-hidden="true" />
      ) : null}
    </div>
  </div>
);

export default ArchitectureDiagram;
