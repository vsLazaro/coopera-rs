import axios from 'axios';
import { BACKEND_URL } from '../../config';
import CryptoJS from 'crypto-js';

export const login = async (email: string, password: string) => {
    try {
        // Criptografar a senha com SHA-256
        const hashedPassword = CryptoJS.SHA256(password).toString();

        const response = await axios.post(
            `${BACKEND_URL}/api/auth/login`,
            { email, password: hashedPassword },
            { withCredentials: true }
        );

        return response.data;

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const backendMessage = error.response.data?.error;
                if (Array.isArray(backendMessage)) {
                    throw new Error(backendMessage[0]);
                } else if (typeof backendMessage === 'string') {
                    throw new Error(backendMessage);
                }
                throw new Error("Erro ao tentar fazer login");
            } else if (error.request) {
                throw new Error("Servidor não respondeu. Verifique sua conexão.");
            } else {
                throw new Error("Erro ao configurar a requisição.");
            }
        } else {
            throw new Error("Erro inesperado ao tentar fazer login.");
        }
    }
};