import '../styles/CuadradoCasos.css';
import '../styles/ListaCasos.css';
import CuadradoCasos from '../components/CuadradoCasos';
import ListaCasos from '../components/ListaCasos';
import { xCircle, folder, checkCircle } from '../assets';

const Casos = () => {
  return (
    <div className="contenedor-casos">
      <h1>Casos Pendientes</h1>
      <section className="seccion-cuadrados">
        <CuadradoCasos
          titulo="Casos totales"
          imageSrc={folder}
          numeroCasos="5"
        />
        <CuadradoCasos
          titulo="Aceptados"
          imageSrc={checkCircle}
          numeroCasos="0"
        />
        <CuadradoCasos titulo="Rechazados" imageSrc={xCircle} numeroCasos="0" />
      </section>

      <div className="div-lista-casos">
        <h2>Lista de casos</h2>
        <section className="seccion-titulos3">
          <h3>Caso</h3>
          <h3>Estado</h3>
          <h3>Acciones</h3>
        </section>
        <section className="seccion-lista-casos">
          <ListaCasos numeroCaso="1" estadoCaso="Pendiente" />
          <ListaCasos numeroCaso="2" estadoCaso="Pendiente" />
          <ListaCasos numeroCaso="3" estadoCaso="Pendiente" />
          <ListaCasos numeroCaso="4" estadoCaso="Pendiente" />
          <ListaCasos numeroCaso="5" estadoCaso="Pendiente" />
        </section>
      </div>
    </div>
  );
};

export default Casos;
