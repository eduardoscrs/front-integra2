const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const Alogin = async (usuario) => {
  try {
    // Realiza una petición GET para obtener todos los usuarios
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica que la petición fue exitosa
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const users = await response.json(); // Lista de usuarios

    // Buscar el usuario por correo
    const user = users.find((u) => u.correo === usuario.email);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Compara la contraseña (por simplicidad, en este ejemplo se asume que las contraseñas no están encriptadas, 
    // pero si usas bcrypt en el backend, deberías usar bcrypt.compare en el frontend).
    if (usuario.password !== user.contrasena) {
      throw new Error('Contraseña incorrecta');
    }

    // Simula un token generado (en un escenario real, el backend debería enviarlo)
    const token = 'fake-jwt-token';

    // Define el rol basado en el ID_rol
    let role = '';
    if (user.ID_rol === 1) role = 'Cliente';
    else if (user.ID_rol === 2) role = 'Inspector';
    else if (user.ID_rol === 3) role = 'Contratista';

    // Retorna el token y el rol del usuario
    return { token, role };
  } catch (error) {
    console.error('Error en el servicio de login:', error);
    throw error;
  }
};



