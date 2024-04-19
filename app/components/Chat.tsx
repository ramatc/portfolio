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
      messages.concat({ id: String(Date.now()), type: "user", text: question })
    );
    setQuestion("");

    const text = await sendQuestion(question);

    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text,
      })
    );

    setLoading(false);
  }

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight);
  }, [messages, isCollapsed]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {isCollapsed ? (
        <button
          className="bg-[#5b5d9a] p-2 rounded-full w-20 hover:bg-[#666baa] transition-all duration-500 ease-in-out"
          onClick={() => toggleCollapsed(false)}
        >
          <Image
            src="/bot.png"
            width={200}
            height={200}
            className="w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
            alt="Avatar de Ramiro Tanquias Cornejo"
            priority={true}
          />
        </button>
      ) : (
        <div>
          <button
            className="rounded-full bg-slate-200 w-8 h-8 absolute right-4 top-4 text-black"
            onClick={() => toggleCollapsed(true)}
          >
            ✕
          </button>
          <div className="flex flex-col gap-4 m-auto border border-neutral-500/20 p-4 rounded-xl w-[300px] md:w-[450px] bg-[#0a0a0a]">
            <div
              ref={container}
              className="flex flex-col gap-4 h-[480px] overflow-y-auto"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 max-w-[80%] rounded-3xl text-white break-words ${
                    message.type === "bot"
                      ? "bg-[#424366] text-left self-start rounded-bl-none"
                      : "bg-[#7983b8] text-right self-end rounded-br-none"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <input
                className="rounded rounded-r-none flex-1 border border-neutral-500/20 text-white py-2 px-4 bg-[#3b3b3b]"
                name="question"
                placeholder="Escribí tu pregunta..."
                type="text"
                value={question}
                required
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button
                className={`px-4 py-2 text-slate-50 bg-[#939ec7] rounded-lg rounded-l-none ${
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
