import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import logo_google from '../assets/logo_google.png';
import { Alogin } from '../services/loginService'; // Importar el servicio de login
import LoginPropTypes from '../config/LoginPropTypes'; // Importar validaciones

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleLogin = async (e) => {
    e.preventDefault();
    const usuario = { email, password }; // Crear el objeto usuario
  
    try {
      const response = await Alogin(usuario); // Llamar al servicio de login
      console.log('Login exitoso:', response);
  
      const { token, role } = response; // Obtener el token y el rol del backend
  
      // Guardar el token y el rol en el localStorage o sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      // Manejar la lógica de redirección basada en el rol
      if (role === 'Cliente') {
        // Redirigir a la página del cliente
      } else if (role === 'Inspector') {
        // Redirigir a la página del inspector
      } else if (role === 'Contratista') {
        // Redirigir a la página del contratista
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError(error.message); // Establecer el error en el estado
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-image">
          <img src={logo} alt="App logo" />
        </div>
        <div className="login-container">
          <h2 className="login-title">Bienvenido a SegurApp</h2>
          <button className="google-login-btn">
            <img src={logo_google} alt="Google Icon" /> Login with Google
          </button>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-groups">
              <label>Email</label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-groups">
              <label>Password</label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-prompt">
            ¿No tienes cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = LoginPropTypes;
