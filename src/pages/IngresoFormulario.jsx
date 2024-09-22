import { useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Formulario.css';  

const IngresoFormulario = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    comuna: '',
    dia: '',
    mes: '',
    año: ''
  });

  const [sectores, setSectores] = useState([
    { nombreSector: '', largo: '', ancho: '', areaDañada: '', subcategoria: '', añadirSubcategoria: '', enviarDatos: '' }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSectorChange = (index, e) => {
    const updatedSectores = sectores.map((sector, i) =>
      i === index ? { ...sector, [e.target.name]: e.target.value } : sector
    );
    setSectores(updatedSectores);
  };

  const agregarSector = () => {
    setSectores([...sectores, { nombreSector: '', largo: '', ancho: '', areaDañada: '', subcategoria: '', añadirSubcategoria: '', enviarDatos: '' }]);
  };

  const eliminarSector = (index) => {
    const updatedSectores = sectores.filter((_, i) => i !== index);
    setSectores(updatedSectores);
  };

  // Separar la lógica de exportar Excel
  const exportarAExcel = () => {
    const dataToExport = [{ ...formData }];

    sectores.forEach(sector => {
      dataToExport.push({
        nombreSector: sector.nombreSector,
        largo: sector.largo,
        ancho: sector.ancho,
        areaDañada: sector.areaDañada,
        subcategoria: sector.subcategoria,
        añadirSubcategoria: sector.añadirSubcategoria,
        enviarDatos: sector.enviarDatos
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'datos_formulario.xlsx');
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    exportarAExcel();     // Generar el archivo Excel después de prevenir el envío del formulario
  };

  return (
    <div className="forms-wrapper">
      <div className="form-container">
        <h2>Formulario de Caso</h2>
        <form id="project-form" onSubmit={handleSubmit} noValidate>
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
              {/* Opciones de mes */}
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
        {sectores.map((sector, index) => (
          <div key={index} className="sector-section">
            <h3>Sector {index + 1}</h3>
            <button type="button" className="delete-section-button" onClick={() => eliminarSector(index)}>
              Eliminar sección
            </button>
            <input
              type="text"
              name="nombreSector"
              placeholder="Nombre del sector"
              value={sector.nombreSector}
              onChange={(e) => handleSectorChange(index, e)}
            />
            {/* Otros inputs */}
          </div>
        ))}

        <button type="button" onClick={agregarSector} className="add-section-button">
          Agregar sección
        </button>
        <button type="submit">Generar informe</button>
      </div>
    </div>
  );
};

export default IngresoFormulario;
