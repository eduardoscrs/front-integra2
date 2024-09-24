import PropTypes from 'prop-types';

function DatosUsuario({ datoBold, datoUsuario }) {
  return (
    <div className="cuadrado-usuario">
      <p>{datoBold}</p>
      <p>{datoUsuario}</p>
    </div>
  );
}

DatosUsuario.propTypes = {
  datoBold: PropTypes.string.isRequired,
  datoUsuario: PropTypes.string.isRequired,
};

export default DatosUsuario;
