// src/services/casoService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Función para obtener todos los casos
export const obtenerCasos = async () => {
  try {
    const response = await fetch(`${API_URL}/api/casos`);
    if (!response.ok) {
      throw new Error('Error al obtener los casos');
    }
    return await response.json(); // Devuelve los datos de los casos
  } catch (error) {
    console.error('Error al obtener los casos:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener un caso específico por ID
export const obtenerCasoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/casos/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el caso con ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener el caso con ID ${id}:`, error);
    throw error;
  }
};

// Función para crear un nuevo caso
export const crearCaso = async (nuevoCaso) => {
  try {
    const response = await fetch(`${API_URL}/api/casos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCaso),
    });
    if (!response.ok) {
      throw new Error('Error al crear un nuevo caso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear un nuevo caso:', error);
    throw error;
  }
};

export const actualizarEstadoCaso = async (id, estado) => {
  if (estado === null || estado === undefined) {
    console.error('El campo estado es requerido');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/casos/${id}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el estado');
    }

    const result = await response.json();
    console.log('Estado actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
  }
};
