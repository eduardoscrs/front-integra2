import { useState, useEffect } from 'react';
import { actualizarPerfil, obtenerUsuarioId } from '../services/perfilService';
import '../styles/ActualizarUsuario.css';

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
    } catch (error) {
      setMensaje('Error al actualizar el usuario.', error);
      // console.error(mensaje);
    }
  };

  return (
    <div className="contenedor-formulario-usuario">
      <form onSubmit={handleSubmit}>
        <div className="div-campos">
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="div-campos">
          <label htmlFor="apellido">Apellido: </label>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido || ''}
            onChange={handleChange}
            required
          />
        </div>
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
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarUsuario;
