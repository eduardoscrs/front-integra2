import PropTypes from 'prop-types';

function ListaCasos({ numeroCaso, estadoCaso, onAceptar }) {
  return (
    <div className="lista-caso">
      <div>
        <span className="circulo-caso"></span>
        <p>Caso {numeroCaso}</p>
      </div>
      <p className="estado-caso">{estadoCaso}</p>
      <div className="botones-caso">
        <button className="btn-acceptar" onClick={onAceptar}>
          Aceptar
        </button>
        <button className="btn-rechazar">Rechazar</button>
      </div>
    </div>
  );
}

ListaCasos.propTypes = {
  numeroCaso: PropTypes.string.isRequired,
  estadoCaso: PropTypes.string.isRequired,
  onAceptar: PropTypes.func.isRequired,
};

export default ListaCasos;
