"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import GitHub from "@/app/ui/icons/GitHub";
import LinkedIn from "@/app/ui/icons/LinkedIn";
import Mail from "@/app/ui/icons/Mail";

const NAV_LINKS = [
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#habilidades", label: "Skills" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/ramiro-tanquias/",
    label: "LinkedIn",
    icon: <LinkedIn className="h-4 w-4" />,
  },
  {
    href: "https://github.com/ramatc",
    label: "GitHub",
    icon: <GitHub className="h-4 w-4" />,
  },
  {
    href: "mailto:rtanquiascornejo@gmail.com",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
  },
];

const EMAIL = "rtanquiascornejo@gmail.com";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API not available — fallback: just open mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="mt-20 border-t border-border-subtle">
      <div className="mx-auto max-w-container px-6 py-12 md:px-10 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 font-mono text-sm"
              aria-label="Volver al inicio"
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-brand/15 font-semibold text-brand transition-colors group-hover:bg-brand/25">
                rt
              </span>
              <span className="text-fg-muted transition-colors group-hover:text-fg">
                Ramiro Tanquias
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              Desarrollador Fullstack. Construyo interfaces rápidas y prolijas.
            </p>
          </div>

          <nav aria-label="Navegación del pie">
            <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
              Conectemos
            </h3>
            <ul className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={link.label}
                    className="grid h-9 w-9 place-items-center rounded-md border border-border bg-bg-elevated text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-border-subtle bg-bg-elevated/60 px-3 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:border-border hover:text-fg"
              aria-label={copied ? "Copiado" : `Copiar ${EMAIL}`}
            >
              <span>{EMAIL}</span>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-xs text-fg-subtle md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Ramiro Tanquias · Diseñado y
            desarrollado en Buenos Aires.
          </span>
          <span className="font-mono">v2.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
