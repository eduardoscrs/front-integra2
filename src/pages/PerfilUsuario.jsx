import '../styles/PerfilUsuario.css';
import '../styles/DatosUsuario.css';
import DatosUsuario from '../components/DatosUsuario';
import { usuarioImg } from '../assets';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { obtenerUsuarioId } from '../services/perfilService';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState([]); // Estado para guardar los casos obtenidos de la API
  const [error, setError] = useState(null); // Estado para manejar errores
  const userId = 1; // Cambia esto por la forma en que obtienes el ID del usuario (ej. desde el auth)

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const datoUsuario = await obtenerUsuarioId(userId); // Llama a la función del servicio para obtener los casos
        setUsuario(datoUsuario); // Almacena los casos en el estado
      } catch (error) {
        setError('Error al cargar los casos');
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

  return (
    <div className="imagen-datos">
      <Sidebar></Sidebar>
      <img
        src={usuarioImg}
        alt="Imagen de perfil del usuario"
        className="imagen-usuario"
      />
      <section className="seccion-usuario">
        <h1>Usuario</h1>
        <span>Detalles de perfil</span>
        <div className="div-componentes-usuario">
          <button className="btn-editar-perfil">Editar perfil</button>
          <DatosUsuario datoBold="Rol" datoUsuario={usuario.ID_rol} />
          <DatosUsuario
            datoBold="Nombre"
            datoUsuario={`${usuario.nombre} ${usuario.apellido}`}
          />
          <DatosUsuario datoBold="Correo" datoUsuario={usuario.correo} />
          <DatosUsuario datoBold="Celular" datoUsuario={usuario.celular} />
          <DatosUsuario datoBold="Direccion" datoUsuario={usuario.direccion} />
          <DatosUsuario datoBold="Comuna" datoUsuario={usuario.comuna} />

          <button className="btn-cambiar-contraseña">Cambiar contraseña</button>
        </div>
      </section>
    </div>
  );
};

export default PerfilUsuario;
