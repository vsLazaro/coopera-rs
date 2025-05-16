import { BACKEND_URL } from "../../config";

export interface Loja {
  id: number;
  nome: string;
  endereco: string;
  distanciaKm: number;
  nota: number;
  filtros: string[];
  imagem: string;
}

export const fetchLojas = async (): Promise<Loja[]> => {
  const res = await fetch(`${BACKEND_URL}/api/lojas`);
  return await res.json();
};