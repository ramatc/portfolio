import Image from "next/image";
import Location from "@/app/ui/icons/Location";
import LocationDesktop from "@/app/ui/icons/LocationDesktop";
import Links from "@/app/components/Links";
import Experience from "@/app/components/Experience";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import IntroPage from "@/app/components/Intro";
import Chat from "@/app/components/Chat";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[1250px] px-12 pb-4 pt-12 md:px-20 md:pt-20">
      <section className="flex justify-between pt-12 sm:mt-0">
        <div className="w-full">
          <IntroPage />
          <h1 className="py-1 text-3xl font-bold leading-none sm:text-5xl md:py-0 lg:text-7xl">
            Ramiro Tanquias
          </h1>
          <h2 className="animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text pb-1 text-xl leading-normal text-transparent sm:text-3xl lg:text-5xl">
            Desarrollador Web Fullstack
          </h2>
          <h3 className="location">
            <Location />
            <LocationDesktop />
            Buenos Aires, Argentina.
          </h3>
          <Links />
        </div>
        <div>
          <Image
            src="/avatar.png"
            width={200}
            height={200}
            className="hidden w-full sm:block md:hidden"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />

          <Image
            src="/avatar.png"
            width={300}
            height={300}
            className="hidden md:block"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />
        </div>
        <Chat />
      </section>
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
