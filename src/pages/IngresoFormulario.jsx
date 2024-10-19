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

  // Estado para subsectores dinámicos
  const [subSectores, setSubSectores] = useState([]);

  // Estado para mostrar/ocultar el formulario de subsector
  const [mostrarSubsectorForm, setMostrarSubsectorForm] = useState(false);

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

  // Manejador de cambios para cada subsector dinámico
  const handleChangeSubSector = (index, e) => {
    const updatedSubSectores = [...subSectores];
    updatedSubSectores[index][e.target.id] = e.target.value;
    setSubSectores(updatedSubSectores);
  };

  // Añadir un nuevo subsector
  const agregarSubSector = () => {
    setSubSectores([
      ...subSectores,
      {
        ID_material: '',
        nombre_sub_sector: '',
        cantidad_material: '',
        tipo_reparacion: '',
        ID_sector: '',
      },
    ]);
  };

  // Mostrar/ocultar formulario de subsector
  const mostrarSubsectorFormulario = () => {
    setMostrarSubsectorForm(true);
  };

  const enviarDatosJuntos = async () => {
    try {
      // Validación de campos de formulario de caso
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

      console.log('Enviando datos del caso:', datosCaso);
      await crearCaso(datosCaso);
      alert('Los datos del caso se han enviado correctamente.');

      // Enviar datos del sector
      await crearSector(sectorData);
      alert('Los datos del sector se han enviado correctamente.');

      // Reiniciar formularios
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

      // Reiniciar subsector
      setSubSectores([]);
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
      ...subSectores,
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
            style={{ display: 'none' }}
            onChange={handleImagenesSeleccionadas}
          />

          <div className="button-container">
            <button type="button" onClick={mostrarSubsectorFormulario} className="add-images-button">
              Agregar Subsector
            </button>

            <button type="button" className="submit-button" onClick={enviarDatosJuntos} >
              Enviar datos
            </button>

            <button type="button" className="submit-button" onClick={exportarExcel}>
              Exportar a Excel
            </button>
          </div>
        </form>
      </div>

      {/* Subsectores (se muestra cuando se presiona el botón "Agregar Subsector") */}
      {mostrarSubsectorForm && (
        <div className="form-container">
          <h2>Formulario de Subsector</h2>
          {subSectores.map((subSector, index) => (
            <div key={index}>
              <input
                type="text"
                id="nombre_sub_sector"
                placeholder="Nombre del sub-sector"
                value={subSector.nombre_sub_sector}
                onChange={(e) => handleChangeSubSector(index, e)}
              />

              <input
                type="number"
                id="ID_material"
                placeholder="ID Material"
                value={subSector.ID_material}
                onChange={(e) => handleChangeSubSector(index, e)}
              />

              <input
                type="number"
                id="cantidad_material"
                placeholder="Cantidad Material"
                value={subSector.cantidad_material}
                onChange={(e) => handleChangeSubSector(index, e)}
              />

              <input
                type="text"
                id="tipo_reparacion"
                placeholder="Tipo de Reparación"
                value={subSector.tipo_reparacion}
                onChange={(e) => handleChangeSubSector(index, e)}
              />

              <input
                type="number"
                id="ID_sector"
                placeholder="ID del Sector"
                value={subSector.ID_sector}
                onChange={(e) => handleChangeSubSector(index, e)}
              />
            </div>
          ))}

          <button type="button" onClick={agregarSubSector}>
            Añadir más subsector
          </button>
        </div>
      )}

      {/* Modal para previsualización de imágenes */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {imagenes.map((imagen, index) => (
              <img key={index} src={imagen} alt={`Imagen ${index + 1}`} className="preview-image" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoFormulario;
