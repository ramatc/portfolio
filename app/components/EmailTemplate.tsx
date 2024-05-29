import { FormData } from "@/app/lib/definitions";

export const EmailTemplate: React.FC<Readonly<FormData>> = ({
  name,
  email,
  message,
}) => (
  <div className="rounded-lg bg-white p-8 shadow-lg">
    <h2 className="mb-4 text-2xl font-bold">Nuevo mensaje del Portfolio</h2>
    <p className="mb-6 text-lg">¡Hola Ramiro!</p>
    <p className="mb-4">
      Has recibido un nuevo mensaje a través del formulario de contacto de tu
      portfolio:
    </p>
    <div className="mb-6 rounded-md bg-gray-100 p-4">
      <p>
        <strong>Nombre:</strong> {name}
      </p>
      <p>
        <strong>Correo electrónico:</strong> {email}
      </p>
      <p>
        <strong>Mensaje:</strong> {message}
      </p>
    </div>
    <p className="text-lg text-gray-500">
      Por favor, responde a este mensaje lo antes posible.
    </p>
  </div>
);
