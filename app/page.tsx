import Image from "next/image";
import Location from "@/app/ui/icons/Location";
import LocationDesktop from "@/app/ui/icons/LocationDesktop";
import Links from "@/app/components/Links";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import IntroPage from "@/app/components/Intro";
import Chat from "@/app/components/Chat";

export default function Home() {
  return (
    <main className="px-12 pt-12 pb-4 min-h-screen max-w-[1250px] mx-auto md:px-20 md:pt-20">
      <section className="flex justify-between pt-12 sm:mt-0">
        <div className="w-full">
          <IntroPage />
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-none py-1 md:py-0">
            Ramiro Tanquias
          </h1>
          <h2 className="text-xl sm:text-3xl lg:text-5xl leading-normal animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent pb-1">
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
            className="hidden sm:block md:hidden w-full"
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
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
