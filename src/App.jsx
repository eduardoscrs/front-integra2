import { Routes, Route, useLocation } from 'react-router-dom';
import { Casos, Login, IngresoFormulario } from './pages';
import NavBar from './components/NavBar';

// si necesitan agregar mas rutas, pueden hacerlo en este componente
// recuerden que deben importar las paginas que quieran utilizar
// y agregarlas como elementos de Route
// tambien pueden agregar mas rutas en el componente NavBar eso lo hacen en el componente NavBar xd

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
