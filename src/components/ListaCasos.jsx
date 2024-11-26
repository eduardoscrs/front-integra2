import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ListaCasos({
  numeroCaso,
  estadoCaso,
  onAceptar,
  onRechazar,
  datosCaso,
}) {
  const descargarPDF = () => {
    const doc = new jsPDF();

    // Fuentes
    // doc.addFont('helvetica', 'helvetica', 'normal');
    // Cuidado al añadir fuentes
    doc.setFont('helvetica');

    // Título
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204);
    doc.text('Informe del Caso', 105, 30, { align: 'center' });

    // Información del caso
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`ID del caso: ${numeroCaso}`, 20, 50);

    // Tabla de datos
    const tableData = [
      ['Tipo de siniestro', datosCaso.tipo_siniestro],
      ['Descripción', datosCaso.descripcion],
      ['Estado', estadoCaso],
    ];

    doc.autoTable({
      startY: 60,
      head: [['Categoria', 'Detalle']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [0, 102, 204] },
    });

    // Línea separadora
    // const finalY = doc.previousAutoTable.finalY || 150;
    // doc.setDrawColor(0, 102, 204);
    // doc.line(20, finalY + 10, 190, finalY + 10);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(128);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 20, 280);
    doc.text('Página 1 de 1', 190, 280, { align: 'right' });

    // Descargar el PDF
    doc.save(`Informe_Caso${numeroCaso}.pdf`);
  };

  return (
    <div className="lista-caso">
      <div>
        {/* <span className="circulo-caso"></span> */}
        <a className="link-caso" onClick={descargarPDF}>
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
  datosCaso: PropTypes.object.isRequired,
};

export default ListaCasos;
