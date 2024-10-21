const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


export const crearCaso = async (nuevoCaso) => {
  try {
    const response = await fetch(`${API_URL}/api/casos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCaso), 
    });

    // Manejo de respuesta
    if (!response.ok) {
      throw new Error('Error al crear un nuevo caso');
    }
    return await response.json(); 
  } catch (error) {
    console.error('Error al crear un nuevo caso:', error);
    throw error;
  }
};


export const crearSector = async (nuevoSector) => {
  try {
    const response = await fetch(`${API_URL}/api/sectores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoSector), 
    });

    
    if (!response.ok) {
      throw new Error('Error al crear un nuevo sector');
    }
    return await response.json(); 
  } catch (error) {
    console.error('Error al crear un nuevo sector:', error);
    throw error; 
  }
};
