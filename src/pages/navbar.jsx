import React from 'react';
import 'src/styles/styleNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCogs, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="index.html">
          <img src="Segurapp_logo.png" alt="SegurApp Logo" />
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#home">
            <FontAwesomeIcon icon={faHome} /> Inicio
          </a>
        </li>
        <li>
          <a href="#about">
            <FontAwesomeIcon icon={faInfoCircle} /> Sobre Nosotros
          </a>
        </li>
        <li>
          <a href="#services">
            <FontAwesomeIcon icon={faCogs} /> Servicios
          </a>
        </li>
        <li>
          <a href="#contact">
            <FontAwesomeIcon icon={faEnvelope} /> Contacto
          </a>
        </li>
      </ul>
      <div className="login-btn">
        <a href="#login">Iniciar Sesión</a>
      </div>
    </nav>
  );
};

export default Navbar;
