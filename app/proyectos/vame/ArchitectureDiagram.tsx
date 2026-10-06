"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ACCENT = "#e0a83e";

const DIAGRAM_LABEL =
  "Diagrama de arquitectura de Vame Fútbol. La app de inventario kitstock-pro es dueña de la vista de solo lectura storefront_products en Supabase. " +
  "La tienda, una SPA en React desplegada en Vercel, lee esa vista con la anon key, que solo tiene permiso de select. " +
  "La SPA guarda una copia del catálogo en localStorage para usarla si Supabase falla, y el pedido se cierra con un mensaje armado hacia WhatsApp.";

type NodeTone = "default" | "source" | "fallback";

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
        Datos y venta
      </motion.p>
      <motion.p
        variants={item}
        className="mb-3 hidden font-mono text-[11px] uppercase tracking-wider text-fg-subtle md:col-start-3 md:row-start-1 md:block"
      >
        En el dispositivo
      </motion.p>

      {/* Data path */}
      <motion.div variants={item} className="md:col-start-1 md:row-start-2">
        <Node title="kitstock-pro" meta="app de inventario" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-3">
        <VerticalLink label="es dueña de" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-4">
        <Node
          title="storefront_products"
          meta="vista de Supabase"
          tone="source"
        />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-5">
        <VerticalLink label="select con la anon key" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-6">
        <Node title="React SPA" meta="Vercel" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-7">
        <VerticalLink label="mensaje armado por línea" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-1 md:row-start-8">
        <Node title="WhatsApp" meta="cierre de la venta" />
      </motion.div>

      {/* Cross link (desktop) */}
      <motion.div
        variants={item}
        className="hidden md:col-start-2 md:row-start-6 md:flex"
      >
        <HorizontalLink label="cachea" />
      </motion.div>

      {/* Cross link (mobile) */}
      <motion.div variants={item} className="md:hidden">
        <VerticalLink label="la SPA también cachea el catálogo" />
      </motion.div>

      {/* Device storage */}
      <motion.div variants={item} className="md:col-start-3 md:row-start-6">
        <Node title="localStorage" meta="vame:catalog" tone="fallback" />
      </motion.div>
      <motion.div variants={item} className="md:col-start-3 md:row-start-7">
        <p className="pl-5 pt-2 font-mono text-[11px] leading-relaxed text-fg-subtle">
          copia desactualizada si Supabase falla
        </p>
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
      tone === "fallback"
        ? "border-dashed border-border-strong bg-transparent"
        : tone === "source"
          ? "bg-bg-overlay"
          : "border-border bg-bg-overlay/60"
    }`}
    style={tone === "source" ? { borderColor: ACCENT } : undefined}
  >
    <span
      className={`text-sm font-medium text-fg ${
        tone === "default" ? "" : "font-mono"
      }`}
    >
      {title}
    </span>
    <span
      className="font-mono text-[11px] text-fg-subtle"
      style={tone === "source" ? { color: ACCENT } : undefined}
    >
      {meta}
    </span>
  </div>
);

const VerticalLink = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 py-1.5 pl-5">
    <div className="flex flex-col items-center text-border-strong">
      <span className="h-4 w-px bg-border-strong" />
      <ArrowDown className="-mt-1 h-3 w-3" aria-hidden="true" />
    </div>
    <span className="font-mono text-[11px] text-fg-subtle">{label}</span>
  </div>
);

const HorizontalLink = ({ label }: { label: string }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2">
    <span className="font-mono text-[11px] text-fg-subtle">{label}</span>
    <div className="flex w-full items-center text-border-strong">
      <span className="h-px flex-1 bg-border-strong" />
      <ArrowRight className="-ml-1 h-3 w-3 shrink-0" aria-hidden="true" />
    </div>
  </div>
);

export default ArchitectureDiagram;
