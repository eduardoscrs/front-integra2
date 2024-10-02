import '../styles/CuadradoCasos.css';
import '../styles/ListaCasos.css';
import CuadradoCasos from '../components/CuadradoCasos';
import ListaCasos from '../components/ListaCasos';
import { xCircle, folder, checkCircle } from '../assets';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react'; // Para manejar el estado y el efecto
import { obtenerCasos, actualizarCaso } from '../services/casosService'; // Importa el servicio para hacer la petición a la API

const Casos = () => {
  const [casos, setCasos] = useState([]); // Estado para guardar los casos obtenidos de la API
  const [error, setError] = useState(null); // Estado para manejar errores

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchCasos = async () => {
      try {
        const casosObtenidos = await obtenerCasos(); // Llama a la función del servicio para obtener los casos
        setCasos(casosObtenidos); // Almacena los casos en el estado
      } catch (error) {
        setError('Error al cargar los casos');
        console.error(error);
      }
    };

    fetchCasos();
  }, []); // Se ejecuta solo al montar el componente

  if (error) {
    return <p>{error}</p>; // Muestra un mensaje de error si ocurre algún problema
  }

  // Función para manejar la aceptación de un caso
  const aceptarCaso = async (id) => {
    try {
      await actualizarCaso(id, { estado: 'Aceptado' });
      // Actualizar el estado del caso en el frontend
      setCasos(
        casos.map((caso) =>
          caso.id === id ? { ...caso, estado: 'Aceptado' } : caso
        )
      );
    } catch (error) {
      console.error('Error al aceptar el caso:', error);
    }
  };

  return (
    <div className="contenedor-casos">
      <Sidebar />
      <div className="no-sidebar">
        <h1>Casos Pendientes</h1>
        <section className="seccion-cuadrados">
          <CuadradoCasos
            titulo="Casos totales"
            imageSrc={folder}
            numeroCasos={casos.length} // Cambia el número de casos totales con la cantidad obtenida
          />
          <CuadradoCasos
            titulo="Aceptados"
            imageSrc={checkCircle}
            numeroCasos={
              casos.filter((caso) => caso.estado === 'Aceptado').length
            } // Filtra por casos aceptados
          />
          <CuadradoCasos
            titulo="Rechazados"
            imageSrc={xCircle}
            numeroCasos={
              casos.filter((caso) => caso.estado === 'Rechazado').length
            } // Filtra por casos rechazados
          />
        </section>

        <div className="div-lista-casos">
          <h2>Lista de casos</h2>
          <section className="seccion-titulos3">
            <h3>Caso</h3>
            <h3>Estado</h3>
            <h3>Acciones</h3>
          </section>
          <section className="seccion-lista-casos">
            {casos.map((caso) => (
              <ListaCasos
                key={caso.id} // Asigna una clave única basada en el id del caso
                numeroCaso={caso.id}
                estadoCaso={caso.estado}
                onAceptar={() => aceptarCaso(caso.id)}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Casos;
