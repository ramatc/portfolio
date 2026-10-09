import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { buttonClasses } from "@/app/ui/button";
import GitHub from "@/app/ui/icons/GitHub";
import ArchitectureDiagram from "@/app/proyectos/coda/ArchitectureDiagram";

const ACCENT = "#8b7cf6";
const REPO_URL = "https://github.com/ramatc/coda";
const PAGE_PATH = "/proyectos/coda";
const TITLE = "Coda · Caso de estudio";
const OG_IMAGE_ALT =
  "Portfolio de Ramiro Tanquias Cornejo - Full Stack Developer y Técnico Universitario en Programación";
const DESCRIPTION =
  "Cómo diseñé Coda, un diario musical social: monolito modular en NestJS, pipeline de catálogo con rate limiting, búsqueda en Meilisearch y recomendaciones explicables.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "article",
    locale: "es_AR",
    url: PAGE_PATH,
    siteName: "Ramiro Tanquias",
    title: TITLE,
    description: DESCRIPTION,
    // Root file-based OG images are not inherited by this segment's metadata.
    images: [{ url: "/opengraph-image.jpg", alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.jpg", alt: OG_IMAGE_ALT }],
  },
};

const SECTIONS = [
  { id: "contexto", label: "Contexto" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "decisiones", label: "Decisiones" },
  { id: "problemas", label: "Problemas difíciles" },
  { id: "testing", label: "Testing" },
  { id: "estado", label: "Hecho y roadmap" },
] as const;

const STACK = [
  "Next.js 16",
  "NestJS 11",
  "TypeScript",
  "PostgreSQL 17",
  "Redis 7 · BullMQ",
  "Meilisearch",
];

interface Decision {
  title: string;
  decision: React.ReactNode;
  why: React.ReactNode;
  tradeoff: React.ReactNode;
}

const DECISIONS: Decision[] = [
  {
    title: "Un pipeline de catálogo que respeta a sus fuentes",
    decision: (
      <>
        Spotify siembra el catálogo y MusicBrainz lo enriquece; un match se
        acepta solo con score <Code>&gt;= 80</Code>. Las importaciones son
        idempotentes y reanudables: ids de job determinísticos, checkpoint de
        paginación en Redis y upserts sobre <Code>spotifyId</Code> único.
      </>
    ),
    why: (
      <>
        MusicBrainz permite 1 request por segundo, y el límite se aplica dos
        veces: un limiter de BullMQ para toda la flota (1 job cada 1100 ms) y
        un gate serializado en el cliente. Los fallos se reintentan hasta 5
        veces con backoff exponencial.
      </>
    ),
    tradeoff: (
      <>
        Importar es lento a propósito. A cambio, se respeta el límite de
        MusicBrainz y un proceso caído retoma donde quedó sin duplicar
        datos.
      </>
    ),
  },
  {
    title: "Búsqueda como proyección reconstruible",
    decision: (
      <>
        Postgres es la fuente de verdad. Meilisearch es una proyección de
        lectura que se actualiza a través de la cola{" "}
        <Code>search-sync</Code>, y <Code>reindex:search</Code> la reconstruye
        desde cero.
      </>
    ),
    why: (
      <>
        La búsqueda tolerante a typos necesita un motor dedicado, pero ese
        motor no debería ser dueño de ningún dato. Si el índice se corrompe o
        cambia el esquema, se vuelve a generar.
      </>
    ),
    tradeoff: (
      <>
        Consistencia eventual: entre una escritura y su sincronización, la
        búsqueda puede mostrar datos levemente desactualizados.
      </>
    ),
  },
  {
    title: "Recomendaciones v1: simples y explicables",
    decision: (
      <>
        Una heurística precalculada en workers:{" "}
        <Code>0.5 género + 0.35 artista + 0.15 popularidad (log)</Code>. Un
        prefiltro SQL por los 5 géneros principales del usuario acota a 300
        candidatos y se guardan los 50 mejores. Se regeneran con un debounce
        de 5 minutos y un refresh nocturno.
      </>
    ),
    why: (
      <>
        Cada recomendación guarda su razón (<Code>topGenre</Code>,{" "}
        <Code>matchedArtist</Code>), así la interfaz puede mostrar “Because
        you like {"{género}"}” o “Because you follow this artist” en lugar de
        una caja negra.
      </>
    ),
    tradeoff: (
      <>
        Deliberadamente simple antes de cualquier modelo de ML. Captura menos
        matices, pero es barata, predecible y fácil de depurar.
      </>
    ),
  },
];

const HARD_PROBLEMS = [
  {
    title: "El techo de la búsqueda de Spotify",
    body: (
      <>
        La búsqueda de Spotify corta la paginación en el offset 1000. Eso
        bloquea la meta de un catálogo de 100k álbumes si solo se siembra por
        búsqueda.
      </>
    ),
  },
  {
    title: "Un job que BullMQ ignoraba en silencio",
    body: (
      <>
        Con ids determinísticos, un job que quedaba en estado completado hacía
        que BullMQ salteara el siguiente con el mismo id, sin error. Se
        resolvió con <Code>removeOnComplete</Code>.
      </>
    ),
  },
  {
    title: "Ids de job con dos puntos",
    body: (
      <>
        BullMQ rechaza <Code>:</Code> en los ids de job, así que los ids
        determinísticos tienen que armarse con otro separador.
      </>
    ),
  },
  {
    title: "Specs que nunca corrían en CI",
    body: (
      <>
        Un error de orden en el pipeline de CI hacía que los specs contra
        infraestructura real se saltearan siempre. Un CI en verde no prueba
        nada si los tests importantes no se ejecutan.
      </>
    ),
  },
];

const SHIPPED = [
  "Importación de catálogo",
  "Búsqueda",
  "Registro de escuchas",
  "Reseñas",
  "Listas",
  "Feed social con paginación por cursor",
  "Notificaciones",
  "Recomendaciones v1",
];

const ROADMAP = [
  "Filtrado colaborativo",
  "Embeddings con pgvector",
  "Servicio de recomendaciones en Python",
  "App mobile",
  "Páginas públicas para SEO",
];

export default function CodaCaseStudyPage() {
  return (
    <main
      id="top"
      className="mx-auto min-h-screen max-w-container px-6 pb-4 pt-28 md:px-10 md:pt-36 lg:px-12"
    >
      <a
        href="/#proyectos"
        className={buttonClasses({
          variant: "ghost",
          size: "sm",
          className: "group -ml-3",
        })}
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
        Volver a proyectos
      </a>

      <header className="mt-10 border-b border-border-subtle pb-12 md:mt-14 md:pb-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
            Caso de estudio
          </span>
          <span aria-hidden="true" className="text-xs text-fg-subtle">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            En desarrollo
          </span>
        </div>
        <h1
          className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl"
          style={{ color: ACCENT }}
        >
          Coda
        </h1>
        <p className="mt-5 max-w-[46ch] text-balance text-xl leading-snug text-fg md:text-2xl">
          Un diario musical social: registrás lo que escuchás, reseñás álbumes
          y recibís recomendaciones que explican por qué.
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[auto_auto_minmax(0,1fr)] md:gap-12">
          <MetaItem label="Rol" value="Fullstack" />
          <MetaItem label="Año" value="2026" />
          <MetaItem
            label="Stack"
            value={
              <ul className="flex flex-wrap gap-1.5">
                {STACK.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 font-mono text-xs text-fg-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            }
          />
        </dl>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({
            variant: "secondary",
            size: "md",
            className: "group mt-10",
          })}
        >
          <GitHub className="h-4 w-4" />
          Ver el código en GitHub
          <ArrowUpRight
            className="h-4 w-4 text-fg-muted transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </a>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Secciones del caso de estudio" className="hidden lg:block">
          <ul className="sticky top-28 mt-16 space-y-1 border-l border-border-subtle">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-fg-subtle transition-colors hover:border-fg-muted hover:text-fg focus-visible:text-fg focus-visible:outline-none"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <CaseSection id="contexto" title="Contexto y problema">
            <Prose>
              <p>
                Coda es un diario musical social. Registrás lo que escuchás,
                calificás y reseñás álbumes, armás listas rankeables y seguís
                la actividad de otras personas.
              </p>
              <p>
                La idea central es que sea un <strong>diario</strong>, no un
                feed algorítmico: el centro es lo que vos escuchaste y
                opinaste. Las recomendaciones existen, pero siempre explican
                de dónde salen.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="arquitectura" title="Arquitectura">
            <figure className="rounded-xl border border-border bg-bg-elevated p-5 md:p-8">
              <ArchitectureDiagram />
              <figcaption className="mt-6 border-t border-border-subtle pt-4 text-xs leading-relaxed text-fg-subtle">
                Los workers corren como procesos separados de la API. Postgres
                es la única fuente de verdad; Meilisearch se puede reconstruir
                desde ahí.
              </figcaption>
            </figure>
            <Prose className="mt-8">
              <p>
                Es un <strong>monolito modular</strong>: una sola API en NestJS
                organizada por módulos, con el trabajo pesado delegado a
                workers de BullMQ. Para un equipo chico, eso significa
                desplegar y depurar una sola cosa y avanzar rápido, sin pagar
                el costo operativo de microservicios.
              </p>
              <p>
                El único candidato claro a separarse es un futuro servicio de
                recomendaciones en Python, y hoy está en el roadmap.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="decisiones" title="Tres decisiones técnicas">
            <ol className="divide-y divide-border-subtle border-y border-border-subtle">
              {DECISIONS.map((item, i) => (
                <li key={item.title} className="py-8 md:py-10">
                  <h3 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-fg md:text-xl">
                    <span
                      className="font-mono text-sm font-normal"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    >
                      {String.fromCharCode(97 + i)}.
                    </span>
                    {item.title}
                  </h3>
                  <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[7rem_minmax(0,1fr)]">
                    <DecisionRow label="Decisión">{item.decision}</DecisionRow>
                    <DecisionRow label="Por qué">{item.why}</DecisionRow>
                    <DecisionRow label="Tradeoff">{item.tradeoff}</DecisionRow>
                  </dl>
                </li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection id="problemas" title="Problemas difíciles">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              {HARD_PROBLEMS.map((problem) => (
                <li key={problem.title}>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">
                    {problem.body}
                  </p>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="testing" title="Cómo se testea">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
              <p className="flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-fg md:text-6xl">
                  570+
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  tests en la web
                </span>
              </p>
              <Prose>
                <p>
                  Todo se escribe con <strong>TDD estricto</strong> sobre
                  Vitest: primero el test que falla, después el código.
                </p>
                <p>
                  En CI, los specs corren contra Postgres, Redis y Meilisearch
                  reales. Así las colas, la búsqueda y las queries se prueban
                  contra la misma infraestructura que usan, no contra mocks.
                </p>
              </Prose>
            </div>
          </CaseSection>

          <CaseSection id="estado" title="Hecho y roadmap">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  Hecho
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {SHIPPED.map((entry) => (
                    <li
                      key={entry}
                      className="flex items-start gap-2.5 text-sm text-fg"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  Roadmap
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {ROADMAP.map((entry) => (
                    <li
                      key={entry}
                      className="flex items-start gap-2.5 text-sm text-fg-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full border border-fg-subtle"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-fg-subtle">
                  Especificado, todavía no implementado.
                </p>
              </div>
            </div>
          </CaseSection>

          <section className="mt-8 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-bg-elevated p-6 md:mt-12 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
                ¿Querés ver el resto?
              </h2>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-fg-muted">
                El código de Coda es público. También podés volver a los demás
                proyectos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#proyectos"
                className={buttonClasses({
                  variant: "secondary",
                  size: "md",
                  surface: "elevated",
                })}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Proyectos
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({
                  variant: "accent",
                  size: "md",
                  surface: "elevated",
                })}
                style={{ backgroundColor: ACCENT }}
              >
                <GitHub className="h-4 w-4" />
                Repositorio
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const CaseSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className="scroll-mt-24 py-14 md:py-20"
  >
    <h2
      id={`${id}-title`}
      className="mb-8 text-balance text-2xl font-semibold tracking-tight text-fg md:mb-10 md:text-3xl"
    >
      {title}
    </h2>
    {children}
  </section>
);

const Prose = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`max-w-prose space-y-4 text-pretty text-base leading-relaxed text-fg-muted [&_strong]:font-semibold [&_strong]:text-fg ${className}`}
  >
    {children}
  </div>
);

const MetaItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
      {label}
    </dt>
    {/* Min height matches a stack chip so text values and chips share a row line */}
    <dd className="mt-2 flex min-h-[1.375rem] items-center text-sm text-fg">
      {value}
    </dd>
  </div>
);

const DecisionRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <>
    <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle md:pt-1">
      {label}
    </dt>
    <dd className="-mt-2 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted md:mt-0 md:text-base">
      {children}
    </dd>
  </>
);

// Function declaration (hoisted): module-level content constants use it.
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-border-subtle bg-bg-overlay px-1 py-px font-mono text-[0.85em] text-fg">
      {children}
    </code>
  );
}
