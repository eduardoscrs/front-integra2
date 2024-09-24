import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Cerrar Sesion</Link>
        </li>
        <li>
          <Link to="/ingreso-formulario">Ingreso Formulario</Link>
        </li>
        <li>
          <Link to="/casos">Casos</Link>
        </li>
        <li>
          <Link to="/perfil-usuario">Perfil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
