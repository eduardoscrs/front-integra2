import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import './styles/login.css';

function App() {
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
          <Route 
            path="/login" 
            element={<Login />} 
          />
          
          {/* Puedes agregar más rutas aquí */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
