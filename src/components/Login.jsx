import '../styles/Login.css';
import logo from '../assets/logo.png'; 
import logo_google from '../assets/logo_google.png'; 

const Login = () => {
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
          <form className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="ejemplo@gmail.com" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="******" />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recuérdame</label>
            </div>
            <button type="submit" className="login-btn">Login</button>
            <a href="#" className="forgot-password">Olvidaste la contraseña?</a>
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

