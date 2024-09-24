import Briefcase from "@/app/ui/icons/Briefcase";

const Experience = () => {
  return (
    <section id="experiencia" data-section="experiencia">
      <h4>
        <Briefcase />
        &nbsp;Experiencia laboral
      </h4>
      <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="flex items-center text-lg font-semibold text-[#b1a7fc]">
            Full Stack Developer
            <span className="me-2 ms-3 rounded bg-[#413e5e] px-2.5 py-0.5 text-sm font-medium text-[#b1a7fc]">
              Actualmente
            </span>
          </h3>
          <h4 className="mb-1 flex items-center text-base font-normal text-gray-900 dark:text-white">
            Consultoría Global S.A.
          </h4>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            jul. 2024 - actualidad
          </time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Desarrollo de interfaces web dinámicas con React, TypeScript, React
            Query y Styled Components en el frontend. Nest.js en el backend.
            Implementación de tests automatizados con Jest y React Testing
            Library. Optimización de aplicaciones fullstack.
          </p>
        </li>
        <li className="ms-6">
          <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-lg font-semibold text-[#b1a7fc]">
            Tutor React Js
          </h3>
          <h4 className="mb-1 flex items-center text-base font-normal text-gray-900 dark:text-white">
            Coderhouse
          </h4>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            jun. 2022 - ene. 2024 · 1 año 8 meses
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Enseñanza de React Js. Seguimiento personalizado de alumnos,
            asesoramiento y corrección de proyectos.
          </p>
        </li>
      </ol>
    </section>
  );
};

export default Experience;
