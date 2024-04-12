import ContactIcon from "@/app/ui/icons/Contact";
import UserSearch from "@/app/ui/icons/UserSearch";
import At from "@/app/ui/icons/At";
import Message from "@/app/ui/icons/Message";

const Contact = () => {
  return (
    <section id="contacto" data-section="contacto">
      <h4>
        <ContactIcon />
        &nbsp;Contacto
      </h4>
      <form>
        <div>
          <p className="text-[18px]">
            ¡Listo para dar vida a tu proyecto! Si tienes alguna consulta o
            deseas discutir una idea, estoy disponible para ayudarte. Encuentra
            mis enlaces a redes sociales y mi correo electrónico abajo.
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
                  name="name"
                  placeholder="Nombre"
                  required
                />
                <UserSearch />
              </div>
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
                  name="email"
                  placeholder="Correo electrónico"
                  required
                />
                <At />
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-[#939ec7]"
                htmlFor="msg"
              >
                Mensaje
              </label>
              <div className="relative">
                <textarea
                  className="peer resize-none block h-36 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border pr-3 py-2 pl-10 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                  id="msg"
                  name="msg"
                  placeholder="Escribe tu mensaje..."
                  required
                />
                <Message />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
