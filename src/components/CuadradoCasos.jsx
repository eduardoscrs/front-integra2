function CuadradoCasos({ titulo, imageSrc, numeroCasos }) {
  return (
    <div className="cuadrado_casos">
      <h2>{titulo}</h2>
      <img src={`../assets/${imageSrc}.svg`} alt="Icono" />
      <p>{numeroCasos}</p>
    </div>
  );
}

export default CuadradoCasos;
