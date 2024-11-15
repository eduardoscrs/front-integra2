import PropTypes from 'prop-types';
import jsPDF from 'jspdf';

function ListaCasos({
  numeroCaso,
  estadoCaso,
  onAceptar,
  onRechazar,
  datosCaso,
}) {
  const descargarPDF = () => {
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text(`Caso ID: ${numeroCaso}`, 10, 10);
    doc.text(`Tipo de siniestro: ${datosCaso.tipo_siniestro}`, 10, 20);
    doc.text(`Descripción: ${datosCaso.descripcion}`, 10, 30);
    doc.text(`Estado: ${estadoCaso}`, 10, 40);

    // Descargar el PDF
    doc.save(`Caso_${numeroCaso}.pdf`);
  };

  return (
    <div className="lista-caso">
      <div onClick={descargarPDF}>
        {/* <span className="circulo-caso"></span> */}
        <a className="link-caso" download={'Caso'}>
          <p>Caso {numeroCaso}</p>
        </a>
      </div>
      <p className="estado-caso">{estadoCaso}</p>
      <div className="botones-caso">
        <button className="btn-acceptar" onClick={onAceptar}>
          Aceptar
        </button>
        <button className="btn-rechazar" onClick={onRechazar}>
          Rechazar
        </button>
      </div>
    </div>
  );
}

ListaCasos.propTypes = {
  numeroCaso: PropTypes.number.isRequired,
  estadoCaso: PropTypes.string.isRequired,
  onAceptar: PropTypes.func.isRequired,
  onRechazar: PropTypes.func.isRequired,
  datosCaso: PropTypes.string.isRequired,
};

export default ListaCasos;
