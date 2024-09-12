import styled from 'styled-components';

function Navbar() {
  return (
    <Nav>
      <Logo>
        <a href="index.html">
          <img src="./public/img/Segurapp_logo.png" alt="SegurApp Logo" />
        </a>
      </Logo>
      <NavLinks>
        <li><a href="#home"><i className="fas fa-home"></i> Inicio</a></li>
        <li><a href="#about"><i className="fas fa-info-circle"></i> Sobre Nosotros</a></li>
        <li><a href="#services"><i className="fas fa-cogs"></i> Servicios</a></li>
        <li><a href="#contact"><i className="fas fa-envelope"></i> Contacto</a></li>
      </NavLinks>
      <LoginBtn>
        <a href="#login">Iniciar Sesión</a>
      </LoginBtn>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #434343, #000000);
  padding: 10px 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  img {
    max-width: 120px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  
  li {
    position: relative;
    margin: 2px;
    
    &::after {
      content: "";
      position: absolute;
      height: 20px;
      width: 1px;
      background-color: white;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    &:last-child::after {
      display: none;
    }
    
    a {
      color: white;
      text-decoration: none;
      font-size: 18px;
      transition: color 0.3s ease, transform 0.3s ease;
      display: flex;
      align-items: center;
      
      i {
        margin-right: 8px; /* Espacio entre el ícono y el texto */
      }
      
      &:hover {
        color: #ffa500;
        transform: scale(1.05);
      }
    }
  }
`;

const LoginBtn = styled.div`
  a {
    margin-right: 40px;
    background-color: #ffa500;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, transform 0.3s ease;
    
    &:hover {
      background-color: #ff7700;
      transform: scale(1.1);
    }
  }
`;
