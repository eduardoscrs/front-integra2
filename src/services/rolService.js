const API_URL = "http://190.114.253.250:3000/api/rol";

// Función para obtener los roles desde la API
export const fetchRoles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al cargar los roles");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchRoles:", error);
    throw error;
  }
};
