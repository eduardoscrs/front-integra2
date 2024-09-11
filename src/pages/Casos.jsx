import '../styles/CuadradoCasos.css';
import CuadradoCasos from '../components/CuadradoCasos';

const Casos = () => {
  return (
    <>
      <h1>Casos Pendientes</h1>
      <section className="seccion-cuadrados">
        <CuadradoCasos
          titulo="Casos totales"
          imageSrc="folder"
          numeroCasos="5"
        />
        <CuadradoCasos
          titulo="Aceptados"
          imageSrc="checkCircle"
          numeroCasos="0"
        />
        <CuadradoCasos titulo="Rechazados" imageSrc="xCircle" numeroCasos="0" />
      </section>
    </>
  );
};

export default Casos;
