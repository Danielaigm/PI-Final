import { Link } from "react-router-dom";
import "./Styles/Header.css";
import BotonesCuenta from "./BotonesCuenta";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="componente-header">
      <div className="componente-logo">
        <Link to="/">
          <img className="logo" src="./images/logo2.png" alt="logo" />
          <p className="eslogan">Descubre, vive y viaja</p>
        </Link>
      </div>

      <div className="componente-cuenta">
        <BotonesCuenta />
        <i
          className={`icono-hamburguesa ${isOpen ? "isActive" : ""}`}
          onClick={handleClick}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </i>
      </div>
    </div>
  );
};

export default Header;
