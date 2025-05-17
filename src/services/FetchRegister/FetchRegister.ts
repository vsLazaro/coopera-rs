import { BACKEND_URL } from "../../config";
import CryptoJS from "crypto-js";

export interface RegisterPayload {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
}

export const registerUser = async (payload: RegisterPayload) => {
    try {
        // Criptografar a senha com SHA-256
        const hashedPassword = CryptoJS.SHA256(payload.senha).toString();

        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload, senha: hashedPassword }),
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