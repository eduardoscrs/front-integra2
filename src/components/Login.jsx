import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="ruta/al/logo.png" alt="Logo" />
      </div>
      <h2 className="login-title">Bienvenido a SegurApp</h2>
      <button className="google-login-btn">
        <img src="ruta/al/icono-google.png" alt="Google Icon" /> Login with Google
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
  );
}

export default Login;
