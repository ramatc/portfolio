import User from "@/app/ui/icons/User";

const About = () => {
  return (
    <section id="sobre-mi" data-section="sobre-mi">
      <h4>
        <User />
        &nbsp;Sobre Mí
      </h4>
      <div className="text-[18px] text-pretty">
        <p className="mb-4">
          Desarrollador web con un gran interés en aprender y desarrollar mis
          habilidades. He completado cursos y proyectos personales relacionados
          con las tecnologías web modernas que me han permitido adquirir
          experiencia en diferentes lenguajes.
        </p>
        <p>
          Estoy buscando mi primera oportunidad en el campo laboral para poner
          en práctica lo que he aprendido y continuar mi crecimiento como
          programador. Estoy dispuesto a aprender y trabajar duro para
          contribuir al éxito de un equipo de desarrollo.
        </p>
      </div>
    </section>
  );
};

export default About;
