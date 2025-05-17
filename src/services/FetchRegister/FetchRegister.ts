import { BACKEND_URL } from "../../config";

export interface RegisterPayload {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }
  
  export const registerUser = async (payload: RegisterPayload) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar.");
      }
  
      return data;
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };
  