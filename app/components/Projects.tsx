import CardProject from "@/app/components/CardProject";
import Section from "@/app/components/Section";
import { Project } from "@/app/lib/definitions";

const PROJECTS: Project[] = [
  {
    title: "Coda",
    url: "https://github.com/ramatc/coda/",
    repo: "https://github.com/ramatc/coda/",
    image: "coda.png",
    description:
      "Diario musical social hecho con Next.js y NestJS. Registrás lo que escuchás, calificás y reseñás álbumes, armás listas rankeables y recibís recomendaciones explicables basadas en tu gusto.",
    highlights: [
      "Catálogo unificado (MusicBrainz + Spotify) con búsqueda tolerante a typos vía Meilisearch",
      "Feed social: seguís gente, ves su actividad y reaccionás a sus reseñas",
      "Recomendaciones explicables (content-based + colaborativo) sobre un monolito modular con workers para imports de catálogo",
    ],
    role: "Fullstack",
    stack: ["nextjs", "typescript", "nestjs", "prisma", "postgresql"],
    year: "2026",
    accent: "#8b7cf6",
  },
  {
    title: "Vito",
    url: "https://vitohabit.vercel.app",
    repo: "https://github.com/ramatc/vito",
    image: "vito.jpg",
    description:
      "Habit tracker gamificado desarrollado con React y TypeScript. Tu compañero Vito crece a medida que construís hábitos, con animaciones y persistencia de progreso.",
    highlights: [
      "Sistema de hábitos con seguimiento diario y rachas",
      "Compañero virtual que evoluciona según tu progreso",
      "Animaciones fluidas con Framer Motion",
    ],
    role: "Frontend",
    stack: ["react", "typescript", "tailwind"],
    year: "2026",
    accent: "#7fc8a9",
  },
  {
    title: "Vame Futbol",
    url: "https://www.vamefutbol.com/",
    repo: "",
    image: "vame.jpg",
    description:
      "E-commerce de camisetas de fútbol retro y actuales. Catálogo con stock en vivo, checkout guiado por WhatsApp y carrito que persiste en el dispositivo.",
    highlights: [
      "Catálogo filtrable por liga, selección y talle",
      "Carrito persistente en localStorage",
      "Pedido por WhatsApp cuando el talle está agotado",
    ],
    role: "Frontend",
    stack: ["react", "typescript", "supabase"],
    year: "2026",
    accent: "#e0a83e",
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
