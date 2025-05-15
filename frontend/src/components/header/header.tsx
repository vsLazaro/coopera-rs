import "./header.scss";
import Logo from '@/assets/logo.svg'; // Importação da imagem

export function Header() {
  return (
    <header>
      <a href="/">
        <img className="logo" src={Logo} alt="logo" />
      </a>
    </header>
  );
}