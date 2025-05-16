import { BACKEND_URL } from "../../config";

export const changePassword = async (token: string, newPassword: string) => {
    const response = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao alterar senha.");
    }
    return true;
};