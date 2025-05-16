import { useState, useEffect } from "react";
import StoreCarousel, { Loja } from "../../components/StoreCarousel/StoreCarousel";
import { Header } from "../../components/header/header";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.scss";
import { Carousel } from '../../components/CarouselPatrocinadores/carousel';

const categorias = ["Roupas e Tecidos", "Eletrônicos", "Outlets", "Móveis e Decoração"];

const lojasMock: Loja[] = [
  {
    id: 1,
    nome: "Loja Tecidos Nossa Senhora",
    endereco: "Porto Alegre, Brasil",
    distanciaKm: 7,
    nota: 8.4,
    filtros: ["Roupas e Tecidos", "Moda", "Casual", "Feminino"],
    imagem: "https://picsum.photos/1000/1000",
  },
  {
    id: 2,
    nome: "Estilo & Cia",
    endereco: "Canoas, Brasil",
    distanciaKm: 5,
    nota: 8.1,
    filtros: ["Roupas e Tecidos"],
    imagem: "https://picsum.photos/id/1011/200/300",
  },
  {
    id: 3,
    nome: "Malharia Central",
    endereco: "Gravataí, Brasil",
    distanciaKm: 12,
    nota: 7.8,
    filtros: ["Roupas e Tecidos", "Feminino"],
    imagem: "https://picsum.photos/id/1012/200/300",
  },
  {
    id: 4,
    nome: "Tecelagem Nova Era",
    endereco: "Alvorada, Brasil",
    distanciaKm: 9,
    nota: 8.6,
    filtros: ["Roupas e Tecidos"],
    imagem: "https://picsum.photos/id/1013/200/300",
  },

  // Eletrônicos
  {
    id: 5,
    nome: "Eletrônicos Total",
    endereco: "Porto Alegre, Brasil",
    distanciaKm: 6,
    nota: 9.0,
    filtros: ["Eletrônicos"],
    imagem: "https://picsum.photos/id/1024/200/300",
  },
  {
    id: 6,
    nome: "SmartTech",
    endereco: "Cachoeirinha, Brasil",
    distanciaKm: 8,
    nota: 8.7,
    filtros: ["Eletrônicos"],
    imagem: "https://picsum.photos/id/1040/200/300",
  },
  {
    id: 7,
    nome: "Gadget World",
    endereco: "Porto Alegre, Brasil",
    distanciaKm: 3,
    nota: 8.2,
    filtros: ["Eletrônicos"],
    imagem: "https://picsum.photos/id/1041/200/300",
  },

  // Outlets
  {
    id: 8,
    nome: "Mega Outlet POA",
    endereco: "Porto Alegre, Brasil",
    distanciaKm: 11,
    nota: 8.3,
    filtros: ["Outlets"],
    imagem: "https://picsum.photos/id/1050/200/300",
  },
  {
    id: 9,
    nome: "Outlet da Moda",
    endereco: "Novo Hamburgo, Brasil",
    distanciaKm: 17,
    nota: 8.0,
    filtros: ["Outlets"],
    imagem: "https://picsum.photos/id/1052/200/300",
  },
  {
    id: 10,
    nome: "Outlet Center RS",
    endereco: "Canoas, Brasil",
    distanciaKm: 14,
    nota: 7.9,
    filtros: ["Outlets"],
    imagem: "https://picsum.photos/id/1054/200/300",
  },

  // Móveis e Decoração
  {
    id: 11,
    nome: "Casa & Estilo",
    endereco: "Porto Alegre, Brasil",
    distanciaKm: 6,
    nota: 9.1,
    filtros: ["Móveis e Decoração"],
    imagem: "https://picsum.photos/id/1060/200/300",
  },
  {
    id: 12,
    nome: "Móveis Criativos",
    endereco: "Gravataí, Brasil",
    distanciaKm: 10,
    nota: 8.5,
    filtros: ["Móveis e Decoração"],
    imagem: "https://picsum.photos/id/1061/200/300",
  },
  {
    id: 13,
    nome: "Decor Express",
    endereco: "Canoas, Brasil",
    distanciaKm: 7,
    nota: 8.0,
    filtros: ["Móveis e Decoração"],
    imagem: "https://picsum.photos/id/1062/200/300",
  }
];

const patrocinadores = [
  {
    image: 'https://i.scdn.co/image/ab6775700000ee859f67648c277f519d6598f3dc',
    link: 'https://portal.pucrs.br/ensino-e-pesquisa/',
    date: '2025-05-05',
  },
  {
    image: 'https://picsum.photos/200/300',
    link: 'https://example.com/2',
    date: '2025-05-04',
  },
  {
    image: 'https://picsum.photos/200/300',
    link: 'https://example.com/3',
    date: '2025-05-03',
  },
  {
    image: 'https://picsum.photos/300/300',
    link: 'https://example.com/4',
    date: '2025-05-02',
  },
];

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Roupas e Tecidos');
  const [termoPesquisa, setTermoPesquisa] = useState('');

  useEffect(() => {
    // Captura o parâmetro "search" da URL
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search') || '';
    setTermoPesquisa(searchQuery);
  }, []);

  const handleSearch = (query: string) => {
    setTermoPesquisa(query);
  };

  const lojasFiltradas = lojasMock.filter((loja) => {
    const matchCategoria = loja.filtros.includes(categoriaSelecionada);
    const matchPesquisa =
      termoPesquisa === '' ||
      loja.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      loja.endereco.toLowerCase().includes(termoPesquisa.toLowerCase());

    return matchCategoria && matchPesquisa;
  });

  return (
    <>
      <Header />
      <main className="home-container">
        <section className="hero">
          <h1>Encontre sua próxima conexão</h1>
          <p>Descubra novas empresas na sua região</p>
          <SearchBar onSearch={handleSearch} />
        </section>

        <div className="categorias">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`categoria-btn ${cat === categoriaSelecionada ? 'ativa' : ''}`}
              onClick={() => setCategoriaSelecionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <StoreCarousel lojas={lojasFiltradas} />
        <div className="patrocinadores-container">
          <h1>Nossos Patrocinadores</h1>
          <Carousel items={patrocinadores} />
        </div>
      </main>
    </>
  );
}