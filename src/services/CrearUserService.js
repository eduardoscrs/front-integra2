const API_URL = import.meta.env.VITE_API_URL || 'http://190.114.253.250:3000';

export const crearUsuario = async (usuarioData) => {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el usuario.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en CrearUserService:", error);
    throw error;
  }
};
