import styles from "@/app/components/header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <a href="#proyectos">Proyectos</a>
          </li>
          <li>
            <a href="#habilidades">Habilidades</a>
          </li>
          <li>
            <a href="#sobre-mi">Sobre Mí</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
          <li>
            <a href="CV-RAMIRO-TANQUIAS.pdf" target="_blank">
              CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
