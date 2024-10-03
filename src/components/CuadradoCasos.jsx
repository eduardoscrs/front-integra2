import PropTypes from 'prop-types';

function CuadradoCasos({ titulo, imageSrc, numeroCasos }) {
  return (
    <div className="cuadrado-casos">
      <div className="contenido-cuadrado">
        <section className="titulo-imagen">
          <h2 className="titulos-casos">{titulo}</h2>
          <img src={imageSrc} alt="Icono" />
        </section>
        <p className="numero-casos">{numeroCasos}</p>
      </div>
    </div>
  );
}

CuadradoCasos.propTypes = {
  titulo: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  numeroCasos: PropTypes.number.isRequired,
};

export default CuadradoCasos;
