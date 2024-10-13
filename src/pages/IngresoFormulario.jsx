import { useState } from 'react';
import '../styles/Formulario.css';
import { crearCaso } from '../services/formularioService';
import * as XLSX from 'xlsx'; 

const IngresoFormulario = () => {
  const [formData, setFormData] = useState({
    tipo_siniestro: '',
    descripcion_siniestro: '',
    ID_Cliente: '',
    ID_inspector: '',
    ID_contratista: '',
    ID_estado: '',
  });

  const [sectorData, setSectorData] = useState({
    nombre_sector: '',
    dano_sector: '',
    porcentaje_perdida: '',
    total_costo: '',
    ID_caso: '',
  });

  const [imagenes, setImagenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeCaso = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeSector = (e) => {
    setSectorData({
      ...sectorData,
      [e.target.id]: e.target.value,
    });
  };

  const enviarDatos = async () => {
    try {
      await crearCaso(formData);
      alert('Los datos del caso se han enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar los datos del caso:', error);
      alert('Ocurrió un error al enviar los datos del caso. Por favor, intenta de nuevo.');
    }
  };

  const enviarDatosSector = async () => {
    try {
      alert('Los datos del sector se han enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar los datos del sector:', error);
      alert('Ocurrió un error al enviar los datos del sector. Por favor, intenta de nuevo.');
    }
  };

  const agregarImagenes = () => {
    document.getElementById('imagenInput').click();
  };

  const handleImagenesSeleccionadas = (e) => {
    const files = Array.from(e.target.files);
    const newImagenes = files.map((file) => URL.createObjectURL(file));
    setImagenes((prevImagenes) => [...prevImagenes, ...newImagenes]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCaso = (e) => {
    e.preventDefault();
    enviarDatos();
  };

  const handleSubmitSector = (e) => {
    e.preventDefault();
    enviarDatosSector();
  };

  // Función para exportar los datos a Excel
  const exportarExcel = () => {
    const datos = [
      {
        tipo_siniestro: formData.tipo_siniestro,
        descripcion_siniestro: formData.descripcion_siniestro,
        ID_Cliente: formData.ID_Cliente,
        ID_inspector: formData.ID_inspector,
        ID_contratista: formData.ID_contratista,
        ID_estado: formData.ID_estado,
      },
      {
        nombre_sector: sectorData.nombre_sector,
        dano_sector: sectorData.dano_sector,
        porcentaje_perdida: sectorData.porcentaje_perdida,
        total_costo: sectorData.total_costo,
        ID_caso: sectorData.ID_caso,
      },
    ];

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Datos');

    XLSX.writeFile(libro, 'datos_formulario.xlsx');
  };

  return (
    <div className="forms-wrapper">
      <div className="form-container">
        <form id="case-form" onSubmit={handleSubmitCaso} noValidate>
          <h2>Formulario de Caso</h2>

          <input
            type="text"
            id="tipo_siniestro"
            placeholder="Tipo de siniestro"
            required
            value={formData.tipo_siniestro}
            onChange={handleChangeCaso}
          />

          <input
            type="text"
            id="descripcion_siniestro"
            placeholder="Descripción del siniestro"
            required
            value={formData.descripcion_siniestro}
            onChange={handleChangeCaso}
          />

          <input
            type="number"
            id="ID_Cliente"
            placeholder="ID Cliente"
            required
            value={formData.ID_Cliente}
            onChange={handleChangeCaso}
          />

          <input
            type="number"
            id="ID_inspector"
            placeholder="ID Inspector"
            required
            value={formData.ID_inspector}
            onChange={handleChangeCaso}
          />

          <input
            type="number"
            id="ID_contratista"
            placeholder="ID Contratista"
            required
            value={formData.ID_contratista}
            onChange={handleChangeCaso}
          />

          <input
            type="number"
            id="ID_estado"
            placeholder="ID Estado"
            required
            value={formData.ID_estado}
            onChange={handleChangeCaso}
          />

          <button type="submit" className="submit-button">
            Enviar datos de Caso
          </button>
        </form>
      </div>

      <div className="form-container">
        <form id="sector-form" onSubmit={handleSubmitSector} noValidate>
          <h2>Formulario de Sector</h2>

          <input
            type="text"
            id="nombre_sector"
            placeholder="Nombre del sector"
            required
            value={sectorData.nombre_sector}
            onChange={handleChangeSector}
          />

          <input
            type="text"
            id="dano_sector"
            placeholder="Descripción del daño"
            required
            value={sectorData.dano_sector}
            onChange={handleChangeSector}
          />

          <input
            type="number"
            id="porcentaje_perdida"
            placeholder="Porcentaje de pérdida"
            required
            value={sectorData.porcentaje_perdida}
            onChange={handleChangeSector}
          />

          <input
            type="number"
            step="0.01"
            id="total_costo"
            placeholder="Costo total"
            required
            value={sectorData.total_costo}
            onChange={handleChangeSector}
          />

          <input
            type="number"
            id="ID_caso"
            placeholder="ID del caso"
            required
            value={sectorData.ID_caso}
            onChange={handleChangeSector}
          />

          <button type="submit" className="submit-button">
            Enviar datos de Sector
          </button>

          <button type="button" onClick={agregarImagenes} className="add-images-button">
            Agregar imágenes
          </button>

          <input
            id="imagenInput"
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImagenesSeleccionadas}
          />
          
          {/* Botón para descargar el Excel */}
          <button type="submit" onClick={exportarExcel} className="submit-button">
            Descargar Excel
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Imágenes seleccionadas</h2>
            <div className="images-preview">
              {imagenes.map((imagen, index) => (
                <img key={index} src={imagen} alt={`Imagen ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoFormulario;
