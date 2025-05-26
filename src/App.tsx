import { useState } from 'react';
import '@/App.scss';
import CustomButton from './components/CustomButton/CustomButton.tsx';
import { PopupMessage } from "./components/popupMessage/PopupMessage.tsx";
import CustomModal from "./components/CustomModal/CustomModal";
import { Header } from "./components/header/header";


function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const productOptions = [
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
        {
            Tamanho: ["1 x 1 metros", "1,5 x 1,5 metros", "2 x 2 metros"],
        },
    ];

    return (
      <>
        <Header />
        <CustomButton
          text="Cadastro"
          onClick={() => (window.location.href = "/cadastro")}
        />
        <CustomButton
          text="Login"
          onClick={() => (window.location.href = "/login")}
        />
        <CustomButton onClick={() => setModalOpen(true)} text="Abrir Modal" />
        <CustomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          options={productOptions}
        />
        <CustomButton text="Teste" onClick={() => setPopupOpen(true)} />
        <PopupMessage
          message={
            "Em breve você receberá um e-mail contendo um link para validar seu usuário e acessar ao sistema."
          }
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
        />

            <CustomButton
                text="Home"
                onClick={() => (window.location.href = "/home")}
            />
            <CustomButton
                text="Anuncie Sua Empresa"
                onClick={() => (window.location.href = "/anuncie-sua-empresa")}
            />
            <CustomButton
                text="Preço e estoque form"
                onClick={() => (window.location.href = "/preco-estoque")}
            />
            <CustomButton
                text="Loja"
                onClick={() => (window.location.href = "/loja")}
            />
            <CustomButton
                text="AddProducts"
                onClick={() => (window.location.href = "/add-products")}
            />
        </>
    );
}

export default App
