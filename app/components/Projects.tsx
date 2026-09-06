import CardProject from "@/app/components/CardProject";
import Section from "@/app/components/Section";
import { Project } from "@/app/lib/definitions";

const PROJECTS: Project[] = [
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
    title: "Guess Pokémon",
    url: "https://guess-pokemon-iota.vercel.app/",
    repo: "https://github.com/ramatc/guess-pokemon",
    image: "poke.jpg",
    description:
      "Juego construido con React y TypeScript que desafía a los usuarios a adivinar el nombre de diferentes Pokémon a partir de su silueta.",
    highlights: [
      "1000+ siluetas generadas con CSS filter",
      "Validación de respuesta con tolerancia a typos",
      "Tipado estricto sobre la respuesta de la PokéAPI",
    ],
    role: "Frontend",
    stack: ["react", "typescript"],
    year: "2023",
    accent: "#ffd368",
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
