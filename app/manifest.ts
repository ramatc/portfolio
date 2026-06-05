import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ramiro Tanquias · Portfolio",
    short_name: "Ramiro Tanquias",
    description:
      "Portfolio de Ramiro Tanquias — Desarrollador Web Fullstack. React, Next.js y TypeScript.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#09090b",
    theme_color: "#09090b",
    categories: ["portfolio", "developer", "technology"],
    lang: "es-AR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
