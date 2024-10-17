import { useState } from 'react';
import '../styles/Formulario.css';
import { crearCaso, crearSector } from '../services/formularioService';
import * as XLSX from 'xlsx';

const IngresoFormulario = () => {
  // Estado para los datos del formulario de caso
  const [formData, setFormData] = useState({
    tipo_siniestro: '',
    descripcion_siniestro: '',
    ID_Cliente: '',
    ID_inspector: '',
    ID_contratista: '',
    ID_estado: '',
  });

  // Estado para los datos del formulario de sector
  const [sectorData, setSectorData] = useState({
    nombre_sector: '',
    dano_sector: '',
    porcentaje_perdida: '',
    total_costo: '',
    ID_caso: '',
  });

  // Estado para las imágenes
  const [imagenes, setImagenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manejador de cambios para el formulario de caso
  const handleChangeCaso = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Manejador de cambios para el formulario de sector
  const handleChangeSector = (e) => {
    setSectorData({
      ...sectorData,
      [e.target.id]: e.target.value,
    });
  };

  const enviarDatosJuntos = async () => {
    // Validación
    for (const key in formData) {
      if (!formData[key]) {
        alert(`El campo ${key} es obligatorio.`);
        return;
      }
    }
  
    // Convertir ID_* a números
    const datosCaso = {
      ...formData,
      ID_Cliente: Number(formData.ID_Cliente),
      ID_inspector: Number(formData.ID_inspector),
      ID_contratista: Number(formData.ID_contratista),
      ID_estado: Number(formData.ID_estado),
    };
  
    try {
      console.log('Enviando datos del caso:', datosCaso);
      const responseCaso = await crearCaso(datosCaso);
      console.log('Respuesta de la API del caso:', responseCaso);
      alert('Los datos del caso se han enviado correctamente.');
  
      // Enviar datos del sector
      const responseSector = await crearSector(sectorData);
      console.log('Respuesta de la API del sector:', responseSector);
      alert('Los datos del sector se han enviado correctamente.');
  
      // Reiniciar formularios después de enviar
      setFormData({
        tipo_siniestro: '',
        descripcion_siniestro: '',
        ID_Cliente: '',
        ID_inspector: '',
        ID_contratista: '',
        ID_estado: '',
      });
  
      setSectorData({
        nombre_sector: '',
        dano_sector: '',
        porcentaje_perdida: '',
        total_costo: '',
        ID_caso: '',
      });
  
    } catch (error) {
      console.error('Error al enviar los datos:', error.message || error);
      alert(`Ocurrió un error al enviar los datos: ${error.message || 'Error desconocido.'}`);
    }
  };
  

  // Función para abrir el selector de imágenes
  const agregarImagenes = () => {
    document.getElementById('imagenInput').click();
  };

  // Manejador de cambios para las imágenes seleccionadas
  const handleImagenesSeleccionadas = (e) => {
    const files = Array.from(e.target.files);
    const newImagenes = files.map((file) => URL.createObjectURL(file));
    setImagenes((prevImagenes) => [...prevImagenes, ...newImagenes]);
    setIsModalOpen(true);
  };

  // Función para cerrar la modal de previsualización de imágenes
  const closeModal = () => {
    setIsModalOpen(false);
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
        <form id="case-form" onSubmit={(e) => { e.preventDefault(); }} noValidate>
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
        </form>
      </div>

      <div className="form-container">
        <form id="sector-form" onSubmit={(e) => { e.preventDefault(); }} noValidate>
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

          <button type="button" onClick={agregarImagenes} className="add-images-button">
            Agregar imágenes
          </button>

          <input
            id="imagenInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagenesSeleccionadas}
            style={{ display: 'none' }}
          />

          
          <button type="button"  onClick={enviarDatosJuntos} className="button">
            Enviar datos de Caso y Sector
          </button>

          <button type= "button"  onClick={exportarExcel} className="button">
            Exportar a Excel
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <button onClick={closeModal} className="close-modal">Cerrar</button>
          <div className="modal-content">
            {imagenes.map((img, index) => (
              <img key={index} src={img} alt={`Imagen ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoFormulario;
