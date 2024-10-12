import { useState, useEffect } from 'react';
import { actualizarPerfil, obtenerUsuarioId } from '../services/perfilService';

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
      // ID_rol: usuario.ID_rol, // Si necesitas incluir el ID_rol
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          // value={usuario.nombre}
          onChange={handleChange}
          placeholder={usuario.nombre}
          required
        />
        <input
          type="text"
          name="apellido"
          value={usuario.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          type="text"
          name="celular"
          value={usuario.celular}
          onChange={handleChange}
          placeholder="Celular"
          required
        />
        <input
          type="text"
          name="correo"
          value={usuario.correo}
          onChange={handleChange}
          placeholder="Correo"
          required
        />
        <input
          type="text"
          name="direccion"
          value={usuario.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
        <input
          type="text"
          name="comuna"
          value={usuario.comuna}
          onChange={handleChange}
          placeholder="Comuna"
          required
        />
        <button type="submit">Actualizar Usuario</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarUsuario;
