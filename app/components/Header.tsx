const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-[1030]">
      <nav className="py-5 md:p-5 text-sm sm:text-base md:text-[18px] bg-[#00000033]">
        <ul className="flex flex-wrap gap-3 md:gap-5 justify-center font-semibold">
          <li>
            <a
              href="#proyectos"
              className="hover:text-[#b6bfda] transition-all duration-500 ease-in-out"
            >
              Proyectos
            </a>
          </li>
          <li>
            <a
              href="#habilidades"
              className="hover:text-[#b6bfda] transition-all duration-500 ease-in-out"
            >
              Habilidades
            </a>
          </li>
          <li>
            <a
              href="#sobre-mi"
              className="hover:text-[#b6bfda] transition-all duration-500 ease-in-out"
            >
              Sobre Mí
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className="hover:text-[#b6bfda] transition-all duration-500 ease-in-out"
            >
              Contacto
            </a>
          </li>
          <li>
            <a
              href="CV-RAMIRO-TANQUIAS.pdf"
              target="_blank"
              className="hover:text-[#b6bfda] transition-all duration-500 ease-in-out"
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
