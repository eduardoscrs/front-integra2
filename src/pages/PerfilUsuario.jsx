import '../styles/PerfilUsuario.css';
import '../styles/DatosUsuario.css';
import '../styles/Sidebar.css';
// import { Outlet, Link } from "react-router-dom";
// import logo from '../assets/Segurapp_rbg.png';
import DatosUsuario from '../components/DatosUsuario';
// import { usuarioImg } from '../assets';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioId } from '../services/perfilService';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const datoUsuario = await obtenerUsuarioId(userId); // Llama a la función del servicio para obtener los casos
        setUsuario(datoUsuario); // Almacena los casos en el estado
      } catch (error) {
        setError('Error al cargar el perfil del usuario');
        console.error(error);
      }
    };

    fetchUsuario();
  }, [userId]); // Se ejecuta solo al montar el componente

  if (error) {
    return <p>Error: {error}</p>; // Muestra un mensaje de error si ocurre algún problema
  }

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  // Función para manejar la navegación al hacer clic en "Editar perfil"
  const handleEditarPerfil = () => {
    navigate('/actualizar-usuario'); // Redirige a la página de ActualizarUsuario
  };

  const handleCambiarContrasena = () => {
    navigate('/actualizar-contrasena');
  };

  return (
    <div className="contenedor-principal-perfil">
      <div className="contendor-sidebar">
        <Sidebar />
      </div>
      {/* <img
        src={usuarioImg}
        alt="Imagen de perfil del usuario"
        className="imagen-usuario"
      /> */}
      <section className="seccion-usuario">
        <h1>Usuario</h1>
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
    </div>
  );
};

export default PerfilUsuario;
