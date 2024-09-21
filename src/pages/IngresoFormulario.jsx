import { useState } from 'react';
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

  // Estado para el formulario de sectores
  const [sectores, setSectores] = useState([
    { nombreSector: '', largo: '', ancho: '', areaDañada: '', subcategoria: '' }
  ]);

  // Manejar cambios en el formulario principal
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Manejar cambios en las secciones de sectores
  const handleSectorChange = (index, e) => {
    const updatedSectores = sectores.map((sector, i) =>
      i === index ? { ...sector, [e.target.name]: e.target.value } : sector
    );
    setSectores(updatedSectores);
  };

  // Añadir una nueva sección de sector
  const agregarSector = () => {
    setSectores([...sectores, { nombreSector: '', largo: '', ancho: '', areaDañada: '', subcategoria: '' }]);
  };

  // Eliminar una sección de sector
  const eliminarSector = (index) => {
    const updatedSectores = sectores.filter((_, i) => i !== index);
    setSectores(updatedSectores);
  };

  // Manejar envío del formulario completo
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', { formData, sectores });
  };

  return (
    <div className="forms-wrapper">
      {/* Formulario principal */}
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

      {/* Formulario de Sectores */}
      <div className="form-container">
        {sectores.map((sector, index) => (
          <div key={index} className="sector-section">
            <h3>Sector {index + 1}</h3>
            <button
              type="button"
              className="delete-section-button"
              onClick={() => eliminarSector(index)}
            >
              Eliminar sección
            </button>
            <input
              type="text"
              name="nombreSector"
              placeholder="Nombre del sector"
              value={sector.nombreSector}
              onChange={(e) => handleSectorChange(index, e)}
            />

            {/* Fila con Largo, Ancho, Área dañada y Subcategoría */}
            <div className="inputs-row">
              <input
                type="text"
                name="largo"
                placeholder="Largo"
                value={sector.largo}
                onChange={(e) => handleSectorChange(index, e)}
              />
              <input
                type="text"
                name="ancho"
                placeholder="Ancho"
                value={sector.ancho}
                onChange={(e) => handleSectorChange(index, e)}
              />
              <input
                type="text"
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
          </div>
        ))}

        <button type="button" onClick={agregarSector} className="add-section-button">
          Agregar sección
        </button>
        <button type="submit" onClick={handleSubmit}>Generar informe</button>
      </div>
    </div>
  );
};

export default IngresoFormulario;
