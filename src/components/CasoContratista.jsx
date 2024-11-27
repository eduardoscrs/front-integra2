import '../styles/ListaCasos.css';
import CuadradoCasos from '../components/CuadradoCasos';
import ListaCasos from '../components/ListaCasos';
import { xCircle, folder, checkCircle } from '../assets';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { obtenerCasos, actualizarEstadoCaso } from '../services/casosService';
// import { Outlet, Link } from "react-router-dom"; // Importa Link para redirigir
import '../styles/Sidebar.css';
// import logo from '../assets/Segurapp_rbg.png'; 

const Casos = () => {
  const [casos, setCasos] = useState([]); // Estado para guardar los casos obtenidos de la API
  const [error, setError] = useState(null); // Estado para manejar errores
  const [paginaActual, setPaginaActual] = useState(1);
  const casosPorPagina = 4; // Cambia este número segun el numero de casos a mostrar por pagina
  // const [isOpen, setIsOpen] = useState(true); // Hook para manejar la apertura/cierre del sidebar

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchCasos = async () => {
      try {
        const casosObtenidos = await obtenerCasos(); // Llama a la función del servicio para obtener los casos
        console.log('Casos obtenidos:', casosObtenidos);
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

  const indiceUltimoCaso = paginaActual * casosPorPagina;
  const indicePrimerCaso = indiceUltimoCaso - casosPorPagina;
  const casosEnPagina = casos.slice(indicePrimerCaso, indiceUltimoCaso);
  const totalPaginas = Math.ceil(casos.length / casosPorPagina);

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para manejar la aceptación de un caso
  const aceptarCaso = async (id) => {
    // Actualiza el estado antes de la respuesta en el front
    setCasos(
      casos.map((caso) =>
        caso.ID_caso === id
          ? { ...caso, ID_estado: 3, nombre_estado: 'Aceptado' }
          : caso
      )
    );

    try {
      await actualizarEstadoCaso(id, 3);
    } catch (error) {
      console.error('Error al aceptar el caso:', error);
    }
  };

  // Función para manejar el rechazo de un caso
  const rechazarCaso = async (id) => {
    // Actualiza el estado antes de la respuesta en el front
    setCasos(
      casos.map((caso) =>
        caso.ID_caso === id
          ? { ...caso, ID_estado: 4, nombre_estado: 'Rechazado' }
          : caso
      )
    );

    try {
      await actualizarEstadoCaso(id, 4);
    } catch (error) {
      console.error('Error al rechazar el caso:', error);
    }
  };

  return (
    <div className="contenedor-casos">
      <Sidebar />
      <div className="no-sidebar">
        <h1>Casos Pendientes de Contratista</h1>
        <section className="seccion-cuadrados">
          <CuadradoCasos
            titulo="Casos totales"
            imageSrc={folder}
            numeroCasos={casos.length} // Cambia el número de casos totales con la cantidad obtenida
          />
          <CuadradoCasos
            titulo="Aceptados"
            imageSrc={checkCircle}
            numeroCasos={casos.filter((caso) => caso.ID_estado === 3).length} // Filtra por casos aceptados
          />
          <CuadradoCasos
            titulo="Rechazados"
            imageSrc={xCircle}
            numeroCasos={casos.filter((caso) => caso.ID_estado === 4).length} // Filtra por casos rechazados
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
            {casosEnPagina.map((caso) => (
              <ListaCasos
                key={caso.ID_caso}
                numeroCaso={caso.ID_caso}
                estadoCaso={caso.nombre_estado}
                datosCaso={{
                  tipo_siniestro: caso.tipo_siniestro,
                  descripcion: caso.descripcion_siniestro,
                }}
                onAceptar={() => aceptarCaso(caso.ID_caso)}
                onRechazar={() => rechazarCaso(caso.ID_caso)}
              />
            ))}
          </section>
          {/* Botones de paginación */}
          <div className="paginacion">
            {paginaActual > 1 && (
              <button onClick={handleAnterior}>Anterior</button>
            )}
            {paginaActual < totalPaginas && (
              <button onClick={handleSiguiente}>Siguiente</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casos;
