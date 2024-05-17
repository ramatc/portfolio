"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/lib/utils";
import UserSearch from "@/app/ui/icons/UserSearch";
import At from "@/app/ui/icons/At";
import Message from "@/app/ui/icons/Message";
import { ToastContainer, toast } from "react-toastify";
import { FormData } from "@/app/lib/definitions";

import "react-toastify/dist/ReactToastify.css";

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
    setTimeout(() => {
      reset();
      toast.success("¡Mensaje enviado!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-200 mb-5 md:text-[18px]">
        ¡Listo para dar vida a tu proyecto! Si tenés alguna consulta o deseas
        discutir una idea, estoy disponible para ayudarte. Encontrá mis enlaces
        a redes sociales y mi correo electrónico abajo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-[#939ec7]"
            htmlFor="name"
          >
            Nombre
          </label>
          <div className="relative">
            <input
              className="peer block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border pr-3 py-2 pl-10 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
              id="name"
              type="text"
              placeholder="Nombre"
              autoComplete="off"
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z\s]+$/,
              })}
            />
            <UserSearch />
          </div>
          {errors.name && (
            <span className="mt-1 text-red-300 text-xs">
              Por favor, introducí tu nombre
            </span>
          )}
        </div>

        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-[#939ec7]"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <div className="relative">
            <input
              className="peer block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border pr-3 py-2 pl-10 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              autoComplete="off"
              {...register("email", {
                required: "Por favor, introducí tu correo electrónico",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Por favor, introducí un correo electrónico válido",
                },
              })}
            />
            <At />
          </div>
          {errors.email && (
            <span className="mt-1 text-red-300 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            className="mb-3 mt-1 block text-xs font-medium text-[#939ec7]"
            htmlFor="msg"
          >
            Mensaje
          </label>
          <div className="relative">
            <textarea
              className="peer resize-none block h-36 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border pr-3 py-2 pl-10 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
              id="msg"
              placeholder="Escribí tu mensaje..."
              autoComplete="off"
              {...register("message", { required: true })}
            />
            <Message />
          </div>
          {errors.message && (
            <span className="mt-1 text-red-300 text-xs">
              Por favor, escribí un mensaje
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="w-full lg:w-48 inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Enviar mensaje
        </button>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
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
