import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import { RecuperacaoSenha } from "./pages/recuperacao_senha/RecuperacaoSenha.tsx";
import Home from './pages/Home/Home.tsx';
import AdvertiseForm from "./components/AdvertiseForm/AdvertiseForm.tsx";
import AddItem from "./components/AddItem/AddItem.tsx";
import Star from "./components/Star/StarComponent.tsx";
import Store from "./pages/Store/Store.tsx";
import { AddProducts } from "./pages/AddProducts/AddProducts.tsx";
import StoreButton from "./components/StoreButton/StoreButton.tsx";
import PriceStockForm from "./components/PriceStockForm/PriceStockForm.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mudar-senha" element={<ChangePassword />} />
      <Route path="/esqueceu-senha" element={<RecuperacaoSenha />} />
      <Route path="/home" element={<Home />} />
      <Route path="/anuncie-sua-empresa" element={<AdvertiseForm />} />
      <Route path="/loja" element={<Store />} />
      <Route path="/storebutton" element={<StoreButton />} />
      <Route
        path="/addItem"
        element={<AddItem onClick={() => console.log("Clique no botão")} />}
      />
      <Route path="/star" element={<Star rating={"8,4"} />} />
      <Route path="/add-products" element={<AddProducts />} />
      <Route path="/preco-estoque" element={<PriceStockForm />} />

    </Routes>
  </BrowserRouter>
);
