import Desktop from "@/app/ui/icons/Desktop";
import CardProject from "@/app/components/CardProject";

const PROJECTS = [
  {
    title: "Rick and Morty Wiki",
    url: "https://rick-and-morty-wiki-kappa.vercel.app/",
    repo: "https://github.com/ramatc/rick-and-morty-wiki",
    image: "ricky.jpg",
    description:
      "Una aplicación desarrollada con React y CSS, utilizando la API de Rick and Morty. Permite a los usuarios explorar y descubrir todo el universo de Rick and Morty, incluyendo personajes, episodios y ubicaciones.",
    color: "title-rick",
    technologies: ["react.js", "css", "api"],
  },
  {
    title: "Guess Pokémon",
    url: "https://guess-pokemon-iota.vercel.app/",
    repo: "https://github.com/ramatc/guess-pokemon",
    image: "poke.jpg",
    description:
      "Un divertido juego realizado con React y TypeScript que desafía a los usuarios a adivinar el nombre de diferentes Pokémon a partir de su silueta.",
    color: "title-pokemon",
    technologies: ["react.js", "typescript"],
  },
  {
    title: "Grails",
    url: "https://grails-react-js.vercel.app/",
    repo: "https://github.com/ramatc/grails-react-js",
    image: "grails.jpg",
    description:
      "Un e-commerce ficticio desarrollado como proyecto final. Se trata de una tienda online con un carrito de compras, utilizando componentes de React y Firebase como servidor en la nube.",
    color: "title-memo",
    technologies: ["react.js", "javascript", "firebase"],
  },
];

const Projects = () => {
  return (
    <section id="proyectos" data-section="proyectos">
      <h4>
        <Desktop />
        &nbsp;Proyectos
      </h4>
      <div className="flex-wrap gap-[30px] lg:flex">
        {PROJECTS.map((project, i) => (
          <CardProject project={project} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
