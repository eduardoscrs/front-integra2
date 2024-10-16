import { useState, useEffect } from 'react';
import { actualizarContrasena } from '../services/perfilService';

const ActualizarContrasena = () => {
  const [usuarioId, setUsuarioId] = useState(null); // Definir usuarioId como estado
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Aquí puedes obtener el usuarioId desde donde lo estés almacenando (e.g., localStorage, sesión, etc.)
    const id = localStorage.getItem('usuarioId'); // Ejemplo con localStorage
    if (id) {
      setUsuarioId(id); // Almacena el ID en el estado
    }
  }, []); // El efecto se ejecuta solo al montar el componente

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      setMensaje('ID de usuario no disponible');
      return;
    }

    try {
      // Llamar al servicio de actualización de contraseña
      const result = await actualizarContrasena(
        usuarioId,
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
