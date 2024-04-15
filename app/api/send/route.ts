import { type NextRequest } from "next/server";
import { EmailTemplate } from "@/app/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  try {
    if (!email || !name || !message) {
      throw new Error("Falta información en la solicitud.");
    }

    const emailSubject = `👋 Nuevo mensaje de ${name}`;

    const data = await resend.emails.send({
      from: "Portfolio | Ramatc <onboarding@resend.dev>",
      to: ["rtanquiascornejo@gmail.com"],
      subject: emailSubject,
      react: EmailTemplate({ name, email, message }),
      text: message,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error });
  }
}
