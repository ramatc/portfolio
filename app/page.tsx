import { cookies } from "next/headers";

import Hero from "@/app/components/Hero";
import Experience from "@/app/components/Experience";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Chat from "@/app/components/Chat";

export default function Home() {
  const visitor = cookies().get("visitor")?.value;

  return (
    <main className="mx-auto min-h-screen max-w-container px-6 pb-4 md:px-10 lg:px-12">
      <Hero visitor={visitor} />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Chat />
    </main>
  );
}
