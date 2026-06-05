import CardProject from "@/app/components/CardProject";
import Section from "@/app/components/Section";
import { Project } from "@/app/lib/definitions";

const PROJECTS: Project[] = [
  {
    title: "Rick and Morty Wiki",
    url: "https://rick-and-morty-wiki-kappa.vercel.app/",
    repo: "https://github.com/ramatc/rick-and-morty-wiki",
    image: "ricky.jpg",
    description:
      "Aplicación desarrollada con React y CSS utilizando la API de Rick and Morty. Permite explorar y descubrir el universo completo: personajes, episodios y ubicaciones.",
    highlights: [
      "Listado paginado con filtros por categoría",
      "Búsqueda en tiempo real sobre 800+ personajes",
      "Navegación entre personajes, episodios y ubicaciones",
    ],
    role: "Frontend",
    stack: ["react", "css", "rest-api"],
    year: "2023",
    accent: "#d3a6d4",
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
    title: "Grails",
    url: "https://grails-react-js.vercel.app/",
    repo: "https://github.com/ramatc/grails-react-js",
    image: "grails.jpg",
    description:
      "E-commerce ficticio desarrollado como proyecto final. Tienda online con carrito de compras, componentes de React y Firebase como backend en la nube.",
    highlights: [
      "Carrito persistente con Firestore",
      "Catálogo dinámico organizado por categoría",
      "Checkout con orden confirmada en backend",
    ],
    role: "Frontend",
    stack: ["react", "javascript", "firebase"],
    year: "2022",
    accent: "#b5c98a",
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
