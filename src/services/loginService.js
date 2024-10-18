const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const Alogin = async (usuario) => {
  try {
    // Hacer la solicitud POST al endpoint correcto
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario), // Enviar el email y password
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Usuario no encontrado');
      } else if (response.status === 401) {
        throw new Error('Contraseña incorrecta');
      } else {
        throw new Error('Error en la autenticación');
      }
    }

    // Obtener el token del cuerpo de la respuesta
    const data = await response.json();

    // Retornar el token para almacenarlo o manejarlo en el frontend
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

