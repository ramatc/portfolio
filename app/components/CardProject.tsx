"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import GitHub from "@/app/ui/icons/GitHub";
import { Project } from "@/app/lib/definitions";

type CardVariant = "featured" | "compact";

interface CardProjectProps {
  project: Project;
  index: number;
  variant?: CardVariant;
}

const KIND_LABEL: Record<Project["kind"], string> = {
  client: "Cliente real",
  personal: "Proyecto personal",
};

const CardProject = ({
  project,
  index,
  variant = "compact",
}: CardProjectProps) => {
  const reduceMotion = useReducedMotion();
  const isFeatured = variant === "featured";
  const hasDemo = Boolean(project.url);
  const previewHref = hasDemo ? project.url : project.repo;
  const previewLabel = hasDemo
    ? `Abrir demo de ${project.title}`
    : `Ver código de ${project.title} en GitHub`;

  const preview = (
    <div
      className={`relative overflow-hidden border-b border-border-subtle ${
        isFeatured ? "aspect-[4/3] md:aspect-[5/2]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={`/projects/${project.image}`}
        alt={`Vista previa de ${project.title}`}
        fill
        sizes={
          isFeatured
            ? "(max-width: 768px) 100vw, 1104px"
            : "(max-width: 768px) 100vw, 552px"
        }
        className={`object-cover ${
          isFeatured ? "object-top md:object-[center_40%]" : "object-top"
        } transition-transform duration-700 ease-smooth will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/50 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
        }}
      />
    </div>
  );

  const narrative = (
    <div>
      <CardHeader project={project} hasDemo={hasDemo} large={isFeatured} />
      <p
        className={`mt-3 text-pretty leading-relaxed text-fg-muted ${
          isFeatured ? "text-sm md:text-base" : "text-sm"
        }`}
      >
        {project.description}
      </p>
      <Highlights items={project.highlights} />
    </div>
  );

  const evidence = (
    <div className="flex flex-col gap-6">
      <Metrics metrics={project.metrics} />
      <Proves project={project} />
      <CaseStudyLink project={project} />
    </div>
  );

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.55,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated transition-colors duration-300 hover:border-border-strong"
    >
      {previewHref ? (
        <a
          href={previewHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={previewLabel}
          className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60"
        >
          {preview}
        </a>
      ) : (
        <div className="relative overflow-hidden">{preview}</div>
      )}

      {isFeatured ? (
        <div className="flex flex-1 flex-col p-5 md:px-8 md:py-7">
          <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10">
            {narrative}
            <div className="flex flex-col md:pt-7">{evidence}</div>
          </div>
          <CardFooter project={project} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-5 md:p-6">
          {narrative}
          <div className="mt-6">{evidence}</div>
          <CardFooter project={project} />
        </div>
      )}
    </motion.article>
  );
};

const CardHeader = ({
  project,
  hasDemo,
  large,
}: {
  project: Project;
  hasDemo: boolean;
  large: boolean;
}) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          {KIND_LABEL[project.kind]}
        </span>
        {project.inProgress ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            En desarrollo
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-1 font-semibold tracking-tight ${
          large ? "text-xl md:text-2xl" : "text-lg md:text-xl"
        }`}
        style={{ color: project.accent }}
      >
        {project.title}
      </h3>
    </div>
    <div className="flex shrink-0 gap-1.5">
      {hasDemo ? (
        <IconLink href={project.url} label={`Abrir demo de ${project.title}`}>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </IconLink>
      ) : null}
      {project.repo ? (
        <IconLink
          href={project.repo}
          label={`Ver código de ${project.title} en GitHub`}
        >
          <GitHub className="h-3.5 w-3.5" />
        </IconLink>
      ) : null}
    </div>
  </div>
);

const Highlights = ({ items }: { items: string[] }) =>
  items.length > 0 ? (
    <ul className="mt-4 space-y-1.5">
      {items.map((highlight) => (
        <li
          key={highlight}
          className="flex items-start gap-2 text-sm leading-relaxed text-fg-muted"
        >
          <span
            aria-hidden="true"
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle"
          />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  ) : null;

const Metrics = ({ metrics }: { metrics: Project["metrics"] }) =>
  metrics?.length ? (
    <dl className="grid grid-cols-3 gap-3 border-y border-border-subtle py-2.5">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse">
          <dt className="mt-0.5 font-mono text-[10px] uppercase leading-tight tracking-wider text-fg-subtle">
            {metric.label}
          </dt>
          <dd className="text-base font-semibold tracking-tight text-fg md:text-lg">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  ) : null;

const Proves = ({ project }: { project: Project }) => (
  <div className="border-l pl-3" style={{ borderColor: project.accent }}>
    <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
      Lo que demuestra
    </span>
    <p className="mt-1 text-pretty text-sm leading-relaxed text-fg">
      {project.proves}
    </p>
  </div>
);

const CaseStudyLink = ({ project }: { project: Project }) =>
  project.caseStudy ? (
    <Link
      href={project.caseStudy}
      className="group/case inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
    >
      Ver caso de estudio
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover/case:translate-x-0.5 motion-reduce:transition-none"
        style={{ color: project.accent }}
        aria-hidden="true"
      />
    </Link>
  ) : null;

const CardFooter = ({ project }: { project: Project }) => (
  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
    <ul className="flex flex-wrap gap-1.5">
      {project.stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 font-mono text-xs text-fg-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
      <span>{project.role}</span>
      <span aria-hidden="true">·</span>
      <time>{project.year}</time>
    </div>
  </div>
);

const IconLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-bg-overlay text-fg-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
  >
    {children}
  </a>
);

export default CardProject;
