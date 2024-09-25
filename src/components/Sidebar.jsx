import { useState } from "react";
import { Outlet, Link } from "react-router-dom"; // Importa Link para redirigir
import '../styles/Sidebar.css';
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
        <li>
          <Link to="/ingreso-formulario">
            <i className="icon-dashboard"></i>Formulario
          </Link>
        </li>

        <li>
          <Link to="/casos">
            <i className="icon-products"></i> Casos
          </Link>
        </li>
        
        <li>
          <Link to="/perfil-usuario">
            <i className="icon-analytics"></i> Perfil
          </Link>
        </li>

      </ul>

      {/* Login Section */}
      <div className="sidebar__login">
        <Link to="/login">
          <button className="login__button">Login</button>
        </Link>
      </div>
      <Outlet/>
    </div>
  );
};

export default Sidebar;
