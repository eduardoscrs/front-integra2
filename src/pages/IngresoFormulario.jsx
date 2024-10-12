import { useState } from 'react';
import '../styles/Formulario.css';
import { crearCaso } from '../services/formularioService';

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
      console.log('Datos de caso enviados exitosamente!');
      alert('Los datos del caso se han enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar los datos del caso:', error);
      alert('Ocurrió un error al enviar los datos del caso. Por favor, intenta de nuevo.');
    }
  };

  const enviarDatosSector = async () => {
    try {
      // Aquí puedes añadir la función para enviar los datos del sector.
      console.log('Datos de sector enviados exitosamente!');
      alert('Los datos del sector se han enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar los datos del sector:', error);
      alert('Ocurrió un error al enviar los datos del sector. Por favor, intenta de nuevo.');
    }
  };

  const handleSubmitCaso = (e) => {
    e.preventDefault();
    enviarDatos();
  };

  const handleSubmitSector = (e) => {
    e.preventDefault();
    enviarDatosSector();
  };

  return (
    <div className="forms-wrapper">
      {/* Contenedor para el Formulario de Caso */}
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

      {/* Contenedor para el Formulario de Sector */}
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
        </form>
      </div>
    </div>
  );
};

export default IngresoFormulario;
