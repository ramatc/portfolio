"use client";

import { ArrowUp, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Message } from "@/app/lib/definitions";
import { sendQuestion } from "@/app/lib/actions";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "0",
    type: "bot",
    text: "Hola! Soy un asistente entrenado para responder cualquier duda sobre Ramiro. Preguntame lo que quieras.",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    container.current?.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (loading || !trimmed) return;

    setLoading(true);
    setMessages((prev) =>
      prev.concat({ id: String(Date.now()), type: "user", text: trimmed }),
    );
    setQuestion("");

    try {
      const text = await sendQuestion(trimmed);
      setMessages((prev) =>
        prev.concat({
          id: String(Date.now() + 1),
          type: "bot",
          text,
        }),
      );
    } catch {
      setMessages((prev) =>
        prev.concat({
          id: String(Date.now() + 1),
          type: "bot",
          text: "Ups, algo salió mal. Probá de nuevo en un rato.",
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={panelTransition}
            style={{ transformOrigin: "bottom right" }}
            className="flex w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-md backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-brand/15 text-brand">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-fg">
                    Asistente · Ramiro
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                    Powered by Gemini
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="grid h-7 w-7 place-items-center rounded-md text-fg-subtle transition-colors hover:bg-bg-overlay hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div
              ref={container}
              className="flex h-[420px] flex-col gap-3 overflow-y-auto p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.type === "bot"
                      ? "self-start border border-border-subtle bg-bg-overlay/60 text-fg-muted"
                      : "self-end bg-brand/15 text-fg"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {loading ? (
                <div className="inline-flex max-w-[85%] items-center gap-1 self-start rounded-lg border border-border-subtle bg-bg-overlay/60 px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-subtle [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-subtle [animation-delay:200ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-subtle [animation-delay:400ms]" />
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border-subtle p-3"
            >
              <input
                type="text"
                name="question"
                placeholder="Preguntame algo…"
                autoComplete="off"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                disabled={loading}
                className="block h-9 flex-1 rounded-md border border-border-subtle bg-bg-base px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                aria-label="Enviar pregunta"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-fg text-bg-base transition-all duration-150 hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={panelTransition}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-4 py-2 text-sm font-medium text-fg-muted shadow-md backdrop-blur-xl transition-colors hover:border-border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            aria-label="Abrir chat con el asistente"
          >
            <Sparkles
              className="h-4 w-4 text-brand transition-transform duration-300 ease-smooth group-hover:rotate-12 motion-reduce:transition-none"
              aria-hidden="true"
            />
            Preguntame
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
