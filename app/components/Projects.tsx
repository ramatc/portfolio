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
  // {
  //   title: "Memotest",
  //   url: "https://memotest-inky.vercel.app/",
  //   repo: "https://github.com/ramatc/memotest",
  //   image: "memo.jpg",
  //   description:
  //     "Un juego de memoria implementado con React y TypeScript, aprovechando la potencia de Vite. Pon a prueba tu memoria y diviértete emparejando cartas.",
  //   color: "title-memo",
  //   technologies: ["react.js", "typescript", "vite"],
  // },
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
      <div className="lg:flex flex-wrap gap-[30px]">
        {PROJECTS.map((project, i) => (
          <CardProject project={project} key={i} />
        ))}
      </div>
      {/* <button className="mt-6 inline-flex w-full h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
        Más proyectos
      </button> */}
    </section>
  );
};

export default Projects;
