import CardProject from "@/app/components/CardProject";
import Section from "@/app/components/Section";
import { Project } from "@/app/lib/definitions";

const PROJECTS: Project[] = [
  {
    title: "Coda",
    url: "",
    repo: "https://github.com/ramatc/coda/",
    image: "coda.png",
    kind: "personal",
    inProgress: true,
    description:
      "Diario musical social hecho con Next.js y NestJS. Registrás lo que escuchás, calificás y reseñás álbumes, armás listas rankeables y recibís recomendaciones explicables basadas en tu gusto.",
    highlights: [
      "Catálogo unificado (MusicBrainz + Spotify) con búsqueda tolerante a typos vía Meilisearch",
      "Feed social: seguís gente, ves su actividad y reaccionás a sus reseñas",
      "Recomendaciones explicables (content-based + colaborativo) sobre un monolito modular con workers para imports de catálogo",
    ],
    proves:
      "Diseñar un sistema completo —datos de terceros, búsqueda, recomendaciones y procesos en segundo plano— con una arquitectura proporcional al problema.",
    role: "Fullstack",
    stack: ["nextjs", "typescript", "nestjs", "prisma", "postgresql"],
    year: "2026",
    accent: "#8b7cf6",
  },
  {
    title: "Vame Futbol",
    url: "https://www.vamefutbol.com/",
    repo: "",
    image: "vame.png",
    kind: "client",
    description:
      "E-commerce de camisetas de fútbol retro y actuales, hecho desde cero para un cliente.",
    highlights: [
      "Catálogo con stock en vivo, filtrable por liga, selección y talle",
      "Checkout guiado por WhatsApp, también cuando el talle está agotado",
      "Carrito persistente en el dispositivo",
    ],
    metrics: [
      { value: "5.800+", label: "Visitantes el 1er mes" },
      { value: "19.000", label: "Páginas vistas" },
      { value: "97%", label: "Tráfico mobile" },
    ],
    proves:
      "Llevar un negocio real de cero a producción, adaptando el producto a cómo compran sus clientes: desde el celular y cerrando por WhatsApp.",
    role: "Fullstack",
    stack: ["react", "typescript", "supabase"],
    year: "2026",
    accent: "#e0a83e",
  },
  {
    title: "Vito",
    url: "https://vitohabit.vercel.app",
    repo: "https://github.com/ramatc/vito",
    image: "vito.jpg",
    kind: "personal",
    description:
      "Habit tracker gamificado desarrollado con React y TypeScript. Tu compañero Vito crece a medida que construís hábitos, con animaciones y persistencia de progreso.",
    highlights: [
      "Sistema de hábitos con seguimiento diario y rachas",
      "Compañero virtual que evoluciona según tu progreso",
      "Animaciones fluidas con Framer Motion",
    ],
    proves:
      "Cuidar la experiencia y el motion tanto como la lógica: un producto que se siente bien de usar todos los días.",
    role: "Frontend",
    stack: ["react", "typescript", "tailwind"],
    year: "2026",
    accent: "#7fc8a9",
  },
];

const Projects = () => {
  return (
    <Section id="proyectos" number="02" title="Proyectos">
      <div className="flex flex-col gap-6 md:gap-8">
        {PROJECTS.map((project, i) => (
          <CardProject project={project} index={i} key={project.title} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
