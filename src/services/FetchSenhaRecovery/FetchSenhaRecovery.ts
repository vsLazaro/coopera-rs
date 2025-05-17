import { BACKEND_URL } from "../../config";

export const recuperarSenha = async (email: string , url : string) => {
  const response = await fetch(`${BACKEND_URL}/api/auth/linkPasswordChange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email , url}),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Erro ao enviar e-mail. Tente novamente.");
  }
  return true;
};