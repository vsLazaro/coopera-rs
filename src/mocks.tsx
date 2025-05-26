import {Store} from "./services/interfaces/Store.ts"
import {Product} from "./services/interfaces/Product"
import productImage from "./assets/product-image.png";


export const lojasMock: Store[] = [
    {
        name: "Loja Tecidos Nossa Senhora",
        address: "Av. Guaíba, 2658 - Porto Alegre/RS",
        rating: "8.4",
        photo: "https://picsum.photos/1000/1000",
        category: "Roupas e Tecidos"
    },
    {
        name: "Estilo & Cia",
        address: "Rua Dom Pedro II, 1234 - Canoas/RS",
        rating: "8.1",
        photo: "https://picsum.photos/id/1011/200/300",
        category: "Roupas e Tecidos"
    },
    {
        name: "Malharia Central",
        address: "Av. Flores da Cunha, 5678 - Gravataí/RS",
        rating: "7.8",
        photo: "https://picsum.photos/id/1012/200/300",
        category: "Roupas e Tecidos"
    },
    {
        name: "Loja Tecidos Nossa Senhora",
        address: "Av. Guaíba, 2658 - Porto Alegre/RS",
        rating: "8.4",
        photo: "https://picsum.photos/1000/1000",
        category: "Roupas e Tecidos"
    },
    {
        name: "Estilo & Cia",
        address: "Rua Dom Pedro II, 1234 - Canoas/RS",
        rating: "8.1",
        photo: "https://picsum.photos/id/1011/200/300",
        category: "Roupas e Tecidos"
    },
    {
        name: "Malharia Central",
        address: "Av. Flores da Cunha, 5678 - Gravataí/RS",
        rating: "7.8",
        photo: "https://picsum.photos/id/1012/200/300",
        category: "Roupas e Tecidos"
    },
    {
        name: "Tecelagem Nova Era",
        address: "Rua dos Andradas, 4321 - Alvorada/RS",
        rating: "8.6",
        photo: "https://picsum.photos/id/1013/200/300",
        category: "Roupas e Tecidos"
    },

    // Eletrônicos
    {
        name: "Eletrônicos Total",
        address: "Av. Ipiranga, 6681 - Porto Alegre/RS",
        rating: "9.0",
        photo: "https://picsum.photos/id/1024/200/300",
        category: "Eletrônicos"
    },
    {
        name: "SmartTech",
        address: "Av. General Flores da Cunha, 1234 - Cachoeirinha/RS",
        rating: "8.7",
        photo: "https://picsum.photos/id/1040/200/300",
        category: "Eletrônicos"
    },
    {
        name: "Gadget World",
        address: "Rua dos Andradas, 1001 - Porto Alegre/RS",
        rating: "8.2",
        photo: "https://picsum.photos/id/1041/200/300",
        category: "Eletrônicos"
    },
    {
        name: "Gadget Palace",
        address: "Av. Assis Brasil, 4321 - Porto Alegre/RS",
        rating: "8.7",
        photo: "https://picsum.photos/id/1041/200/300",
        category: "Eletrônicos"
    },

    // Outlets
    {
        name: "Mega Outlet POA",
        address: "Av. Sertório, 3000 - Porto Alegre/RS",
        rating: "8.3",
        photo: "https://picsum.photos/id/1050/200/300",
        category: "Outlets"
    },
    {
        name: "Outlet da Moda",
        address: "Rua Bento Gonçalves, 2000 - Novo Hamburgo/RS",
        rating: "8.0",
        photo: "https://picsum.photos/id/1052/200/300",
        category: "Outlets"
    },
    {
        name: "Outlet Center RS",
        address: "Av. Guilherme Schell, 5000 - Canoas/RS",
        rating: "7.9",
        photo: "https://picsum.photos/id/1054/200/300",
        category: "Outlets"
    },
    {
        name: "Outlet Porto",
        address: "Rua Dom Pedro II, 1500 - Canoas/RS",
        rating: "7.9",
        photo: "https://picsum.photos/id/1054/200/300",
        category: "Outlets"
    },

    // Móveis e Decoração
    {
        name: "Casa & Estilo",
        address: "Av. Protásio Alves, 4000 - Porto Alegre/RS",
        rating: "9.1",
        photo: "https://picsum.photos/id/1060/200/300",
        category: "Móveis e Decoração"
    },
    {
        name: "Móveis Criativos",
        address: "Av. Dorival Cândido Luz de Oliveira, 3000 - Gravataí/RS",
        rating: "8.5",
        photo: "https://picsum.photos/id/1061/200/300",
        category: "Móveis e Decoração"
    },
    {
        name: "Decor Express",
        address: "Rua Tiradentes, 123 - Canoas/RS",
        rating: "8.0",
        photo: "https://picsum.photos/id/1062/200/300",
        category: "Móveis e Decoração"
    },
    {
        name: "Lar Doce Lar",
        address: "Rua Tiradentes, 456 - Canoas/RS",
        rating: "8.0",
        photo: "https://picsum.photos/id/1062/200/300",
        category: "Móveis e Decoração"
    }
];

export const productsMock: Product[] = [
    {
      name: "Tecidos de Algodão Coloridos",
      description: "Tecidos 100% algodão. Escolha o tamanho e a cor que deseja.",
      photo: productImage,
      category: ["teste"],
      subcategory: {},
      price: 12.0,
      quantity: 3,
    },
    {
      name: "Tecidos de Algodão Coloridos",
      description: "Tecidos 100% algodão. Escolha o tamanho e a cor que deseja.",
      photo: productImage,
      category: ["teste"],
      subcategory: {},
      price: 12.0,
      quantity: 3,
    },
    {
      name: "Tecidos de Algodão Coloridos",
      description: "Tecidos 100% algodão. Escolha o tamanho e a cor que deseja.",
      photo: productImage,
      category: ["teste"],
      subcategory: {},
      price: 12.0,
      quantity: 3,
    },
    {
      name: "Tecidos de Algodão Coloridos",
      description: "Tecidos 100% algodão. Escolha o tamanho e a cor que deseja.",
      photo: productImage,
      category: ["teste", ""],
      subcategory: {},
      price: 12.0,
      quantity: 3,
    },
  ];