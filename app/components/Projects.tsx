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
      "Una aplicación web que te sumerge en el universo de Rick and Morty. Explora todos los personajes, episodios y ubicaciones. Creada desde cero con React y CSS.",
  },
  {
    title: "Guess Pokémon",
    url: "https://guess-pokemon-iota.vercel.app/",
    repo: "https://github.com/ramatc/guess-pokemon",
    image: "poke.png",
    description:
      "Un emocionante juego que desafía tus conocimientos sobre Pokémon. Pon a prueba tu habilidad para reconocer a tus personajes favoritos a través de sus siluetas. Desarrollado con React y TypeScript.",
  },
  {
    title: "Memotest",
    url: "https://memotest-inky.vercel.app/",
    repo: "https://github.com/ramatc/memotest",
    image: "memo.png",
    description:
      "Un divertido juego de memoria que te desafía a recordar las ubicaciones de las cartas. Hecho con React, TypeScript y Vite.",
  },
  // {
  //   title: "VinylWRLD",
  //   url: "https://vinyl-wrld.vercel.app/",
  //   repo: "https://github.com/ramatc/vinyl-wrld-js",
  //   image: "viny.png",
  //   description:
  //     "Un simulador de E-commerce que te permite explorar y comprar vinilos. Creado como proyecto final para el curso de JavaScript de CoderHouse, este E-commerce simula una experiencia de compra auténtica y fluida.",
  // },
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
