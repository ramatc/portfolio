import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { buttonClasses } from "@/app/ui/button";

import ArchitectureDiagram from "@/app/proyectos/vame/ArchitectureDiagram";

const ACCENT = "#e0a83e";
const SITE_URL = "https://www.vamefutbol.com/";
const PAGE_PATH = "/proyectos/vame";
const TITLE = "Vame Fútbol · Caso de estudio";
const OG_IMAGE_ALT =
  "Portfolio de Ramiro Tanquias Cornejo - Full Stack Developer y Técnico Universitario en Programación";
const DESCRIPTION =
  "Cómo llevé Vame Fútbol de un HTML estático a una tienda en React: stock por talle desde Supabase, checkout propio con transferencia o Mercado Pago, reserva de stock y precios calculados en el servidor, para un público que compra desde el celular.";

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
  { id: "lo-que-sigue", label: "Lo que sigue" },
] as const;

const STACK = [
  "React 19",
  "TypeScript",
  "Vite 6",
  "React Router 7",
  "Supabase",
  "Vercel Functions",
  "Mercado Pago",
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
    title: "El cliente nunca manda un precio",
    decision: (
      <>
        El checkout en <Code>/checkout</Code> manda solo productos, talles,
        dorsales y datos de envío. <Code>api/orders/create</Code>, una función
        de Vercel, recalcula precio, recargo por dorsal, descuento de las
        Mystery Box, seña del 10% para los encargos y envío (gratis desde 3
        prendas), y guarda el pedido con una función SQL atómica,{" "}
        <Code>place_storefront_order</Code>, que valida el stock y lo reserva
        en la misma transacción.
      </>
    ),
    why: (
      <>
        Un precio que llega del navegador se puede editar. Y si dos personas
        compran el último talle a la vez, solo una transacción puede
        quedárselo: el stock de un pedido sin pagar queda reservado unas
        horas, y las unidades que ya no alcanzan pasan a encargo en vez de
        rechazar el pedido. Las reglas de seña y envío viven en un módulo
        compartido, así carrito, checkout y API nunca muestran montos
        distintos.
      </>
    ),
    tradeoff: (
      <>
        Más reglas en la base: límite de 50 prendas por pedido, de dos pedidos
        pendientes por teléfono y un cron diario que vence los impagos. Cada
        regla nueva pide una migración revisada y su test contra SQL real.
      </>
    ),
  },
  {
    title: "Mercado Pago: el webhook es la fuente de verdad",
    decision: (
      <>
        Al elegir Mercado Pago, la API crea una preferencia de Checkout Pro
        por lo que se cobra ahora y el cliente paga en la página de Mercado
        Pago. El resultado no se toma de la vuelta del navegador: un webhook
        verifica la firma <Code>x-signature</Code>, consulta el pago a la API
        de Mercado Pago (nunca confía en el cuerpo de la notificación) y lo
        registra con <Code>record_storefront_mp_payment</Code>.
      </>
    ),
    why: (
      <>
        La URL de retorno la puede abrir cualquiera; el webhook firmado no. Al
        volver, la página consulta el estado del pedido unos segundos hasta
        que llega el webhook y muestra “¡Recibimos tu pago!” o la opción de
        reintentar. Se excluyen efectivo y cajero para que el pago se resuelva
        dentro de la ventana de reserva, y las cuotas, hasta 12, llevan el
        interés de Mercado Pago a cargo del comprador.
      </>
    ),
    tradeoff: (
      <>
        Un pago aprobado no cierra solo el pedido: se confirma a mano en
        kitstock-pro con “Marcar como pagada”, igual que una transferencia.
        Es un paso manual a propósito, para que caja y encargos se registren
        en un solo lugar.
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
    title: "Notificaciones que llegan desordenadas",
    body: (
      <>
        Mercado Pago puede avisar un <Code>pending</Code> después de un{" "}
        <Code>approved</Code>. Una vez cobrado, un estado anterior se ignora;{" "}
        <Code>refunded</Code> y <Code>charged_back</Code> son finales, y un
        cobro por otro monto queda como <Code>approved_amount_mismatch</Code>:
        no cuenta como pagado, pero el pedido nunca vence.
      </>
    ),
  },
  {
    title: "Un redirect que se comía los webhooks",
    body: (
      <>
        El dominio sin <Code>www</Code> redirige con un 308, y Mercado Pago no
        sigue redirects: los avisos se perdían en silencio. Ahora{" "}
        <Code>SITE_URL</Code> es obligatorio, apunta al host canónico y nunca
        se toma del request.
      </>
    ),
  },
  {
    title: "Dos líneas de la misma camiseta se pisaban",
    body: (
      <>
        Cantidad y borrar usaban solo el producto. Cada línea del carrito
        pasó a identificarse por{" "}
        <Code>key|size|dorsalName|dorsalNumber</Code>.
      </>
    ),
  },
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
];

const RESULTS = [
  { value: "5.800+", label: "visitantes" },
  { value: "19.000", label: "páginas vistas" },
  { value: "97%", label: "tráfico mobile" },
];

const SHIPPED: React.ReactNode[] = [
  <>Checkout propio con transferencia bancaria o Mercado Pago</>,
  <>Hasta 12 cuotas con tarjeta vía Checkout Pro</>,
  <>Reserva de stock mientras el pedido espera el pago</>,
  <>Seña del 10% para los talles por encargo</>,
  <>Envío por Correo Argentino o moto, con entrega al día hábil siguiente</>,
  <>
    Pedidos impagos que vencen con un cron protegido por{" "}
    <Code>CRON_SECRET</Code>
  </>,
];

const NEXT_UP = [
  "Badge “Pagado por MP” en kitstock-pro",
  "Correr los tests en CI",
];

export default function VameCaseStudyPage() {
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
          clientes: desde el celular, pagando por transferencia o Mercado
          Pago.
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
          className={buttonClasses({
            variant: "secondary",
            size: "md",
            className: "group mt-10",
          })}
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
                empezó a sincronizarse por talle.
              </p>
              <p>
                Al principio la venta se cerraba por WhatsApp: el carrito
                armaba un mensaje y el pedido se confirmaba a mano. Después
                llegó un <strong>checkout propio</strong>, con transferencia
                bancaria o Mercado Pago, reserva de stock y precios calculados
                en el servidor. WhatsApp quedó para lo que hace bien: mandar el
                comprobante y resolver dudas. En total, 260 commits entre julio
                y noviembre de 2026.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="arquitectura" title="Arquitectura">
            <figure className="rounded-xl border border-border bg-bg-elevated p-5 md:p-8">
              <ArchitectureDiagram />
              <figcaption className="mt-6 border-t border-border-subtle pt-4 text-xs leading-relaxed text-fg-subtle">
                El navegador solo lee: el catálogo sale de una vista de la app
                de inventario, y los pedidos se escriben desde funciones del
                servidor con la service role.
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
                Lo que escribe pasa por <strong>funciones de Vercel</strong>:
                crear un pedido, consultar su estado, recibir el webhook de
                Mercado Pago y vencer los impagos. Cada una llama a funciones
                SQL que validan y reservan stock de forma atómica, y los
                pedidos aparecen en kitstock-pro para confirmarlos.
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

          <CaseSection id="decisiones" title="Cuatro decisiones técnicas">
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
                  599
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  tests
                </span>
              </p>
              <Prose>
                <p>
                  599 tests con <strong>Vitest</strong>, jsdom y React Testing
                  Library, repartidos en 38 archivos: componentes, reglas de
                  carrito y envío, endpoints de la API y el webhook de Mercado
                  Pago.
                </p>
                <p>
                  Las funciones SQL de los pedidos corren sobre{" "}
                  <strong>PGlite</strong>, un Postgres en memoria: reservar
                  stock, pasar unidades a encargo o registrar un pago se
                  prueban contra SQL real, no contra un mock.
                </p>
                <p>
                  Arriba de eso, <strong>Playwright</strong> recorre la tienda
                  contra el build de producción, no contra el servidor de
                  desarrollo. Por ahora se ejecuta de forma local; todavía no
                  hay CI.
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
                tiene que ser liviana y cómoda en el celular, también a la
                hora de pagar.
              </p>
            </Prose>
          </CaseSection>

          <CaseSection id="lo-que-sigue" title="Checkout online y lo que sigue">
            <Prose>
              <p>
                El checkout empezó en una rama aparte y salió a producción
                cuando estuvo listo. <strong>Hoy la tienda cobra sola</strong>:
                por transferencia, con los datos y botones para copiarlos, o
                con Mercado Pago, que devuelve al cliente al sitio con el
                resultado de su pago.
              </p>
            </Prose>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  En producción
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {SHIPPED.map((entry, i) => (
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
                  Lo que sigue
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {NEXT_UP.map((entry) => (
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
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({
                  variant: "accent",
                  size: "md",
                  surface: "elevated",
                })}
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
