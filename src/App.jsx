import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login'; // Importa el componente Login

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Ruta hacia Login */}
            {/* Aquí puedes definir otras rutas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
