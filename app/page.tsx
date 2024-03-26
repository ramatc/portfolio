import styles from "@/app/page.module.css";
import Image from "next/image";
import Location from "@/app/ui/icons/Location";
import Links from "@/app/components/Links";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import About from "@/app/components/About";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.principal}>
        <div>
          <span
            className={`${styles.border_white} inline-flex items-center justify-center rounded-full border border-gray-800 bg-gray-950 px-3 py-1 text-2xl font-medium text-gray-300 backdrop-blur-3xl`}
          >
            <span className="bg-gradient-to-t from-[#fff] to-[#8678f9] bg-clip-text text-transparent">
              Hola! Soy
            </span>
          </span>
          <h1 className={styles.name}>Ramiro Tanquias</h1>
          <h2
            className={`${styles.title} animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent`}
          >
            Desarrollador Web Fullstack
          </h2>
          <h3 className={styles.location}>
            <Location />
            Buenos Aires, Argentina.
          </h3>
          <Links />
        </div>
        <div>
          <Image
            src="/avatar.png"
            width={300}
            height={300}
            className="hidden md:block"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />

          <Image
            src="/avatar.png"
            width={150}
            height={150}
            className="block md:hidden"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />
        </div>
      </section>
      <Projects />
      <Skills />
      <About />
    </main>
  );
}
