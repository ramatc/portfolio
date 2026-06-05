"use client";

import { ArrowUpRight, AtSign, MessageSquare, User } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { FormData } from "@/app/lib/definitions";
import { sendEmail } from "@/app/lib/utils";

import "react-toastify/dist/ReactToastify.css";

const inputClass =
  "peer block h-11 w-full rounded-md border border-border bg-bg-elevated pl-10 pr-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/30";

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle transition-colors peer-focus:text-brand-soft";

const labelClass = "mb-2 block font-mono text-xs uppercase tracking-wider text-fg-subtle";

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      await sendEmail(data);
      reset();
      toast.success("¡Mensaje enviado! Te respondo pronto.", {
        position: "bottom-right",
        autoClose: 3500,
        theme: "dark",
      });
    } catch {
      toast.error("Algo salió mal. Probá de nuevo o escribime por mail.", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "dark",
      });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Nombre
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Cómo te llamás"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass}
              {...register("name", {
                required: true,
                pattern: /^[A-Za-zÀ-ÿ\s]+$/,
              })}
            />
            <User className={iconClass} aria-hidden="true" />
          </div>
          {errors.name ? (
            <span id="name-error" className="mt-1.5 block text-xs text-danger">
              Por favor introducí tu nombre.
            </span>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Correo electrónico
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="vos@ejemplo.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass}
              {...register("email", {
                required: "Por favor introducí tu correo electrónico.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Introducí un correo electrónico válido.",
                },
              })}
            />
            <AtSign className={iconClass} aria-hidden="true" />
          </div>
          {errors.email ? (
            <span id="email-error" className="mt-1.5 block text-xs text-danger">
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="msg">
            Mensaje
          </label>
          <div className="relative">
            <textarea
              id="msg"
              rows={6}
              autoComplete="off"
              placeholder="Contame en qué estás pensando…"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "msg-error" : undefined}
              className="peer block w-full resize-none rounded-md border border-border bg-bg-elevated px-3 py-3 pl-10 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/30"
              {...register("message", { required: true })}
            />
            <MessageSquare
              className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-fg-subtle transition-colors peer-focus:text-brand-soft"
              aria-hidden="true"
            />
          </div>
          {errors.message ? (
            <span id="msg-error" className="mt-1.5 block text-xs text-danger">
              Por favor escribí un mensaje.
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between">
        <span className="text-xs text-fg-subtle">
          O escribime a{" "}
          <a
            href="mailto:rtanquiascornejo@gmail.com"
            className="text-fg-muted underline decoration-border-strong decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-brand"
          >
            rtanquiascornejo@gmail.com
          </a>
        </span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-11 items-center gap-2 rounded-md bg-fg px-5 text-sm font-medium text-bg-base shadow-xs transition-all duration-200 ease-smooth hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        >
          {isSubmitting ? "Enviando…" : "Enviar mensaje"}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );
};

export default Form;
