import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://ramatc.vercel.app";
const SITE_NAME = "Ramiro Tanquias";
const TITLE_DEFAULT = "Ramiro Tanquias · Desarrollador Web Fullstack";
const DESCRIPTION =
  "Desarrollador Web Fullstack. Construyo experiencias web con React, Next.js y TypeScript — foco en rendimiento, usabilidad y ejecución técnica sólida.";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s · Ramiro Tanquias",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  keywords: [
    "Ramiro Tanquias",
    "Ramiro Tanquias Cornejo",
    "desarrollador web",
    "desarrollador fullstack",
    "desarrollador react",
    "desarrollador next.js",
    "fullstack developer",
    "frontend developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "node.js developer",
    "portfolio desarrollador",
    "Buenos Aires",
    "Argentina",
    "freelance",
    "UTN",
  ],
  authors: [{ name: "Ramiro Tanquias Cornejo", url: SITE_URL }],
  creator: "Ramiro Tanquias Cornejo",
  publisher: "Ramiro Tanquias Cornejo",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-AR": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    firstName: "Ramiro",
    lastName: "Tanquias",
    username: "ramatc",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ramiro Tanquias Cornejo",
  alternateName: "Ramiro Tanquias",
  url: SITE_URL,
  image: `${SITE_URL}/desktop.jpg`,
  jobTitle: "Desarrollador Web Fullstack",
  description: DESCRIPTION,
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Nest.js",
    "Express",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Jest",
    "React Testing Library",
    "MySQL",
    "Sequelize",
    "Firebase",
    "Git",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  email: "mailto:rtanquiascornejo@gmail.com",
  sameAs: [
    "https://github.com/ramatc",
    "https://www.linkedin.com/in/ramiro-tanquias/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Consultoría Global S.A.",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Universidad Tecnológica Nacional",
    url: "https://utn.edu.ar/",
  },
  nationality: {
    "@type": "Country",
    name: "Argentina",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} — Portfolio`,
  alternateName: "Portfolio de Ramiro Tanquias",
  url: SITE_URL,
  inLanguage: "es-AR",
  description: DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Ramiro Tanquias Cornejo",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${onest.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <div className="absolute bottom-0 top-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(120,119,198,0.35),rgba(255,255,255,0))]" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
