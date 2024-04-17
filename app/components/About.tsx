import Image from "next/image";
import User from "@/app/ui/icons/User";

const About = () => {
  return (
    <section id="sobre-mi" data-section="sobre-mi">
      <h4>
        <User />
        &nbsp;Sobre Mí
      </h4>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="mb-5 flex xl:self-center lg:mb-0">
          <Image
            src="/phone.jpg"
            width={250}
            height={250}
            alt="Foto de Ramiro Tanquias Cornejo"
            priority={true}
            className="block lg:hidden rounded-lg w-full"
          />

          <Image
            src="/desktop.jpg"
            width={300}
            height={300}
            alt="Foto de Ramiro Tanquias Cornejo"
            priority={true}
            className="hidden lg:block rounded-lg object-cover aspect-square"
          />
        </div>
        <div className="w-full text-pretty [&>p>span]:text-[#b2a8fd] md:text-[18px] lg:w-[62%] xl:w-[67%]">
          <p className="mb-4">
            <span>Desarrollador Web</span> y{" "}
            <span>Técnico Universitario en Programación</span> de la Universidad
            Tecnológica Nacional, con un gran interés en <span>aprender</span> y{" "}
            <span>desarrollar</span> mis habilidades. He completado cursos y
            proyectos personales relacionados con las tecnologías web modernas
            que me han permitido adquirir <span>experiencia</span> en diferentes
            lenguajes.
          </p>
          <p className="mb-4">
            Además de mi formación académica, tengo experiencia como{" "}
            <span>tutor de React Js</span>, donde he tenido la oportunidad de{" "}
            <span>enseñar</span> y <span>guiar</span> a otros estudiantes en su
            aprendizaje.
          </p>
          <p>
            Estoy entusiasmado por la oportunidad de seguir{" "}
            <span>creciendo</span> en el campo del desarrollo web y contribuir
            al <span>éxito</span> de proyectos desafiantes. Si estás interesado
            en colaborar o tenés alguna <span>oportunidad laboral</span> que
            creas que pueda ser adecuada para mí, ¡me encantaría que nos
            pongamos en contacto!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
