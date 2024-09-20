import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para redirigir
import './Sidebar.css';
import logo from '../assets/logo.png'; 


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleMouseEnter = () => {
    setIsOpen(true); // Sidebar se abre
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Sidebar se cierra
  };

  return (
    <div
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="sidebar__logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Menu */}
      <ul className="sidebar__menu">
        <li><i className="icon-home"></i> Inicio</li>
        <li><i className="icon-dashboard"></i> Servicios</li>
        <li><i className="icon-products"></i> Sobre Nosotros</li>
        <li><i className="icon-analytics"></i> Contacto</li>
      </ul>

      {/* Login Section */}
      <div className="sidebar__login">
        <Link to="/login">
          <button className="login__button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
