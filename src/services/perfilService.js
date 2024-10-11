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
