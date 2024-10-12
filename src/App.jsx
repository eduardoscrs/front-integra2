import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import AdminPage from './components/AdminPage'; // Página simulada para el admin
import InspectorPage from './components/InspectorPage'; // Página simulada para el inspector
import ActualizarUsuario from './pages/ActualizarUsuario';
import { Casos, IngresoFormulario, PerfilUsuario } from './pages';
import './styles/login.css';

function App() {
  const handleLogin = (user) => {
    console.log('User logged in:', user);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para la página de inicio o raíz */}
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <div className="main-content">
                  {/* Aquí puedes poner contenido adicional o componentes para la página principal */}
                </div>
              </>
            }
          />

          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Rutas basadas en el rol del usuario */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/inspector" element={<InspectorPage />} />
          <Route path="/ingreso-formulario" element={<IngresoFormulario />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/perfil-usuario" element={<PerfilUsuario />} />
          {/* Puedes agregar más rutas aquí */}

          <Route path="actualizar-usuario" element={<ActualizarUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
