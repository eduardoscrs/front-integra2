const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const obtenerUsuarioId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el usuario con ID ${id}`);
    }
    return await response.json(); // Devuelve los datos
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const actualizarPerfil = async (id, datosUsuario) => {
  try {
    console.log(JSON.stringify(datosUsuario));
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const actualizarContrasena = async (
  id,
  contrasenaActual,
  nuevaContrasena
) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}/contrasena`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contrasenaActual: contrasenaActual,
        nuevaContrasena: nuevaContrasena,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la contraseña');
    }

    const result = await response.json();
    return result; // Puedes devolver el resultado si necesitas manejar algo más
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error; // Lanza el error para que el frontend pueda manejarlo
  }
};
