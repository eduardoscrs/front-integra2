// src/services/formularioService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearCaso = async (datosCaso) => {
  const response = await fetch(`${API_URL}/casos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCaso),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Capturar el mensaje de error del servidor
    throw new Error(`Error al crear el caso: ${errorData.message || 'Error desconocido.'}`);
  }
  return await response.json();
};
