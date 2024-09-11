import { Routes, Route, useLocation } from 'react-router-dom';
import { Casos, Login, IngresoFormulario } from './pages';
import NavBar from './components/NavBar';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ingreso-formulario" element={<IngresoFormulario />} />
        <Route path="/casos" element={<Casos />} />
      </Routes>
    </>
  );
}

export default App;
