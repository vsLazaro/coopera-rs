import "./headerCompleto.scss";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import cartIcon from "../../assets/cartIcon.svg";
import userIcon from "../../assets/userIcon.svg";
import configurationIcon from "../../assets/configurationIcon.svg";
import favoriteIcon from "../../assets/favoriteIcon.svg";
import couponIcon from "../../assets/couponIcon.svg";
import exitIcon from "../../assets/exitIcon.svg";
import paymentIcon from "../../assets/paymentIcon.svg";
import supplierIcon from "../../assets/supplierIcon.svg";
import messageIcon from "../../assets/messageIcon.svg";

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

  interface ProfileOption {
    text: string;
    icon: string;
  }

  const topOptions: ProfileOption[] = [
    { text: "Minha Conta", icon: userIcon },
    { text: "Pagamentos", icon: paymentIcon },
    { text: "Notificações", icon: notificationIcon },
    { text: "Cupons", icon: couponIcon },
    { text: "Favoritos", icon: favoriteIcon },
    { text: "Conversas", icon: messageIcon },
    { text: "Torne-se um Fornecedor", icon: supplierIcon },
  ];  

  const bottomOptions: ProfileOption[] = [
    { text: "Configurações", icon: configurationIcon },
    { text: "Sair", icon: exitIcon },
  ];

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

      {/* Overlay com blur e função de fechar */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <div className={`profileSlider ${open ? (isMobile ? "open-mobile" : "open-desktop") : ""}`}>
        {isMobile && (
          <button className="closeButton" onClick={() => setOpen(false)}>
            ×
          </button>
        )}

        <div className="profileTop">
          {topOptions.map((option, i) => {
            const isSupplier = option.text === "Torne-se um Fornecedor";
            return (
              <div className={`profileOption ${isSupplier ? "supplier" : ""}`} key={i}>
                <a href="/">
                  <img src={option.icon} alt={`${option.text} icon`} />
                  <p>{option.text}</p>
                </a>
              </div>
            );
          })}
        </div>

        <div className="profileBottom">
          {bottomOptions.map((option, i) => {
            const isExit = option.text === "Sair";
            return (
              <div className={`profileOption ${isExit ? "exit" : ""}`} key={i}>
                <a href="/">
                  <img src={option.icon} alt={`${option.text} icon`} />
                  <p>{option.text}</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}