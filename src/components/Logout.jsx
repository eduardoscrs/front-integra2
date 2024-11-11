import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css';


const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Ejemplo para eliminar los datos de usuario
    navigate('/login');  // Redirige a la página de login
  };

  return (
    <div className="logout-modal">
      <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
      <p>
        Si cierras sesión, perderás el acceso a tu cuenta actual hasta que vuelvas a iniciar sesión. 
        Asegúrate de haber guardado todo tu trabajo antes de continuar.
      </p>
      <div className="logout-actions">
        <button onClick={() => navigate(-1)}>Cancelar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Logout;
