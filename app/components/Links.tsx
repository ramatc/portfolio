import LinkedIn from "@/app/ui/icons/LinkedIn";
import GitHub from "@/app/ui/icons/GitHub";
import Mail from "@/app/ui/icons/Mail";
import CV from "@/app/ui/icons/CV";

const LINKS = [
  {
    url: "https://www.linkedin.com/in/ramiro-tanquias/",
    title: "Visitar el perfil de Ramiro Tanquias Cornejo en LinkedIn",
    icon: <LinkedIn />,
  },
  {
    url: "https://github.com/ramatc",
    title: "Visitar el perfil de Ramiro Tanquias Cornejo en GitHub",
    icon: <GitHub />,
  },
  {
    url: "mailto:rtanquiascornejo@gmail.com",
    title:
      "Enviar un correo electrónico a Ramiro Tanquias Cornejo al correo rtanquiascornejo@gmail.com",
    icon: <Mail />,
  },
  {
    url: "CV-RAMIRO-TANQUIAS.pdf",
    title: "Descarga el CV de Ramiro Tanquias Cornejo",
    icon: <CV />,
  },
];

const Links = () => {
  return (
    <nav>
      {LINKS.map((link, i) => (
        <a
          key={i}
          href={link.url}
          title={link.title}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-xs font-medium text-gray-300"
        >
          {link.icon}
        </a>
      ))}
    </nav>
  );
};

export default Links;
