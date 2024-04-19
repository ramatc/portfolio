import { FormData } from "@/app/lib/definitions";

export async function sendEmail(data: FormData) {
  try {
    const apiEndpoint = "/api/send";
    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo electrónico.");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}
