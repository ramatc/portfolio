"use client";

import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import GitHub from "@/app/ui/icons/GitHub";
import { Project } from "@/app/lib/definitions";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const AUTOPLAY_MS = 7000;

const KIND_LABEL: Record<Project["kind"], string> = {
  client: "Cliente real",
  personal: "Proyecto personal",
};

const statusOf = (project: Project) =>
  project.inProgress
    ? { label: "En desarrollo", live: false }
    : { label: "Publicado", live: true };

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }}
    >
      <div className="hidden md:block">
        <Selector projects={projects} />
      </div>
      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-xl border border-border bg-bg-elevated"
          >
            <ProjectDetail project={project} />
          </article>
        ))}
      </div>
    </motion.div>
  );
};

const Selector = ({ projects }: { projects: Project[] }) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);

  // Autoplay stops for good once the visitor picks a project themselves.
  const autoplay = !reduceMotion && !stopped;
  const playing = autoplay && inView && !hovered && !focused;

  const advance = () => setActive((current) => (current + 1) % projects.length);

  const choose = (index: number) => {
    setStopped(true);
    setActive(index);
  };

  const select = (next: number) => {
    const index = (next + projects.length) % projects.length;
    choose(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(projects.length - 1),
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      className="grid grid-cols-[minmax(0,18rem)_minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-6">
      <div
        role="tablist"
        aria-label="Proyectos"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 pl-6"
      >
        {projects.map((project, i) => {
          const isActive = i === active;
          const status = statusOf(project);
          const isLast = i === projects.length - 1;
          return (
            <button
              key={project.title}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => choose(i)}
              className="group relative flex w-full flex-1 flex-col rounded-xl p-3.5 text-left transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 active:scale-[0.985] motion-reduce:transition-none"
            >
              {isLast ? null : (
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-[1.45rem] h-[calc(100%+0.75rem)] w-px translate-x-[5px] bg-border-strong/70"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute -left-6 top-[1.1rem] h-[11px] w-[11px] rounded-full border-2 border-bg-base transition-[background-color,box-shadow] duration-300 ease-out"
                style={{
                  backgroundColor: isActive
                    ? project.accent
                    : "hsl(var(--border-strong))",
                  boxShadow: isActive ? `0 0 0 4px ${project.accent}33` : "none",
                }}
              />
              {isActive ? (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border bg-bg-elevated shadow-md"
                  style={{ borderColor: `${project.accent}59` }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.4, bounce: 0 }
                  }
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-border-subtle bg-bg-elevated/30 transition-colors duration-200 group-hover:border-border group-hover:bg-bg-elevated/60"
                />
              )}

              <span className="relative flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span
                    className={`block text-lg font-semibold tracking-tight transition-colors duration-200 ${
                      isActive ? "text-fg" : "text-fg-muted group-hover:text-fg"
                    }`}
                  >
                    {project.title}
                  </span>
                  <span className="mt-0.5 block text-pretty text-sm leading-snug text-fg-subtle">
                    {project.tagline}
                  </span>
                </span>
                <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 text-[11px] text-fg-muted">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${status.live ? "bg-success" : ""}`}
                    style={
                      status.live ? undefined : { backgroundColor: project.accent }
                    }
                  />
                  {status.label}
                </span>
              </span>

              <span
                className={`relative mt-3 block min-h-32 flex-1 overflow-hidden rounded-lg border transition-[filter,opacity,border-color] duration-300 ease-out ${
                  isActive
                    ? "border-border-strong opacity-100"
                    : "border-border-subtle opacity-75 grayscale-[40%] group-hover:opacity-100 group-hover:grayscale-0"
                }`}
              >
                <Image
                  src={`/projects/${project.image}`}
                  alt=""
                  fill
                  sizes="336px"
                  className="object-cover object-top transition-transform duration-500 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                {isActive && autoplay ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-bg-base/60"
                  >
                    <span
                      key={active}
                      onAnimationEnd={advance}
                      className="block h-full origin-left"
                      style={{
                        backgroundColor: project.accent,
                        animation: `project-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                    />
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid overflow-hidden rounded-xl border border-border bg-bg-elevated">
        {projects.map((project, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={project.title}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0, filter: "blur(0px)", visibility: "visible" }
                  : {
                      opacity: 0,
                      y: 10,
                      filter: "blur(6px)",
                      transitionEnd: { visibility: "hidden" },
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: isActive ? 0.45 : 0.2, ease: EASE_OUT }
              }
              style={{ gridArea: "1 / 1" }}
              className={isActive ? "z-10" : "pointer-events-none"}
            >
              <ProjectDetail project={project} priority={i === 0} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ProjectDetail = ({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) => {
  const hasDemo = Boolean(project.url);
  const status = statusOf(project);

  return (
    <div className="flex h-full flex-col">
      <Gallery project={project} priority={priority} />

      <div className="flex flex-1 flex-col p-5 md:p-7">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs text-fg-subtle">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  status.live ? "bg-success" : ""
                }`}
                style={status.live ? undefined : { backgroundColor: project.accent }}
              />
              {status.label}
              <span aria-hidden="true">·</span>
              {KIND_LABEL[project.kind]}
            </p>
            <h3
              className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl"
              style={{ color: project.accent }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {hasDemo ? (
              <IconLink href={project.url} label={`Abrir demo de ${project.title}`}>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </IconLink>
            ) : null}
            {project.repo ? (
              <IconLink
                href={project.repo}
                label={`Ver código de ${project.title} en GitHub`}
              >
                <GitHub className="h-4 w-4" />
              </IconLink>
            ) : null}
          </div>
        </header>

        <div className="mb-7 mt-5 grid gap-7 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
          <div>
            <p className="max-w-prose text-pretty leading-relaxed text-fg-muted">
              {project.description}
            </p>
            <ul className="mt-5 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            {project.metrics?.length ? (
              <dl className="grid grid-cols-3 gap-5">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1.5 font-mono text-[11px] uppercase leading-snug tracking-wider text-fg-subtle">
                      {metric.label}
                    </dt>
                    <dd className="text-xl font-semibold tracking-tight text-fg tabular-nums">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                Lo que demuestra
              </p>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-fg">
                {project.proves}
              </p>
            </div>
            {project.caseStudy ? (
              <Link
                href={project.caseStudy}
                className="group/case inline-flex w-fit items-center gap-2 rounded-lg border border-border-strong bg-bg-overlay px-4 py-2 text-sm font-semibold text-fg transition-[background-color,transform] duration-150 ease-out hover:bg-bg-overlay/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 active:scale-[0.97] motion-reduce:transition-none"
              >
                Ver caso de estudio
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover/case:translate-x-0.5 motion-reduce:transition-none"
                  style={{ color: project.accent }}
                  aria-hidden="true"
                />
              </Link>
            ) : null}
          </div>
        </div>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border-subtle pt-5">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 font-mono text-xs text-fg-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-subtle">
            {project.role} · <time>{project.year}</time>
          </p>
        </footer>
      </div>
    </div>
  );
};

const Gallery = ({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) => {
  const slides = project.gallery?.length ? project.gallery : [project.image];
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const hasMany = slides.length > 1;

  const go = (next: number) =>
    setCurrent((next + slides.length) % slides.length);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(current + 1);
    else if (event.key === "ArrowLeft") go(current - 1);
    else return;
    event.preventDefault();
  };

  return (
    <motion.div
      role={hasMany ? "region" : undefined}
      aria-roledescription={hasMany ? "carrusel" : undefined}
      aria-label={hasMany ? `Capturas de ${project.title}` : undefined}
      tabIndex={hasMany ? 0 : undefined}
      onKeyDown={hasMany ? onKeyDown : undefined}
      onPanEnd={
        hasMany
          ? (_, info) => {
              if (Math.abs(info.offset.x) < 40) return;
              go(current + (info.offset.x < 0 ? 1 : -1));
            }
          : undefined
      }
      className="group/gallery relative grid aspect-[4/3] touch-pan-y overflow-hidden border-b border-border-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60 md:aspect-[16/9]"
    >
      {slides.map((slide, i) => {
        const isCurrent = i === current;
        return (
          <motion.div
            key={slide}
            aria-hidden={!isCurrent}
            initial={false}
            animate={{
              opacity: isCurrent ? 1 : 0,
              filter: isCurrent ? "blur(0px)" : "blur(6px)",
              scale: isCurrent ? 1 : 1.015,
            }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT }
            }
            style={{ gridArea: "1 / 1" }}
            className="relative"
          >
            <Image
              src={`/projects/${slide}`}
              alt={`Captura ${i + 1} de ${slides.length} de ${project.title}`}
              fill
              priority={priority && i === 0}
              sizes="(max-width: 768px) 100vw, 880px"
              className="object-cover object-top"
              draggable={false}
            />
          </motion.div>
        );
      })}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated/70 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
        }}
      />

      {hasMany ? (
        <>
          <GalleryArrow side="left" onClick={() => go(current - 1)} />
          <GalleryArrow side="right" onClick={() => go(current + 1)} />
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide}
                type="button"
                aria-label={`Ver captura ${i + 1}`}
                aria-current={i === current}
                onClick={() => setCurrent(i)}
                className="group/dot grid h-6 place-items-center px-0.5 focus-visible:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-brand/60 ${
                    i === current ? "w-5 bg-fg" : "w-1.5 bg-fg/40 hover:bg-fg/70"
                  }`}
                />
              </button>
            ))}
          </div>
          <p
            aria-live="polite"
            className="absolute right-3 top-3 rounded-md bg-bg-base/70 px-2 py-0.5 font-mono text-xs tabular-nums text-fg-muted backdrop-blur-sm"
          >
            {current + 1} / {slides.length}
          </p>
        </>
      ) : null}
    </motion.div>
  );
};

const GalleryArrow = ({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-label={side === "left" ? "Captura anterior" : "Captura siguiente"}
    onClick={onClick}
    className={`absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg-base/70 text-fg backdrop-blur-sm transition-[opacity,transform] duration-200 ease-out focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 active:scale-[0.92] md:opacity-0 md:group-hover/gallery:opacity-100 motion-reduce:transition-none ${
      side === "left" ? "left-3" : "right-3"
    }`}
  >
    {side === "left" ? (
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    ) : (
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    )}
  </button>
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
    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-bg-overlay text-fg-muted transition-[color,border-color,transform] duration-150 ease-out hover:border-border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 active:scale-[0.95] motion-reduce:transition-none"
  >
    {children}
  </a>
);

export default ProjectShowcase;
