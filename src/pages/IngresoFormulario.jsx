import { useState } from 'react';
import * as XLSX from 'xlsx'; // Librería para exportar a Excel
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
    sectores: [],
    imagen: null, // Para almacenar la imagen
  });

  const [sectores, setSectores] = useState([]);
  const [imagenPrevisualizada, setImagenPrevisualizada] = useState(null); // Para previsualizar la imagen
  const [mostrarModal, setMostrarModal] = useState(false); // Controlar el modal de imagen

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagen: file // Guardar la imagen en formData
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenPrevisualizada(e.target.result); // Mostrar la imagen previsualizada
      };
      reader.readAsDataURL(file);
    }
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

  const exportarExcel = () => {
    // Crear una hoja de trabajo (worksheet)
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Fusionar celdas para el título
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },  // Fusión para "C&C"
      { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } },  // Fusión para "Ingeniería y Obras Menores"
      { s: { r: 3, c: 0 }, e: { r: 3, c: 8 } },  // Fusión para "PROYECTO"
      { s: { r: 4, c: 0 }, e: { r: 4, c: 8 } },  // Fusión para "REPARACIÓN DAÑOS EN VIVIENDA"
      { s: { r: 5, c: 0 }, e: { r: 5, c: 7 } },  // Fusión para nombre del cliente
      { s: { r: 5, c: 8 }, e: { r: 5, c: 8 } },  // Fecha a la derecha
    ];

    // Añadir el contenido
    XLSX.utils.sheet_add_aoa(ws, [
      ['C&C'],  // Primera fila fusionada
      ['Ingeniería y Obras Menores'],  // Segunda fila fusionada
      [],  // Fila vacía
      ['PROYECTO'],  // Tercera fila fusionada
      ['REPARACIÓN DAÑOS EN VIVIENDA'],  // Cuarta fila fusionada
      [`NOMBRE: "" SN°1908983`, '', '', '', '', '', '', '', '20/9/2024'],  // Nombre y fecha
      [],  // Fila vacía
      ['Nombre del sector', 'Descripción del daño', 'Porcentaje de pérdida', 'Total costo'],  // Encabezados de la tabla de sectores
    ]);

    // Añadir los sectores
    sectores.forEach((sector) => {
      XLSX.utils.sheet_add_aoa(ws, [[
        sector.nombre_sector,
        sector.dano_sector,
        sector.porcentaje_perdida,
        sector.total_costo,
      ]], { origin: -1 }); // Agregar filas consecutivamente
    });

    // Definir ancho de las columnas
    ws['!cols'] = [
      { wch: 20 },  // Ancho de columna para Nombre del sector
      { wch: 30 },  // Ancho de columna para Descripción del daño
      { wch: 20 },  // Ancho de columna para Porcentaje de pérdida
      { wch: 15 },  // Ancho de columna para Total costo
    ];

    // Crear el libro de trabajo (workbook) y agregar la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sectores');

    // Exportar el archivo
    XLSX.writeFile(wb, 'sectores_actualizados.xlsx');
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="form-container">
      <form id="case-form" onSubmit={handleSubmit} noValidate>
        <h2>Formulario de Caso</h2>

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
            <button type="button" onClick={() => eliminarSector(index)}>Eliminar Sector</button>
          </div>
        ))}

        <button type="button" onClick={agregarSector}>Agregar Sector</button>

        {/* Botón para agregar imágenes */}
        <button type="button" onClick={abrirModal}>Agregar Imagen</button>

        {/* Modal para previsualizar la imagen */}
        {mostrarModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={cerrarModal}>&times;</span>
              {imagenPrevisualizada && (
                <img src={imagenPrevisualizada} alt="Previsualización" className="preview-image" />
              )}
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
        )}

        {/* Botón para generar informe */}
        <button type="button" onClick={exportarExcel}>Generar Informe</button>

        <button type="submit">Enviar Datos</button>
      </form>
    </div>
  );
};

export default IngresoFormulario;
