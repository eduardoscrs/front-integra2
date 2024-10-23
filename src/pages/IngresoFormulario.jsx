import { useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Formulario.css';


const IngresoFormulario = () => {
  // State for main form data
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    comuna: '',
    dia: '',
    mes: '',
    año: '',
    ID_caso: 30
  });

  // State for sectors
  const [sectores, setSectores] = useState([
    {
      ID_caso: formData.ID_caso,
      tipo_siniestro: '',
      descripcion_siniestro: '',
      ID_Cliente: '',
      ID_inspector: '',
      ID_contratista: '',
      ID_estado: '',
      nombre_estado: 'Aceptado',
      nombre_sector: '',
      dano_sector: '',
      porcentaje_perdida: '',
      total_costo: '',
    }
  ]);

  // State for images and modal control
  const [imagenes, setImagenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle changes in the main form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Handle changes in the sectors
  const manejarCambioSector = (index, e) => {
    const updatedSectores = sectores.map((sector, i) =>
      i === index ? { ...sector, [e.target.id]: e.target.value } : sector
    );
    setSectores(updatedSectores);
  };

  // Add a new sector
  const agregarSector = () => {
    const nuevoSector = {
      ID_sector: Math.random(),
      nombre_sector: '',
      dano_sector: '',
      porcentaje_perdida: '',
      total_costo: '',
      ID_caso: formData.ID_caso
    };
    setSectores([...sectores, nuevoSector]);
  };

  // Delete an existing sector
  const eliminarSector = (index) => {
    if (sectores.length > 1) {
      const updatedSectores = sectores.filter((_, i) => i !== index);
      setSectores(updatedSectores);
    }
  };

  // Trigger file input for image selection
  const agregarImagenes = () => {
    document.getElementById('imagenInput').click();
  };

  // Handle selected images
  const handleImagenesSeleccionadas = (e) => {
    const files = Array.from(e.target.files);
    const newImagenes = files.map((file) => URL.createObjectURL(file));
    setImagenes((prevImagenes) => [...prevImagenes, ...newImagenes]);
    setIsModalOpen(true);
  };

  // Export data to Excel
  const exportarAExcel = () => {
    const dataToExport = [
      {
        "Nombre": formData.nombre,
        "RUT": formData.rut,
        "Dirección": formData.direccion,
        "Comuna": formData.comuna,
        "Día": formData.dia,
        "Mes": formData.mes,
        "Año": formData.año
      },
      { "Nombre del sector": "Sectores:" }
    ];

    // Add main sector data
    dataToExport.push({
      "ID Caso": sectores[0].ID_caso,
      "Tipo de siniestro": sectores[0].tipo_siniestro,
      "Descripción del siniestro": sectores[0].descripcion_siniestro,
      "ID Cliente": sectores[0].ID_Cliente,
      "ID Inspector": sectores[0].ID_inspector,
      "ID Contratista": sectores[0].ID_contratista,
      "ID Estado": sectores[0].ID_estado,
      "Nombre Estado": sectores[0].nombre_estado
    });

    // Add additional sectors
    sectores.slice(1).forEach((sector, index) => {
      dataToExport.push({
        "Sector": Sector ${index + 2},
        "Nombre del sector": sector.nombre_sector,
        "Área dañada": sector.dano_sector,
        "Porcentaje de pérdida": sector.porcentaje_perdida,
        "Total costo": sector.total_costo,
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Formulario');
    XLSX.writeFile(workbook, 'datos_formulario.xlsx');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    exportarAExcel();
  };

  return (
    <div className="forms-wrapper">
      <div className="form-container">
        <form id="project-form" onSubmit={handleSubmit} noValidate>
          <h2>Formulario de caso</h2>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            id="rut"
            placeholder="RUT"
            required
            value={formData.rut}
            onChange={handleChange}
          />
          <input
            type="text"
            id="direccion"
            placeholder="Dirección"
            required
            value={formData.direccion}
            onChange={handleChange}
          />
          <input
            type="text"
            id="comuna"
            placeholder="Comuna"
            required
            value={formData.comuna}
            onChange={handleChange}
          />
          <div className="date-container">
            <input
              type="number"
              id="dia"
              placeholder="Día"
              min="1"
              max="31"
              required
              value={formData.dia}
              onChange={handleChange}
            />
            <select id="mes" required value={formData.mes} onChange={handleChange}>
              <option value="" disabled>Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <input
              type="number"
              id="año"
              placeholder="Año"
              min="1910"
              max="2024"
              required
              value={formData.año}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="form-container">
        <div className="sector-section">
          <div className="sector-header">
            <h3>Sector 1: Datos del Caso</h3>
          </div>

          <input
            type="text"
            id="tipo_siniestro"
            placeholder="Tipo de siniestro"
            required
            value={sectores[0].tipo_siniestro}
            onChange={(e) => manejarCambioSector(0, e)}
          />
          <input
            type="text"
            id="descripcion_siniestro"
            placeholder="Descripción del siniestro"
            required
            value={sectores[0].descripcion_siniestro}
            onChange={(e) => manejarCambioSector(0, e)}
          />
          <input
            type="number"
            id="ID_Cliente"
            placeholder="ID Cliente"
            required
            value={sectores[0].ID_Cliente}
            onChange={(e) => manejarCambioSector(0, e)}
          />
          <input
            type="number"
            id="ID_inspector"
            placeholder="ID Inspector"
            required
            value={sectores[0].ID_inspector}
            onChange={(e) => manejarCambioSector(0, e)}
          />
          <input
            type="number"
            id="ID_contratista"
            placeholder="ID Contratista"
            required
            value={sectores[0].ID_contratista}
            onChange={(e) => manejarCambioSector(0, e)}
          />
          <input
            type="number"
            id="ID_estado"
            placeholder="ID Estado"
            required
            value={sectores[0].ID_estado}
            onChange={(e) => manejarCambioSector(0, e)}
          />
        </div>

        {sectores.slice(1).map((sector, index) => (
          <div key={index} className="sector-section">
            <div className="sector-header">
              <h3>Sector {index + 2}</h3>
              <button type="button" className="delete-sector-button" onClick={() => eliminarSector(index + 1)}>
                Eliminar sector
              </button>
            </div>
            <input
              type="text"
              id={nombre_sector_${index + 1}}
              placeholder="Nombre del sector"
              required
              value={sector.nombre_sector}
              onChange={(e) => manejarCambioSector(index + 1, e)}
            />
            <input
              type="text"
              id={dano_sector_${index + 1}}
              placeholder="Área dañada"
              required
              value={sector.dano_sector}
              onChange={(e) => manejarCambioSector(index + 1, e)}
            />
            <input
              type="number"
              id={porcentaje_perdida_${index + 1}}
              placeholder="Porcentaje de pérdida"
              required
              value={sector.porcentaje_perdida}
              onChange={(e) => manejarCambioSector(index + 1, e)}
            />
            <input
              type="number"
              id={total_costo_${index + 1}}
              placeholder="Total costo"
              required
              value={sector.total_costo}
              onChange={(e) => manejarCambioSector(index + 1, e)}
            />
          </div>
        ))}

        <button type="button" className="add-sector-button" onClick={agregarSector}>
          Agregar sector
        </button>

        <input
          type="file"
          id="imagenInput"
          multiple
          accept="image/*"
          onChange={handleImagenesSeleccionadas}
          style={{ display: 'none' }}
        />
        <button type="button" className="add-image-button" onClick={agregarImagenes}>
          Agregar imágenes
        </button>

        <button type="submit" className="submit-button">
          Generar informe
        </button>

        {/* Modal for image preview */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              {imagenes.map((imagen, index) => (
                <img key={index} src={imagen} alt={Preview ${index + 1}} className="preview-image" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresoFormulario;