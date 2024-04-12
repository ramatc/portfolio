import LinkedIn from "@/app/ui/icons/LinkedIn";
import GitHub from "@/app/ui/icons/GitHub";
import Mail from "@/app/ui/icons/Mail";

const Footer = () => {
  return (
    <footer className="pb-10">
      <ul className="flex flex-wrap gap-[20px] justify-center [&>li]:cursor-pointer opacity-70">
        <li className="hover:text-[#939ec7] transition-all duration-500 ease-in-out">
          <a
            href="https://www.linkedin.com/in/ramiro-tanquias/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </a>
        </li>
        <li className="hover:text-[#939ec7] transition-all duration-500 ease-in-out">
          <a
            href="https://github.com/ramatc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </li>
        <li className="hover:text-[#939ec7] transition-all duration-500 ease-in-out">
          <a
            href="mailto:rtanquiascornejo@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
