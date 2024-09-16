
const Login = () => {
  return (
    <div className="login-container">
      <h2>Bienvenido a SegurApp</h2>
      <button>Login with Google</button>
      <form>
        <div>
          <label>Email</label>
          <input type="email" placeholder="ejemplo@gmail.com" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="******" />
        </div>
        <div>
          <input type="checkbox" /> Recuérdame
        </div>
        <button type="submit">Login</button>
        <a href="#">Olvidaste la contraseña?</a>
      </form>
      <p>¿No tienes cuenta? <a href="#">Regístrate</a></p>
    </div>
  );
}

export default Login;
