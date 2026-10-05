"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import GitHub from "@/app/ui/icons/GitHub";
import { Project } from "@/app/lib/definitions";

interface CardProjectProps {
  project: Project;
  index: number;
}

const KIND_LABEL: Record<Project["kind"], string> = {
  client: "Cliente real",
  personal: "Proyecto personal",
};

const CardProject = ({ project, index }: CardProjectProps) => {
  const reduceMotion = useReducedMotion();
  const hasDemo = Boolean(project.url);
  const previewHref = hasDemo ? project.url : project.repo;
  const previewLabel = hasDemo
    ? `Abrir demo de ${project.title}`
    : `Ver código de ${project.title} en GitHub`;

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
      className="group relative grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-bg-elevated transition-colors duration-300 hover:border-border-strong md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <a
        href={previewHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={previewLabel}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full md:min-h-[15rem]">
          <Image
            src={`/projects/${project.image}`}
            alt={`Vista previa de ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            style={{ objectPosition: project.imagePosition ?? "center" }}
            className="object-cover transition-transform duration-700 ease-smooth will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg-base/40 via-transparent to-transparent md:bg-gradient-to-r"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
            }}
          />
        </div>
      </a>

      <div className="flex flex-col p-5 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
              {KIND_LABEL[project.kind]}
            </span>
            <h3
              className="mt-1 text-lg font-semibold tracking-tight md:text-xl"
              style={{ color: project.accent }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {hasDemo ? (
              <IconLink
                href={project.url}
                label={`Abrir demo de ${project.title}`}
              >
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

        <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted md:mt-3">
          {project.description}
        </p>

        {project.metrics?.length ? (
          <dl className="mt-4 grid grid-cols-3 gap-3 border-y border-border-subtle py-2.5">
            {project.metrics.map((metric) => (
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
        ) : null}

        {project.highlights.length > 0 ? (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((highlight) => (
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

        <div
          className="mt-4 border-l-2 pl-3"
          style={{ borderColor: project.accent }}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
            Lo que demuestra
          </span>
          <p className="mt-1 text-pretty text-sm leading-relaxed text-fg">
            {project.proves}
          </p>
        </div>

        <div className="mt-auto pt-5">
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
          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            <span>{project.role}</span>
            <span aria-hidden="true">·</span>
            <time>{project.year}</time>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

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
