import { BACKEND_URL } from "../../config";
import CryptoJS from "crypto-js";

export interface RegisterPayload {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
    try {
        // Criptografar a senha com SHA-256
        const hashedPassword = CryptoJS.SHA256(payload.password).toString();

        // Gerar o JSON final
        const requestBody = { ...payload, password: hashedPassword};

        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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