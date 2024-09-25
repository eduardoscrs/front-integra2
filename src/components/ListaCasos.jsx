import PropTypes from 'prop-types';

function ListaCasos({ numeroCaso, estadoCaso }) {
  return (
    <div className="lista-caso">
      <p>Caso {numeroCaso}</p>
      <p>{estadoCaso}</p>
      <div className="botones-caso">
        <button className="btn-acceptar">Aceptar</button>
        <button className="btn-rechazar">Rechazar</button>
      </div>
    </div>
  );
}

ListaCasos.propTypes = {
  numeroCaso: PropTypes.string.isRequired,
  estadoCaso: PropTypes.string.isRequired,
};

export default ListaCasos;
