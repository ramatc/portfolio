"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "habilidades", label: "Skills" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
] as const;

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-bg-base/60 backdrop-blur-xl supports-[backdrop-filter]:bg-bg-base/40">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-14 max-w-container items-center justify-between px-6 md:h-16 md:px-10"
        >
          <a
            href="#top"
            aria-label="Volver al inicio"
            onClick={closeMenu}
            className="group flex items-center gap-2 font-mono text-sm transition"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brand/15 font-semibold text-brand transition-colors group-hover:bg-brand/25">
              rt
            </span>
            <span className="hidden text-fg-muted transition-colors group-hover:text-fg sm:inline">
              /ramiro
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    className={`relative inline-flex h-8 items-center rounded-md px-3 text-sm transition-colors ${
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-md bg-bg-elevated"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/CV-RAMIRO-TANQUIAS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-3 text-xs font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              CV
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid h-8 w-8 place-items-center rounded-md border border-border bg-bg-elevated text-fg-muted transition-colors hover:border-border-strong hover:text-fg md:hidden"
            >
              {isOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
            className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="mx-auto flex h-full max-w-container flex-col justify-between px-6 pb-12 pt-24">
              <nav aria-label="Secciones">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = active === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={
                          reduceMotion
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 16 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.4,
                                delay: 0.08 + i * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                              }
                        }
                        className="border-b border-border-subtle"
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={closeMenu}
                          className={`group flex items-center gap-4 py-5 transition-colors ${
                            isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                          }`}
                        >
                          <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                            0{i + 1}
                          </span>
                          <span className="flex-1 text-2xl font-semibold tracking-tight">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 text-fg-subtle transition-all duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.4,
                        delay: 0.08 + NAV_ITEMS.length * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-subtle"
              >
                <a
                  href="https://github.com/ramatc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="transition-colors hover:text-fg"
                >
                  GitHub
                </a>
                <span
                  className="h-1 w-1 rounded-full bg-border"
                  aria-hidden="true"
                />
                <a
                  href="https://www.linkedin.com/in/ramiro-tanquias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="transition-colors hover:text-fg"
                >
                  LinkedIn
                </a>
                <span
                  className="h-1 w-1 rounded-full bg-border"
                  aria-hidden="true"
                />
                <a
                  href="mailto:rtanquiascornejo@gmail.com"
                  onClick={closeMenu}
                  className="transition-colors hover:text-fg"
                >
                  Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
