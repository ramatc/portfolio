interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div className="p-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Nuevo mensaje del Portfolio</h2>
    <p className="text-lg mb-6">¡Hola Ramiro!</p>
    <p className="mb-4">
      Has recibido un nuevo mensaje a través del formulario de contacto de tu
      portfolio:
    </p>
    <div className="bg-gray-100 p-4 rounded-md mb-6">
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
