import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Ramiro Tanquias - Desarrollador Web Fullstack y Técnico Universitario en Programación",
  description:
    "¡Bienvenido a mi portfolio! Soy un desarrollador web fullstack con experiencia en una amplia gama de tecnologías. Aquí encontrarás una muestra de mis proyectos y habilidades como técnico universitario en programación. ¡Descubre mi trabajo y no dudes en contactarme para colaborar juntos!",
  metadataBase: new URL("https://ramatc.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${onest.className} relative`}>
        <div className="absolute bottom-0 top-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(120,119,198,0.35),rgba(255,255,255,0))]"></div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
