import PropTypes from 'prop-types';

function DatosUsuario({ datoBold, datoUsuario }) {
  return (
    <div>
      <p className="datos-bold">{datoBold}</p>
      <div className="cuadrado-usuario">
        <p className="datos-usuario">{datoUsuario}</p>
      </div>
    </div>
  );
}

DatosUsuario.propTypes = {
  datoBold: PropTypes.string.isRequired,
  datoUsuario: PropTypes.string.isRequired,
};

export default DatosUsuario;
