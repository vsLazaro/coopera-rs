
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
  const res = await fetch('http://localhost:3000/lojas');
  return await res.json();
};