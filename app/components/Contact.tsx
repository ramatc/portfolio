import Form from "@/app/components/Form";
import Section from "@/app/components/Section";

const Contact = () => {
  return (
    <Section
      id="contacto"
      number="05"
      title="Contacto"
      description="¿Tenés un proyecto en mente o una propuesta laboral? Escribime y conversemos."
    >
      <Form />
    </Section>
  );
};

export default Contact;
