import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import logo_google from '../assets/logo_google.png';
import { Alogin } from '../services/loginService'; // Importar el servicio de login
import LoginPropTypes from '../config/LoginPropTypes'; // Importar validaciones

const Login = () => {
  // Definir los estados para email y password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleLogin = async (e) => {
    e.preventDefault();
    const usuario = {
      email: email, // Usar el valor del estado email
      password: password // Usar el valor del estado password
    };

    try {
      const response = await Alogin(usuario);
      console.log('Login exitoso:', response);
      // Manejar el token o la respuesta como sea necesario, por ejemplo, guardarlo en el localStorage
      // localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Error en el login:', error);
      setError(error.message); // Establecer el error en el estado para mostrarlo si es necesario
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
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recuérdame</label>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
            <button type="submit" className="login-btn">Login</button>
            
            {/* <Link to="/password-recovery" className="forgot-password">
              ¿Olvidaste la contraseña?
            </Link> */}
          </form>
          <p className="signup-prompt">
            ¿No tienes cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Usar las validaciones de LoginPropTypes
Login.propTypes = LoginPropTypes;

export default Login;
