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
