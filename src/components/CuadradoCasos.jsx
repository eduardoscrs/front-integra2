import PropTypes from 'prop-types';

function CuadradoCasos({ titulo, imageSrc, numeroCasos }) {
  return (
    <div className="cuadrado_casos">
      <h2>{titulo}</h2>
      <img src={`${imageSrc}.svg`} alt="Icono" />
      <p>{numeroCasos}</p>
    </div>
  );
}

CuadradoCasos.propTypes = {
  titulo: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  numeroCasos: PropTypes.string.isRequired,
};

export default CuadradoCasos;
