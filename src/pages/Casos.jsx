import CuadradoCasos from "../components/CuadradoCasos";

const Casos = () => {
  return (
    <>
      <h1>Casos Pendientes</h1>
      <CuadradoCasos titulo="Casos totales" imageSrc="folder" numeroCasos="5" />
      <CuadradoCasos titulo="Aceptados" imageSrc="checkCircle" numeroCasos="0" />
      <CuadradoCasos titulo="Rechazados" imageSrc="xCircle" numeroCasos="0" />
    </>
  );
};

export default Casos;