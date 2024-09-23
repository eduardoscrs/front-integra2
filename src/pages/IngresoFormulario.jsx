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

  const agregarImagenes = () => {
    console.log("Agregar imágenes");
    // Lógica para manejar la adición de imágenes.
  };

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
    XLSX.writeFile(workbook, 'datos_formulario.xlsx');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    exportarAExcel();
  };

  return (
    <div className="forms-wrapper">
      <form id="project-form" onSubmit={handleSubmit} noValidate>
        <div className="form-container">
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
        </div>

        <div className="form-container">
          {sectores.map((sector, index) => (
            <div key={index} className="sector-section">
              <div className="sector-header">
                <h3>Sector {index + 1}</h3>
                <button type="button" className="delete-section-button" onClick={() => eliminarSector(index)}>
                  Eliminar sección
                </button>
              </div>

              <input
                type="text"
                name="nombreSector"
                placeholder="Nombre del sector"
                value={sector.nombreSector}
                onChange={(e) => handleSectorChange(index, e)}
                className="full-width-input"
              />

              <div className="inputs-row">
                <input
                  type="number"
                  name="largo"
                  placeholder="Largo"
                  value={sector.largo}
                  onChange={(e) => handleSectorChange(index, e)}
                />
                <input
                  type="number"
                  name="ancho"
                  placeholder="Ancho"
                  value={sector.ancho}
                  onChange={(e) => handleSectorChange(index, e)}
                />
              </div>

              <div className="inputs-row">
                <input
                  type="number"
                  name="areaDañada"
                  placeholder="Área dañada"
                  value={sector.areaDañada}
                  onChange={(e) => handleSectorChange(index, e)}
                />
                <select
                  name="subcategoria"
                  value={sector.subcategoria}
                  onChange={(e) => handleSectorChange(index, e)}
                >
                  <option value="" disabled>Seleccione subcategoría</option>
                  <option value="sub1">Subcategoría 1</option>
                  <option value="sub2">Subcategoría 2</option>
                </select>
              </div>

              <div className="subcategory-section">
                <h4 className="subcategory-section-title">Añadir subcategoría</h4>
                <div className="subcategory-inputs">
                  <input
                    type="text"
                    name="añadirSubcategoria"
                    placeholder="Añadir subcategoría"
                    value={sector.añadirSubcategoria}
                    onChange={(e) => handleSectorChange(index, e)}
                  />
                  <input
                    type="text"
                    name="enviarDatos"
                    placeholder="Enviar datos"
                    value={sector.enviarDatos}
                    onChange={(e) => handleSectorChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={agregarSector} className="add-section-button">
            Agregar sección
          </button>

          <button type="button" onClick={agregarImagenes} className="add-images-button">
            Agregar imágenes
          </button>

          <button type="submit" className="generate-report-button">Generar informe</button>
        </div>
      </form>
    </div>
  );
};

<footer>
  <p>© 2024 SegurApp - Todos los derechos reservados</p>
</footer>

export default IngresoFormulario;
