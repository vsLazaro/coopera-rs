import { BACKEND_URL } from "../../config";
import CryptoJS from "crypto-js";

export const changePassword = async (token: string, newPassword: string) => {
    // Criptografar a senha com SHA-256
    const hashedPassword = CryptoJS.SHA256(newPassword).toString();

    const response = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: hashedPassword }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao alterar senha.");
    }
    return true;
};