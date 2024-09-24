const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-[1030]">
      <nav className="bg-[#00000033] py-5 text-sm sm:text-base md:p-5 md:text-[18px]">
        <ul className="flex flex-wrap justify-center gap-3 font-semibold md:gap-5">
          <li>
            <a
              href="#experiencia"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              Experiencia
            </a>
          </li>
          <li>
            <a
              href="#proyectos"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              Proyectos
            </a>
          </li>
          <li>
            <a
              href="#habilidades"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              Habilidades
            </a>
          </li>
          <li>
            <a
              href="#sobre-mi"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              Sobre Mí
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              Contacto
            </a>
          </li>
          <li>
            <a
              href="CV-RAMIRO-TANQUIAS.pdf"
              target="_blank"
              className="transition-all duration-500 ease-in-out hover:text-[#b6bfda]"
            >
              CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
