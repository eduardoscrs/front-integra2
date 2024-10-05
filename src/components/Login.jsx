import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png'; 
import logo_google from '../assets/logo_google.png'; 
import LoginPropTypes from '../config/LoginPropTypes'; // Importar validaciones

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simular autenticación por rol y contraseña
    const user = {
      email,
      role: ''
    };

    // Definir credenciales simuladas
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'admin123'
    };

    const inspectorCredentials = {
      email: 'inspector@example.com',
      password: 'inspector123'
    };

    // Verificar credenciales
    if (email === adminCredentials.email && password === adminCredentials.password) {
      user.role = 'admin';
    } else if (email === inspectorCredentials.email && password === inspectorCredentials.password) {
      user.role = 'inspector';
    } else {
      alert('Credenciales incorrectas');
      return;
    }

    // Llamar a la función de login
    onLogin(user);

    // Redirigir según el rol del usuario
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'inspector') {
      navigate('/inspector');
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
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="ejemplo@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="******" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recuérdame</label>
            </div>
            <button type="submit" className="login-btn">Login</button>
            
            {/* Enlace a la página de recuperación de contraseña */}
            <Link to="/password-recovery" className="forgot-password">
              ¿Olvidaste la contraseña?
            </Link>
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
