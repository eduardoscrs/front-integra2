import { useState, useEffect } from 'react';
import {
  actualizarContrasena,
  obtenerUsuarioId,
} from '../services/perfilService';

const ActualizarContrasena = () => {
  const [usuarioId, setUsuarioId] = useState(null); // Definir usuarioId como estado
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        // Suponiendo que ya tienes el ID en alguna variable, reemplaza "idUsuario" con el valor adecuado
        const usuario = await obtenerUsuarioId(1); // Llamas la función para obtener los datos del usuario
        setUsuarioId(usuario.ID_usuario); // Establece el ID del usuario en el estado
      } catch (error) {
        setMensaje('Error al obtener el ID del usuario');
        console.error(error);
      }
    };

    fetchUsuarioId(); // Llamar a la función para obtener el ID
  }, []); // Solo se ejecuta cuando el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      setMensaje('ID de usuario no disponible');
      return;
    }

    try {
      // Llamar al servicio de actualización de contraseña
      const result = await actualizarContrasena(
        1,
        contrasenaActual,
        nuevaContrasena
      );
      setMensaje(result.message); // Muestra el mensaje del back-end
    } catch (error) {
      setMensaje('Error al actualizar la contraseña', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contraseña Actual:</label>
          <input
            type="password"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar Contraseña</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarContrasena;
