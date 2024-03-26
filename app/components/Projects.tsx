import Desktop from "@/app/ui/icons/Desktop";
import CardProject from "@/app/components/CardProject";
import styles from "@/app/components/projects.module.css";

const PROJECTS = [
  {
    title: "Rick and Morty Wiki",
    url: "https://rick-and-morty-wiki-kappa.vercel.app/",
    repo: "https://github.com/ramatc/rick-and-morty-wiki",
    image: "ricky.png",
    description:
      "Una aplicación web creada con React para visualizar todos los personajes, episodios y ubicaciones de Rick and Morty.",
  },
  {
    title: "Guess Pokémon",
    url: "https://guess-pokemon-iota.vercel.app/",
    repo: "https://github.com/ramatc/guess-pokemon",
    image: "poke.png",
    description:
      "Un juego realizado con React para adivinar cual es el Pokémon mediante su silueta.",
  },
  {
    title: "Memotest",
    url: "https://memotest-inky.vercel.app/",
    repo: "https://github.com/ramatc/memotest",
    image: "memo.png",
    description: "Un juego de memotest hecho con React, TypeScript y Vite.",
  },
  {
    title: "VinylWRLD",
    url: "https://vinyl-wrld.vercel.app/",
    repo: "https://github.com/ramatc/vinyl-wrld-js",
    image: "viny.png",
    description:
      "Proyecto final para el curso de JavaScript de CoderHouse. Simulación de un E-commerce con carrito.",
  },
];

const Projects = () => {
  return (
    <section id="proyectos" data-section="proyectos">
      <h4 className={styles.title}>
        <Desktop />
        &nbsp;Proyectos
      </h4>
      <div className={styles.container}>
        {PROJECTS.map((project, i) => (
          <CardProject project={project} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
