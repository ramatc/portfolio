"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/app/lib/definitions";
import { sendQuestion } from "@/app/lib/actions";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      type: "bot",
      text: "¡Hola, soy el asistente virtual de Ramiro! Estoy acá para resolver tus dudas.",
    },
  ]);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCollapsed, toggleCollapsed] = useState<boolean>(true);
  const container = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessages((messages) =>
      messages.concat({ id: String(Date.now()), type: "user", text: question }),
    );
    setQuestion("");

    const text = await sendQuestion(question);

    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text,
      }),
    );

    setLoading(false);
  }

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight);
  }, [messages, isCollapsed]);

  return (
    <div className="fade-in fixed bottom-5 right-5 z-[9999]">
      {isCollapsed ? (
        <button
          className="w-20 rounded-full bg-[#5b5d9a] p-2 transition-all duration-500 ease-in-out hover:bg-[#666baa]"
          onClick={() => toggleCollapsed(false)}
        >
          <Image
            src="/bot.png"
            width={200}
            height={200}
            className="h-full w-full transform transition-transform duration-500 ease-in-out hover:scale-110"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />
        </button>
      ) : (
        <div>
          <button
            className="absolute right-4 top-4 h-8 w-8 rounded-full bg-slate-200 text-black"
            onClick={() => toggleCollapsed(true)}
          >
            ✕
          </button>
          <div className="m-auto flex w-[300px] flex-col gap-4 rounded-xl border border-neutral-500/20 bg-[#0a0a0a] p-4 md:w-[450px]">
            <div
              ref={container}
              className="flex h-[480px] flex-col gap-4 overflow-y-auto"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[80%] break-words rounded-3xl p-4 text-white ${
                    message.type === "bot"
                      ? "self-start rounded-bl-none bg-[#424366] text-left"
                      : "self-end rounded-br-none bg-[#7983b8] text-right"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <input
                className="flex-1 rounded rounded-r-none border border-neutral-500/20 bg-[#3b3b3b] px-4 py-2 text-white"
                name="question"
                placeholder="Escribí tu pregunta..."
                type="text"
                value={question}
                required
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button
                className={`rounded-lg rounded-l-none bg-[#939ec7] px-4 py-2 text-slate-50 ${
                  loading ? "bg-slate-300" : "bg-[#939ec7]"
                }`}
                disabled={loading || !question.trim()}
                type="submit"
                style={{
                  cursor:
                    loading || !question.trim() ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Loading..." : "↩"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
