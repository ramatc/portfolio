import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import ArchitectureDiagram from "@/app/proyectos/vame/ArchitectureDiagram";

const ACCENT = "#e0a83e";
const SITE_URL = "https://www.vamefutbol.com/";
const PAGE_PATH = "/proyectos/vame";
const TITLE = "Vame Fútbol · Caso de estudio";
const OG_IMAGE_ALT =
  "Portfolio de Ramiro Tanquias Cornejo - Full Stack Developer y Técnico Universitario en Programación";
const DESCRIPTION =
  "Cómo llevé Vame Fútbol de un HTML estático a una tienda en React: stock por talle desde Supabase, checkout por WhatsApp e imágenes livianas para un público que compra desde el celular.";

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
  { id: "resultados", label: "Resultados" },
  { id: "en-camino", label: "En camino" },
] as const;

const STACK = [
  "React 19",
  "TypeScript",
  "Vite 6",
  "React Router 7",
  "Supabase",
  "Vercel",
];

interface Decision {
  title: string;
  decision: React.ReactNode;
  why: React.ReactNode;
  tradeoff: React.ReactNode;
}

const DECISIONS: Decision[] = [
  {
    title: "Stock por talle, sin que un agotado corte la venta",
    decision: (
      <>
        Las columnas <Code>stock_s</Code> a <Code>stock_xxxl</Code> se
        convierten en un <Code>stockBySize</Code>, y cada producto tiene un{" "}
        <Code>stock_mode</Code>: <Code>inmediato</Code> o{" "}
        <Code>encargo</Code>. Un talle sin stock sigue siendo seleccionable:
        aparece la nota “se hace por encargo” y el botón pasa a “Realizar
        encargo”. Al entrar, queda elegido el primer talle con stock.
      </>
    ),
    why: (
      <>
        Un talle agotado no es una venta perdida, es un encargo. En cambio, el
        filtro por talle responde otra pregunta, “qué puedo comprar ahora”, y
        solo muestra stock confirmado mayor a cero. Los productos con stock se
        ordenan primero con un sort estable, y cuando queda una sola unidad
        aparece el aviso “Última unidad”.
      </>
    ),
    tradeoff: (
      <>
        El mapa por talle se arma solo si todas las columnas traen números. Si
        falta alguno, todos los talles se tratan como disponibles: prefiero no
        esconder un producto por un dato incompleto, aunque eso puede terminar
        en un encargo en vez de una entrega inmediata.
      </>
    ),
  },
  {
    title: "Carrito en el dispositivo y cierre por WhatsApp",
    decision: (
      <>
        El carrito vive en <Code>localStorage</Code> (<Code>vame:cart</Code>)
        a través de un hook genérico <Code>useLocalStorage</Code> con un
        validador de tipos: si el JSON está roto, tiene otra forma o el storage
        no está disponible, vuelve al valor por defecto. El checkout arma un
        mensaje por línea (equipo, temporada, variante, talle, dorsal y
        cantidad) más el total, y lo abre en WhatsApp.
      </>
    ),
    why: (
      <>
        Así compran los clientes de Vame: desde el celular y conversando. Cada
        línea se identifica por <Code>key|size|dorsalName|dorsalNumber</Code>, lo
        que corrigió un bug heredado: cantidad y borrar usaban solo el
        producto, así que dos líneas de la misma camiseta se pisaban. El
        mensaje se codifica una sola vez con <Code>encodeURIComponent</Code>,
        para que un dorsal con <Code>&amp;</Code>, <Code>#</Code> o{" "}
        <Code>%</Code> no rompa la URL.
      </>
    ),
    tradeoff: (
      <>
        No hay pago en el sitio: el pedido se confirma a mano, fuera de la
        tienda. Y el carrito queda en ese dispositivo, sin sincronizarse entre
        celular y computadora.
      </>
    ),
  },
  {
    title: "Imágenes pensadas para el celular",
    decision: (
      <>
        Las URLs de Supabase Storage se reescriben de <Code>/object/</Code> a{" "}
        <Code>/render/image/</Code> con una caja cuadrada,{" "}
        <Code>resize=contain</Code> y <Code>quality=75</Code>. El componente{" "}
        <Code>KitImage</Code> carga en diferido por defecto; con{" "}
        <Code>priority</Code> pasa a eager con{" "}
        <Code>fetchPriority=&quot;high&quot;</Code>, y mientras tanto muestra
        un skeleton con shimmer. La imagen del hero se precarga en{" "}
        <Code>index.html</Code> con sustitución de variables de Vite, y las
        fuentes son propias y precargadas.
      </>
    ),
    why: (
      <>
        Casi todo el tráfico llega desde el celular. Durante el desarrollo vi
        fotos de unos 6 MB bajar a menos de 150 KB con la transformación, y un
        LCP de más de 19 segundos que dejó de aparecer. Son observaciones
        hechas mientras desarrollaba, no un benchmark auditado.
      </>
    ),
    tradeoff: (
      <>
        Las fotos pasan a depender del servicio de transformación de Supabase,
        y la caja cuadrada con <Code>contain</Code> fuerza un mismo formato
        para todas, aunque el original no sea cuadrado.
      </>
    ),
  },
];

const HARD_PROBLEMS = [
  {
    title: "Supabase no adivina la otra dimensión",
    body: (
      <>
        Al transformar una imagen, Supabase no infiere la dimensión que falta.
        Pedir solo un ancho no alcanzaba: la solución fue una caja cuadrada
        explícita con <Code>resize=contain</Code>.
      </>
    ),
  },
  {
    title: "Rutas del cliente en Vercel",
    body: (
      <>
        En una SPA, el router vive en el navegador. Sin un rewrite hacia la
        app en Vercel, abrir un link directo a una página interna no
        encontraba nada que servir.
      </>
    ),
  },
  {
    title: "Una anon key que solo puede leer una vista",
    body: (
      <>
        Un incidente previo de RLS con la anon key en el mismo proyecto de
        Supabase dejó una regla: la anon key solo tiene <Code>select</Code>{" "}
        sobre <Code>storefront_products</Code>, y lo que escribe usa la
        service role desde el servidor.
      </>
    ),
  },
  {
    title: "Extensiones .js en el servidor",
    body: (
      <>
        Las funciones de Node en Vercel necesitan la extensión{" "}
        <Code>.js</Code> explícita en los imports. Sin ella, el import no
        resuelve.
      </>
    ),
  },
];

const RESULTS = [
  { value: "5.800+", label: "visitantes" },
  { value: "19.000", label: "páginas vistas" },
  { value: "97%", label: "tráfico mobile" },
];

const IN_PROGRESS: React.ReactNode[] = [
  <>
    Checkout en <Code>/checkout</Code> con transferencia bancaria
  </>,
  <>
    <Code>api/orders/create</Code> valida el pedido y recalcula precio,
    descuento y recargo por dorsal en el servidor: el cliente nunca manda un
    precio
  </>,
  <>
    Chequeo de stock para productos <Code>inmediato</Code>, con un{" "}
    <Code>409</Code> si no alcanza
  </>,
  <>
    Los pedidos vencen a las 24 h con un cron protegido por{" "}
    <Code>CRON_SECRET</Code>
  </>,
];

const NOT_YET = ["Pago con tarjeta vía Mercado Pago", "Reserva de stock"];

export default function VameCaseStudyPage() {
  return (
    <main
      id="top"
      className="mx-auto min-h-screen max-w-container px-6 pb-4 pt-28 md:px-10 md:pt-36 lg:px-12"
    >
      <a
        href="/#proyectos"
        className="group inline-flex items-center gap-2 rounded-md text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-overlay/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            En producción
          </span>
        </div>
        <h1
          className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl"
          style={{ color: ACCENT }}
        >
          Vame Fútbol
        </h1>
        <p className="mt-5 max-w-[46ch] text-balance text-xl leading-snug text-fg md:text-2xl">
          Una tienda de camisetas de fútbol hecha para cómo compran sus
          clientes: desde el celular y cerrando por WhatsApp.
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
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex h-10 items-center gap-2 rounded-md border border-border bg-bg-elevated px-4 text-sm font-medium text-fg transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        >
          Ver la tienda en vivo
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
                Vame Fútbol vende camisetas de fútbol retro y actuales. El punto
                de partida era un único HTML estático con{" "}
                <strong>427 productos</strong> escritos a mano en el código.
              </p>
              <p>
                La migración a React se hizo en <strong>8 PRs
                encadenados</strong>, con un commit base para poder volver
                atrás en cualquier momento. Después, el catálogo pasó a vivir
                solo en Supabase, las fotos en Supabase Storage, y el stock
                empezó a sincronizarse por talle. En total fueron 121 commits
                entre julio y septiembre de 2026.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="arquitectura" title="Arquitectura">
            <figure className="rounded-xl border border-border bg-bg-elevated p-5 md:p-8">
              <ArchitectureDiagram />
              <figcaption className="mt-6 border-t border-border-subtle pt-4 text-xs leading-relaxed text-fg-subtle">
                La tienda no escribe en la base: lee una vista que es de la app
                de inventario. El catálogo se pide una vez al cargar, no en
                tiempo real.
              </figcaption>
            </figure>
            <Prose className="mt-8">
              <p>
                El inventario lo maneja otra aplicación,{" "}
                <strong>kitstock-pro</strong>, que es dueña de la vista{" "}
                <Code>storefront_products</Code>. La tienda la consulta con la
                anon key, que solo tiene permiso de <Code>select</Code> sobre
                esa vista.
              </p>
              <p>
                Cada vez que el catálogo llega bien, se guarda en{" "}
                <Code>localStorage</Code>. Si Supabase falla, la tienda muestra
                esa última copia en lugar de una página vacía. Para el estado
                no hay librería: alcanzan dos contextos,{" "}
                <Code>CartProvider</Code> y <Code>CatalogFilterProvider</Code>.
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
                  200+
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  tests unitarios
                </span>
              </p>
              <Prose>
                <p>
                  Más de 200 tests unitarios y de componentes con{" "}
                  <strong>Vitest</strong>, jsdom y React Testing Library,
                  repartidos en 26 archivos.
                </p>
                <p>
                  Arriba de eso, <strong>Playwright</strong> recorre la tienda
                  de punta a punta: 6 specs y 19 tests que corren contra el
                  build de producción, no contra el servidor de desarrollo.
                  Por ahora se ejecutan de forma local; todavía no hay CI.
                </p>
              </Prose>
            </div>
          </CaseSection>

          <CaseSection id="resultados" title="Resultados">
            <dl className="grid grid-cols-1 gap-8 border-y border-border-subtle py-8 sm:grid-cols-3 md:py-10">
              {RESULTS.map((result) => (
                <div key={result.label}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    {result.label}
                  </dt>
                  <dd
                    className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl"
                    style={{ color: ACCENT }}
                  >
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Prose className="mt-8">
              <p>
                Son los números del <strong>primer mes</strong>. El 97% de
                tráfico mobile confirma lo que guió el diseño: una tienda que
                tiene que ser liviana y cómoda en el celular, y que cierra la
                venta donde el cliente ya conversa.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="en-camino" title="En camino: checkout online">
            <Prose>
              <p>
                El siguiente paso es cobrar dentro del sitio. Está construido en
                una rama aparte (<Code>feat/checkout-pagos</Code>) y todavía no
                está mergeado. Mientras tanto, <strong>WhatsApp sigue siendo el
                canal principal</strong> hasta que el nuevo demuestre que
                funciona.
              </p>
            </Prose>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  En la rama
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {IN_PROGRESS.map((entry, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-fg"
                    >
                      <Check
                        className="mt-[3px] h-4 w-4 shrink-0"
                        style={{ color: ACCENT }}
                        aria-hidden="true"
                      />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  Todavía no
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {NOT_YET.map((entry) => (
                    <li
                      key={entry}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border border-fg-subtle"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-fg-subtle">
                  Sin construir todavía.
                </p>
              </div>
            </div>
          </CaseSection>

          <section className="mt-8 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-bg-elevated p-6 md:mt-12 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
                ¿Querés verla funcionando?
              </h2>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-fg-muted">
                Vame está en producción. También podés volver a los demás
                proyectos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#proyectos"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-bg-overlay px-4 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Proyectos
              </a>
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium text-bg-base transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                style={{ backgroundColor: ACCENT }}
              >
                Ver la tienda
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
