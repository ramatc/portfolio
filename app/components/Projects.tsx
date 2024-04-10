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
    title: "Memotest",
    url: "https://memotest-inky.vercel.app/",
    repo: "https://github.com/ramatc/memotest",
    image: "memo.jpg",
    description:
      "Un juego de memoria implementado con React y TypeScript, aprovechando la potencia de Vite. Pon a prueba tu memoria y diviértete emparejando cartas.",
    color: "title-memo",
    technologies: ["react.js", "typescript", "vite"],
  },
  // {
  //   title: "VinylWRLD",
  //   url: "https://vinyl-wrld.vercel.app/",
  //   repo: "https://github.com/ramatc/vinyl-wrld-js",
  //   image: "viny.jpg",
  //   description:
  //     "Un E-commerce que te permite explorar y comprar vinilos. Creado como proyecto final para el curso de JavaScript de CoderHouse, este E-commerce simula una experiencia de compra auténtica y fluida.",
  //   color: "title-rick",
  //   technologies: ["javascript", "css"],
  // },
];

const Projects = () => {
  return (
    <section id="proyectos" data-section="proyectos">
      <h4>
        <Desktop />
        &nbsp;Proyectos
      </h4>
      <div className="flex flex-wrap gap-[30px]">
        {PROJECTS.map((project, i) => (
          <CardProject project={project} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
