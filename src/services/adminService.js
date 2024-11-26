const API_URL = import.meta.env.VITE_API_URL || 'http://190.114.253.250:3000';

// Función para obtener los materiales
export const getMaterials = async () => {
  try {
    const response = await fetch(`${API_URL}/api/materiales`);
    if (!response.ok) {
      throw new Error('Error al obtener los materiales');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Función para actualizar el precio de un material
export const updateMaterialPrice = async (id, newPrice) => {
  try {
    const response = await fetch(`${API_URL}/api/materiales/${id}`, {
      method: 'PATCH', // O 'PUT' dependiendo de tu API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ precio: newPrice }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el precio');
    }
    const updatedMaterial = await response.json();
    return updatedMaterial;
  } catch (error) {
    console.error('Error:', error);
  }
};
