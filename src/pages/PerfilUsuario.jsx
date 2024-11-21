import '../styles/PerfilUsuario.css';
import '../styles/DatosUsuario.css';
import '../styles/Sidebar.css';
import { Outlet, Link } from "react-router-dom";
import logo from '../assets/Segurapp_rbg.png';
import DatosUsuario from '../components/DatosUsuario';
import { usuarioImg } from '../assets';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioId } from '../services/perfilService';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const userId = 1; // Cambia esto según corresponda

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const datoUsuario = await obtenerUsuarioId(userId);
        setUsuario(datoUsuario);
      } catch (error) {
        setError('Error al cargar el perfil del usuario');
        console.error(error);
      }
    };

    fetchUsuario();
  }, [userId]);

  const handleEditarPerfil = () => {
    navigate('/actualizar-usuario');
  };

  const handleCambiarContrasena = () => {
    navigate('/actualizar-contrasena');
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="imagen-datos">
      <div
        className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>

      <div className="sidebar__logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="sidebar__menu">
        <li>
          <Link to="/inicio">
            <i className="icon-dashboard"></i>Inicio
          </Link>
        </li>
        <li>
          <Link to="/ingreso-formulario">
            <i className="icon-dashboard"></i>Formulario
          </Link>
        </li>
        <li>
          <Link to="/casos">
            <i className="icon-products"></i>Casos
          </Link>
        </li>
        <li>
          <Link to="/perfil-usuario">
            <i className="icon-analytics"></i>Perfil
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <i className="icon-analytics"></i>Logout
          </Link>
        </li>
      </ul>

      <div className="sidebar__login">
        <Link to="/login">
          <button className="login__button">Login</button>
        </Link>
      </div>
      <Outlet />

      {error ? (
        <p>Error: {error}</p>
      ) : !usuario ? (
        <p>Cargando...</p>
      ) : (
        <>
          <img
            src={usuarioImg}
            alt="Imagen de perfil del usuario"
            className="imagen-usuario"
          />
          <section className="seccion-usuario">
            <h1>Usuario</h1>
            <span>Detalles de perfil</span>
            <div className="div-componentes-usuario">
              <button className="btn-editar-perfil" onClick={handleEditarPerfil}>
                Editar perfil
              </button>
              <DatosUsuario datoBold="Rol" datoUsuario={usuario.nombre_rol} />
              <DatosUsuario
                datoBold="Nombre"
                datoUsuario={`${usuario.nombre} ${usuario.apellido}`}
              />
              <DatosUsuario datoBold="Correo" datoUsuario={usuario.correo} />
              <DatosUsuario datoBold="Celular" datoUsuario={usuario.celular} />
              <DatosUsuario datoBold="Direccion" datoUsuario={usuario.direccion} />
              <DatosUsuario datoBold="Comuna" datoUsuario={usuario.comuna} />
              <button
                className="btn-cambiar-contraseña"
                onClick={handleCambiarContrasena}
              >
                Cambiar contraseña
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
