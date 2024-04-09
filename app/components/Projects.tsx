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
      "Una aplicación desarrollada con React y CSS, utilizando la API de Rick and Morty. Permite a los usuarios explorar y descubrir todo el universo de Rick and Morty, incluyendo personajes, episodios y ubicaciones.",
    color: 0,
  },
  {
    title: "Guess Pokémon",
    url: "https://guess-pokemon-iota.vercel.app/",
    repo: "https://github.com/ramatc/guess-pokemon",
    image: "poke.png",
    description:
      "Un divertido juego realizado con React y TypeScript que desafía a los usuarios a adivinar el nombre de diferentes Pokémon a partir de su silueta.",
    color: 1,
  },
  {
    title: "Memotest",
    url: "https://memotest-inky.vercel.app/",
    repo: "https://github.com/ramatc/memotest",
    image: "memo.png",
    description:
      "Un juego de memoria implementado con React y TypeScript, aprovechando la potencia de Vite. Pon a prueba tu memoria y diviértete emparejando cartas.",
    color: 2,
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
