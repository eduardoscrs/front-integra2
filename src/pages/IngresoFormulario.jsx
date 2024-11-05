import { useState } from 'react';
import * as XLSX from 'xlsx'; // Importa la biblioteca xlsx
import '../styles/Formulario.css';
import { crearCaso } from '../services/formularioService';

const IngresoFormulario = () => {
  const [formData, setFormData] = useState({
    ID_caso: 30,
    tipo_siniestro: '',
    descripcion_siniestro: '',
    ID_Cliente: '',
    ID_inspector: '',
    ID_contratista: '',
    ID_estado: '',
    nombre_estado: 'Aceptado',
    nombre: '',
    rut: '',
    direccion: '',
    comuna: '',
    dia: '',
    mes: '',
    año: '',
    sectores: []
  });

  const [sectores, setSectores] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura de la modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const agregarSector = () => {
    const nuevoSector = {
      ID_sector: Math.random(),
      nombre_sector: '',
      dano_sector: '',
      porcentaje_perdida: '',
      total_costo: '',
      ID_caso: formData.ID_caso,
    };
    setSectores([...sectores, nuevoSector]);
  };

  const manejarCambioSector = (index, e) => {
    const updatedSectores = [...sectores];
    updatedSectores[index][e.target.id] = e.target.value;
    setSectores(updatedSectores);
  };

  const eliminarSector = (index) => {
    const updatedSectores = sectores.filter((_, i) => i !== index);
    setSectores(updatedSectores);
  };

  const agregarImagenes = () => {
    document.getElementById('imagenInput').click(); // Simula un clic en el input de archivo
  };

  const handleImagenesSeleccionadas = (e) => {
    const files = Array.from(e.target.files); // Convertir los archivos seleccionados a un array
    const newImagenes = files.map((file) => URL.createObjectURL(file)); // Crear URLs temporales
    setImagenes((prevImagenes) => [...prevImagenes, ...newImagenes]); // Añadir las nuevas imágenes al estado
    setIsModalOpen(true); // Abrir la modal cuando se seleccionen imágenes
  };

  const enviarDatos = async () => {
    const datosAEnviar = {
      ...formData,
      sectores: sectores,
    };

    try {
      await crearCaso(datosAEnviar);
      console.log("Datos enviados exitosamente!");
      alert("Los datos se han enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al enviar los datos. Por favor, intenta de nuevo.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarDatos();
  };

  // Función para generar el archivo Excel
  const generarExcel = () => {
    const data = [
      { ...formData, sectores: undefined }, // Excluimos los sectores de la primera fila
      ...sectores.map(sector => ({
        ...formData,
        ...sector // Mezclamos los datos del sector con los del formulario
      }))
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos del Formulario");
    XLSX.writeFile(wb, "Formulario_Datos.xlsx");
  };

  return (
    <div className="forms-wrapper">
      {/* Formulario de Caso */}
      <div className="form-container">
        <h2>Formulario de Caso</h2>
        <form id="case-form" noValidate>
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
            placeholder="Rut"
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
          
          {/* Sección de la fecha */}
          <div className="date-inputs">
            <input
              type="number"
              id="dia"
              placeholder="Día"
              required
              value={formData.dia}
              onChange={handleChange}
            />
            <input
              type="number"
              id="mes"
              placeholder="Mes"
              required
              value={formData.mes}
              onChange={handleChange}
            />
            <input
              type="number"
              id="año"
              placeholder="Año"
              required
              value={formData.año}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      {/* Formulario de Datos */}
      <div className="form-container">
        <form id="case-form" onSubmit={handleSubmit} noValidate>
          <h2>Formulario de Datos</h2>

          <input
            type="text"
            id="tipo_siniestro"
            placeholder="Tipo de siniestro"
            required
            value={formData.tipo_siniestro}
            onChange={handleChange}
          />

          <input
            type="text"
            id="descripcion_siniestro"
            placeholder="Descripción del siniestro"
            required
            value={formData.descripcion_siniestro}
            onChange={handleChange}
          />

          <input
            type="number"
            id="ID_Cliente"
            placeholder="ID Cliente"
            required
            value={formData.ID_Cliente}
            onChange={handleChange}
          />

          <input
            type="number"
            id="ID_inspector"
            placeholder="ID Inspector"
            required
            value={formData.ID_inspector}
            onChange={handleChange}
          />

          <input
            type="number"
            id="ID_contratista"
            placeholder="ID Contratista"
            required
            value={formData.ID_contratista}
            onChange={handleChange}
          />

          <input
            type="number"
            id="ID_estado"
            placeholder="ID Estado"
            required
            value={formData.ID_estado}
            onChange={handleChange}
          />

          {/* Botón para agregar nuevos sectores */}
          <button type="button" className="submit-button" onClick={agregarSector}>
            Agregar Sector
          </button>

          {/* Sección para gestionar sectores */}
          {sectores.map((sector, index) => (
            <div key={index} className="sector-container">
              <input
                type="text"
                id="nombre_sector"
                placeholder="Nombre del sector"
                required
                value={sector.nombre_sector}
                onChange={(e) => manejarCambioSector(index, e)}
              />
              <input
                type="text"
                id="dano_sector"
                placeholder="Descripción del daño"
                required
                value={sector.dano_sector}
                onChange={(e) => manejarCambioSector(index, e)}
              />
              <input
                type="number"
                id="porcentaje_perdida"
                placeholder="Porcentaje de pérdida"
                required
                value={sector.porcentaje_perdida}
                onChange={(e) => manejarCambioSector(index, e)}
              />
              <input
                type="text"
                id="total_costo"
                placeholder="Total costo"
                required
                value={sector.total_costo}
                onChange={(e) => manejarCambioSector(index, e)}
              />
              <button type="button" className="submit-button" onClick={() => eliminarSector(index)}>Eliminar Sector</button>
            </div>
          ))}

          <button type="button" onClick={agregarImagenes} className="add-images-button">
            Agregar imágenes
          </button>

          <input
            id="imagenInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagenesSeleccionadas}
            style={{ display: 'none' }} // Oculta el input de archivo
          />

          <button type="button" onClick={generarExcel} className="submit-button">
            Generar Excel
          </button>

          <button type="submit" className="submit-button">
            Enviar datos
          </button>
        </form>
      </div>

      {/* Ventana modal para mostrar las imágenes seleccionadas */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Previsualización de imágenes</h2>
            <div className="image-preview">
              {imagenes.map((imagen, index) => (
                <img key={index} src={imagen} alt={`preview ${index}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoFormulario;
