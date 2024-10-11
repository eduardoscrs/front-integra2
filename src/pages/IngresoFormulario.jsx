import { useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/Formulario.css';
import { crearCaso } from '../services/formularioService';

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
   const [contratista, setContratista] = useState('');

  const [imagenes, setImagenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura de la modal

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
  
  const enviarDatos = async () => {
    const datosFormulario = {
      ...formData,
      contratista,
      sectores, // Añade los sectores también
    };
  
    try {
      await crearCaso(datosFormulario);
      console.log("Datos enviados exitosamente!");
      alert("Los datos se han enviado correctamente."); // Muestra una alerta de éxito
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al enviar los datos. Por favor, intenta de nuevo."); // Muestra una alerta de error
    }
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
      }
    ];

    // Agregar un separador entre los datos personales y los sectores
    dataToExport.push({ "Nombre del sector": "Sectores:" });

    sectores.forEach((sector, index) => {
      dataToExport.push({
        "Sector": `Sector ${index + 1}`,
        "Nombre del sector": sector.nombreSector,
        "Largo": sector.largo,
        "Ancho": sector.ancho,
        "Área dañada": sector.areaDañada,
        "Subcategoría": sector.subcategoria,
        "Añadir subcategoría": sector.añadirSubcategoria,
        "Enviar datos": sector.enviarDatos
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Formulario');
    XLSX.writeFile(workbook, 'datos_formulario.xlsx');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    exportarAExcel(); // Llama a la función de exportación
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra la modal
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
            {/* Selección de contratista */}
        <select
          id="contratista"
          value={contratista}
          onChange={(e) => setContratista(e.target.value)}
          required
        >
          <option value="" disabled>Selecciona un contratista</option>
          <option value="Contratista 1">Carpintero </option>
          <option value="Contratista 2">Electricista</option>
          <option value="Contratista 3">Plomero</option>
        </select>
          </div>
        <button type="button" onClick={enviarDatos} className="add-section-button">
          Enviar datos
        </button>
        </form>
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

        <input
          id="imagenInput"
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleImagenesSeleccionadas}
        />

        <button type="submit" className="generate-button" form="project-form">Generar Informe</button>
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
