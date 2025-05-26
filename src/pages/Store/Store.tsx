import React, { useState } from 'react';
import { Header } from '../../components/header/header';
import StoreImagesDisplay from '../../components/StoreImagesDisplay/StoreImagesDisplay';
import StoreMap from '../../components/StoreMap/StoreMap';
import SearchBar from '../../components/SearchBar/SearchBar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './Store.scss';
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import { normalizeText } from "../../components/ProductFilter/ProductFilter";
import { Product } from '../../services/interfaces/Product.ts';
import Pagination from "../../components/Pagination/Pagination";
import ChatScreen from '../../components/ChatScreen/ChatScreen.tsx';
import { lojasMock, productsMock } from '../../mocks.tsx';
import StoreProducts from '../../components/StoreProducts/StoreProducts.tsx';

type ImageType = "quadrada" | "retangular-deitada" | "retangular-em-pe";

interface Image {
  id: number;
  src: string;
  type: ImageType;
}

const createImage = (id: number, src: string, type: ImageType): Image => ({
  id,
  src,
  type,
});

//tab Visao Geral
const Store: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("visao-geral");

  const store = {
    name: 'Loja Tecidos Nossa Senhora',
    description: 'Somos uma empresa tradicional e que ao longo de seus 60 anos consolidou sua posição no setor têxtil. Com o passar do tempo ampliou sua gama de produtos e iniciou um trabalho com tecidos finos, para festas, noivas, madrinhas e tecidos para decoração. \n\nPrezamos sempre em oferecer produtos com qualidade e estar em sintonia com os últimos lançamentos do mercado e tendências da moda. Com um sistema de vendas personalizado, com vendedores extremamente experientes, buscamos sempre a satisfação plena dos nossos clientes.',
    address: 'Av. Guaíba, 2658 - Porto Alegre/RS',
    rating: 8.4,
    icon: 'https://picsum.photos/200/300',
    images: [
      createImage(1, "https://picsum.photos/200/300", "retangular-deitada"),
      createImage(2, "https://picsum.photos/200/300", "retangular-em-pe"),
      createImage(3, "https://picsum.photos/200/300", "quadrada"),
      createImage(4, "https://picsum.photos/200/300", "quadrada"),
    ],
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  //tabs menu
  const renderTabContent = () => {
    switch (activeTab) {
      case "visao-geral":
        return (
          <>
            <section className="store-images">
              <StoreImagesDisplay images={store.images} />
            </section>
            <section className="store-bottom">
              <StoreMap address={store.address} />
            </section>
          </>
        );
      case 'informacoes':
        return (
          <div className="information-tab">
            <div className="map-section">
              <StoreMap address={store.address} />
            </div>
            <div className="description-section">
              <p>{store.description}</p>
            </div>
          </div>
        );
      case 'itens':
        return (<StoreItems />);
      case 'avaliacoes':
        return <StoreProducts stores={lojasMock} products={productsMock} />;
      case 'chat':
        return (<Chat />)
      default:
        return null;
    }
  };

  return (
    <div className="store-page">
      <Header />
      <main className="store-container">
        <SearchBar />
        <nav className="store-tabs">
          <button
            className={activeTab === "visao-geral" ? "active" : ""}
            onClick={() => setActiveTab("visao-geral")}
          >
            Visão Geral
          </button>
          <button
            className={activeTab === "informacoes" ? "active" : ""}
            onClick={() => setActiveTab("informacoes")}
          >
            Informações
          </button>
          <button
            className={activeTab === "itens" ? "active" : ""}
            onClick={() => setActiveTab("itens")}
          >
            Itens
          </button>
          <button
            className={activeTab === "avaliacoes" ? "active" : ""}
            onClick={() => setActiveTab("avaliacoes")}
          >
            Avaliações
          </button>
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
        </nav>
        <section className="store-title">
          <span className="store-rating">⭐ {store.rating}</span>
          <div className="store-header">
            <div className="store-info">
              <h1>{store.name}</h1>
            </div>
            <div className="store-actions">
              {/* Botão do WhatsApp */}
              <button
                className="icon-button"
                onClick={() => console.log("Abrir WhatsApp")}
              >
                <WhatsAppIcon style={{ color: "#25D366" }} />
              </button>

              {/* Botão de Favoritar */}
              <button className="icon-button" onClick={toggleFavorite}>
                {isFavorited ? (
                  <FavoriteIcon style={{ color: "#e74c3c" }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: "#e74c3c" }} />
                )}
              </button>

              {/* Botão de Compartilhar */}
              <button
                className="icon-button"
                onClick={() => console.log("Compartilhar")}
              >
                <ShareIcon style={{ color: "#333" }} />
              </button>
            </div>
          </div>
          <p className="store-address">📌 {store.address}</p>
        </section>

        {/* Conteúdo da aba ativa */}
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Store;

//tab Itens
const StoreItems: React.FC = () => {
  interface Filters {
    name?: string;
    category?: string[];
    subcategories?: { [key: string]: string[] };
    priceRange?: [number, number];
  }

  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Quantidade de itens por página

  const products: Product[] = [
    {
      name: "Tênis Esportivo",
      description: "Tênis confortável para corrida",
      photo: "https://picsum.photos/100/100",
      category: ["esportivo"],
      subcategory: {
        color: ["red", "blue"],
        size: ["large", "medium"],
      },
      price: 150.0,
      quantity: 10,
    },
    {
      name: "Camisa Casual",
      description: "Camisa para o dia a dia",
      photo: "https://picsum.photos/100/100",
      category: ["casual", "teste"],
      subcategory: {
        color: ["white", "black"],
        size: ["small", "medium", "animal"],
      },
      price: 80.0,
      quantity: 20,
    },
  ];

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const filteredProducts = products.filter((product) => {
    if (
      filters.name &&
      !normalizeText(product.name).includes(normalizeText(filters.name))
    ) {
      return false;
    }
    if (
      filters.category &&
      !filters.category.some((cat: string) => product.category.includes(cat))
    ) {
      return false;
    }
    if (
      filters.subcategories &&
      Object.entries(filters.subcategories).some(([key, values]) => {
        return (
          !(key in product.subcategory) ||
          !values.some((value: string) =>
            product.subcategory[key as keyof typeof product.subcategory]?.includes(value)
          )
        );
      })
    ) {
      return false;
    }
    if (
      filters.priceRange &&
      (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])
    ) {
      return false;
    }
    return true;
  });

  const totalItems = filteredProducts.length;

  // Filtrar os produtos da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="store-items">
      <button
        className="open-filters-btn"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Fechar Filtros" : "Abrir Filtros"}
      </button>

      {showFilters && (
        <ProductFilter
          products={products} // Passa os produtos para o filtro
          onFilter={handleFilter}
        />
      )}

      <div className="products-list">
        {currentProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.photo} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Componente de paginação */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

//tab Chat
const Chat: React.FC = () => {
  const [storeName] = useState('Loja Tecidos Nossa Senhora');

  return (
    <div className="chat-screen-store">
      <ChatScreen storeName={storeName} />
    </div>
  );
}