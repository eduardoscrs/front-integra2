import { useState, useEffect } from 'react';
import { actualizarPerfil, obtenerUsuarioId } from '../services/perfilService';
import '../styles/ActualizarUsuario.css';
import { useNavigate } from 'react-router-dom';

const ActualizarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    direccion: '',
    comuna: '',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await obtenerUsuarioId(1); // Cambia el ID según sea necesario
        setUsuario(data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setMensaje('Error al cargar los datos del usuario.');
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos a enviar
    const datosUsuario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      celular: usuario.celular,
      correo: usuario.correo,
      direccion: usuario.direccion,
      comuna: usuario.comuna,
    };

    try {
      await actualizarPerfil(1, datosUsuario); // Cambia el ID del usuario según sea necesario
      setMensaje('Usuario actualizado correctamente.');
      navigate('/perfil-usuario');
    } catch (error) {
      setMensaje('Error al actualizar el usuario.', error);
      // console.error(mensaje);
    }
  };

  return (
    <div className="contenedor-formulario-usuario">
      <h1>Editar perfil</h1>
      <div className="contenedor-contenedor">
        <form onSubmit={handleSubmit}>
          <div className="div-campos">
            <label htmlFor="celular">Celular: </label>
            <input
              type="text"
              name="celular"
              value={usuario.celular || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-campos">
            <label htmlFor="correo">Correo: </label>
            <input
              type="text"
              name="email"
              value={usuario.correo || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-campos">
            <label htmlFor="direccion">Direccion: </label>
            <input
              type="text"
              name="direccion"
              value={usuario.direccion || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-campos">
            <label htmlFor="comuna">Comuna: </label>
            <input
              type="text"
              name="comuna"
              value={usuario.comuna || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Actualizar Usuario</button>
        </form>
      </div>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarUsuario;
