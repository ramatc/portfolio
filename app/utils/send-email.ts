import { FormData } from "@/app/components/Form";

export function sendEmail(data: FormData) {
  const apiEndpoint = "@/app/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {})
    .catch((err) => {
      alert(err);
    });
}
