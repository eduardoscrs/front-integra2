import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Email ingresado:', email); // Registro del email ingresado

  try {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE correo = ?', [
      email,
    ]);

    console.log('Resultado de la consulta:', rows); // Registro del resultado de la consulta

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    console.log('Contraseña del usuario:', user.contrasena); // Registro de la contraseña almacenada

    const isMatch = await bcrypt.compare(password, user.contrasena); // Asegúrate de usar 'user.contrasena'

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.ID_usuario }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
