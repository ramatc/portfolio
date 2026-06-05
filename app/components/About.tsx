import Image from "next/image";

import Section from "@/app/components/Section";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "4+", label: "Años desarrollando" },
  { value: "150+", label: "Alumnos" },
  { value: "UTN", label: "Técnico graduado" },
  { value: "AR", label: "Buenos Aires" },
];

const About = () => {
  return (
    <Section id="sobre-mi" number="04" title="Sobre mí">
      <div className="mb-12 grid grid-cols-2 gap-6 md:mb-16 md:grid-cols-4 md:gap-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle md:text-[11px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        <div className="md:pt-1">
          <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-lg border border-border-subtle md:max-w-none">
            <Image
              src="/desktop.jpg"
              alt="Foto de Ramiro Tanquias Cornejo"
              fill
              priority
              sizes="(max-width: 768px) 260px, 260px"
              className="hidden object-cover md:block"
            />
            <Image
              src="/phone.jpg"
              alt="Foto de Ramiro Tanquias Cornejo"
              fill
              priority
              sizes="260px"
              className="object-cover md:hidden"
            />
          </div>
        </div>

        <div className="space-y-4 text-base leading-relaxed text-fg-muted md:text-lg">
          <p className="text-fg">
            Desarrollador Web y Técnico Universitario en Programación egresado
            de la Universidad Tecnológica Nacional.
          </p>
          <p>
            Vengo construyendo con tecnologías web modernas desde hace varios
            años, combinando formación académica con proyectos personales que me
            permitieron adquirir experiencia en distintos lenguajes y stacks.
          </p>
          <p>
            Trabajé como{" "}
            <span className="text-fg">tutor de React.js en Coderhouse</span>{" "}
            entre 2022 y 2024, enseñando y guiando a estudiantes en su
            aprendizaje. Hoy me desempeño como Full Stack en Consultoría Global.
          </p>
          <p>
            Si te interesa colaborar o tenés alguna{" "}
            <a
              href="#contacto"
              className="text-brand-soft underline decoration-brand/30 decoration-1 underline-offset-4 transition-colors hover:text-brand-muted hover:decoration-brand"
            >
              oportunidad laboral
            </a>{" "}
            que pueda encajar, me encantaría que conversemos.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default About;
