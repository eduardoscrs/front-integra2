import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ingreso-formulario');
  };
  return (
    <div>
      <h1>Login</h1>
      <p>Welcome to the login page!</p>
      <button onClick={handleClick}> Home </button>
    </div>
  );
};

export default Login;
