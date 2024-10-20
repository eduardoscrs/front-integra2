import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Añade Navigate para las redirecciones
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import AdminPage from './components/AdminPage';  // Página simulada para el admin
import InspectorPage from './components/InspectorPage';  // Página simulada para el inspector
import Logout from './components/Logout';
import {Casos, IngresoFormulario, PerfilUsuario } from './pages'
import './styles/login.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Comprobamos si existe un token almacenado en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Si el usuario no está logueado, redirigir al login */}
          <Route 
            path="/" 
            element={
              isLoggedIn ? <Sidebar /> : <Navigate to="/login" />
            }
          />
          
          {/* Ruta para la página de login */}
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsLoggedIn(true)} />} 
          />

          <Route path="/password-recovery" element={<PasswordRecovery />} /> {/* Nueva ruta */}

          {/* Rutas basadas en el rol del usuario */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/inspector" element={<InspectorPage />} />
          <Route path="/ingreso-formulario" element={<IngresoFormulario/>}/>
          <Route path="/casos" element={<Casos/>}/>
          <Route path="/perfil-usuario" element={<PerfilUsuario/>}/>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




