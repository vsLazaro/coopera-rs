import "./headerCompleto.scss";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import cartIcon from "../../assets/cartIcon.svg";
import userIcon from "../../assets/userIcon.svg";

export function HeaderCompleto() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>

            <header>
                <a href="/">
                    <img className="logo" src={logo} alt="logo" />
                </a>

                <div className="icons">
                    <a href="/">
                        <p>Anuncie sua empresa</p>
                    </a>
                    <a href="/">
                        <img src={notificationIcon} alt="notificationIcon" />
                    </a>

                    <a href="/">
                        <img src={cartIcon} alt="cartIcon" />
                    </a>

                    <div className="userIcon" onClick={() => setOpen(!open)}>
                        <img src={userIcon} alt="userIcon" />
                    </div>
                </div>
            </header>

            {open && <div className="overlay" onClick={() => setOpen(false)} />}


            <div
                className={`profileSlider ${open ? (isMobile ? "open-mobile" : "open-desktop") : ""
                    }`}
            >
                {isMobile && (
                    <button className="closeButton" onClick={() => setOpen(false)}>
                        ×
                    </button>
                )}

                {[
                    "Nome do Usuário",
                    "Torne-se um anunciante",
                    "Favoritos",
                    "Pagamento",
                    "Ajuda",
                    "Meus dados",
                    "Segurança",
                    "Sair",
                ].map((text, i) => (
                    <div className="profileOption" key={i}>
                        <img src="./src/assets/userIcon.svg" alt="icon" />
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
