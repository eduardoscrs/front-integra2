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

  const [errors, setErrors] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    comuna: '',
    dia: '',
    mes: '',
    año: '',
  });

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

  const validarFormulario = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.rut) newErrors.rut = 'El RUT es obligatorio.';
    if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria.';
    if (!formData.comuna) newErrors.comuna = 'La comuna es obligatoria.';
    if (!formData.dia || formData.dia < 1 || formData.dia > 31)
      newErrors.dia = 'El día debe ser un número entre 1 y 31.';
    if (!formData.mes || formData.mes < 1 || formData.mes > 12)
      newErrors.mes = 'El mes debe ser un número entre 1 y 12.';
    if (!formData.año || formData.año < 1900 || formData.año > new Date().getFullYear())
      newErrors.año = 'El año debe ser un número válido.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    const esValido = validarFormulario();
    if (!esValido) {
      console.log("El formulario no es válido");
      return;
    }
    enviarDatos();
  };

  // Función para generar el archivo Excel
  //Fun ción para generar el archivo Excel con formato específico
  const generarExcelFormato = () => {
    // Datos del cliente obtenidos del formulario
    const clienteInfo = {
      nombre: formData.nombre || "Nombre Cliente",
      rut: formData.rut || "12345678-9",
      fecha_siniestro: `${formData.dia}/${formData.mes}/${formData.año}`,
      direccion: formData.direccion || "Dirección",
      comuna: formData.comuna || "Comuna",
      fecha_proyecto: "20/09/2024",
      sn: "SN*1908983",
    };
  
    // Detalle de partidas con datos reales y aleatorios
    const detalles = sectores.map((sector) => ([
      `SECTOR: ${sector.nombre_sector}`,
      "M2",
      parseFloat(sector.porcentaje_perdida) || (Math.random() * 5).toFixed(2),
      Math.floor(Math.random() * (20000 - 1500 + 1)) + 1500,
    ]));
  
    // Partidas predefinidas
    detalles.push(["FRAGUE", "M2", 0.3, 3000 + Math.random() * 2000]);
    detalles.push(["PREPARACIÓN DE SUPERFICIE", "M2", 0.3, 4000 + Math.random() * 1000]);
    detalles.push(["PROV. E INST. CERAMICOS", "M2", 3.3, 15000 + Math.random() * 5000]);
  
    // Datos generales adicionales
    const generales = [
      ["Traslado de Materiales a Obra", "GL", 1, Math.floor(Math.random() * (70000 - 50000 + 1)) + 50000],
      ["Retiro de Escombros", "GL", 1, Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000],
      ["Aseo Diario y Entrega Final", "GL", 1, Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000],
    ];
  
    // Crear hoja de cálculo
    const wb = XLSX.utils.book_new();
    const wsData = [];
  
    // Encabezado del proyecto
    wsData.push(["PROYECTO", "", "", "", "REPARACIÓN DAÑOS EN VIVIENDA"]);
    wsData.push(["NOMBRE:", clienteInfo.nombre, "", "RUT:", clienteInfo.rut, clienteInfo.fecha_proyecto]);
    wsData.push(["FECHA SINIESTRO:", clienteInfo.fecha_siniestro, "", "DIRECCIÓN:", clienteInfo.direccion]);
    wsData.push(["COMUNA:", clienteInfo.comuna, "", "", ""]);
    wsData.push([]);
    wsData.push(["DETALLE DE PARTIDAS ITEMIZADAS", "", "", "", "DETERMINACIÓN DE VALORES"]);
    wsData.push(["DESCRIPCIÓN", "Unid", "Cant.", "Prec. Unit.", "Prec. Total", "Obs"]);
  
    // Agregar detalles de partidas al Excel
    let totalGeneral = 0;
    detalles.forEach(([descripcion, unidad, cantidad, precioUnitario]) => {
      const precioTotal = (cantidad * precioUnitario).toFixed(2);
      wsData.push([descripcion, unidad, cantidad, precioUnitario, precioTotal, ""]);
      totalGeneral += parseFloat(precioTotal);
    });
  
    // Agregar datos generales al Excel
    wsData.push([]);
    wsData.push(["GENERAL", "", "", "", ""]);
    generales.forEach(([descripcion, unidad, cantidad, precioUnitario]) => {
      const precioTotal = (cantidad * precioUnitario).toFixed(2);
      wsData.push([descripcion, unidad, cantidad, precioUnitario, precioTotal, ""]);
      totalGeneral += parseFloat(precioTotal);
    });
  
    // Cálculos de costos
    const costoDirectoObra = totalGeneral;
    const gastosGeneralesUtilidades = (costoDirectoObra * 0.25).toFixed(2);
    const costoNeto = (costoDirectoObra + parseFloat(gastosGeneralesUtilidades)).toFixed(2);
    const iva = (costoNeto * 0.19).toFixed(2);
    const costoTotal = (parseFloat(costoNeto) + parseFloat(iva)).toFixed(2);
  
    // Agregar la sección de cálculo final al Excel
    wsData.push([]);
    wsData.push(["Total General", "", "", "", totalGeneral.toFixed(2)]);
    wsData.push(["COSTO DIRECTO DE OBRA", "", "", "", costoDirectoObra.toFixed(2)]);
    wsData.push(["GASTOS GENERALES Y UTILIDADES 25%", "", "", "", gastosGeneralesUtilidades]);
    wsData.push(["COSTO NETO", "", "", "", costoNeto]);
    wsData.push(["IVA 19%", "", "", "", iva]);
    wsData.push(["COSTO TOTAL EN $", "", "", "", costoTotal]);
  
    // Crear hoja y archivo Excel
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Reparacion_Danos");
    XLSX.writeFile(wb, "Proyecto_Reparacion_Danos.xlsx");
  };

  return (
    <div className="forms-wrapper">
  {/* Formulario de Caso */}
  <div className="form-container">
    <h2>Formulario de Caso</h2>
    <form id="case-form" onSubmit={handleSubmit} noValidate>
      {/* Campo de Nombre */}
      <div className="form-group">
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? "input-error" : ""}
        />
        {errors.nombre && (
          <span className="floating-error">{errors.nombre}</span>
        )}
      </div>

      {/* Campo de Rut */}
      <div className="form-group">
        <input
          type="text"
          id="rut"
          placeholder="RUT"
          required
          value={formData.rut}
          onChange={handleChange}
          className={errors.rut ? "input-error" : ""}
        />
        {errors.rut && <span className="floating-error">{errors.rut}</span>}
      </div>

      {/* Campo de Dirección */}
      <div className="form-group">
        <input
          type="text"
          id="direccion"
          placeholder="Dirección"
          required
          value={formData.direccion}
          onChange={handleChange}
          className={errors.direccion ? "input-error" : ""}
        />
        {errors.direccion && (
          <span className="floating-error">{errors.direccion}</span>
        )}
      </div>

      {/* Campo de Comuna */}
      <div className="form-group">
        <input
          type="text"
          id="comuna"
          placeholder="Comuna"
          required
          value={formData.comuna}
          onChange={handleChange}
          className={errors.comuna ? "input-error" : ""}
        />
        {errors.comuna && (
          <span className="floating-error">{errors.comuna}</span>
        )}
      </div>

      {/* Sección de Fecha */}
      <div className="date-inputs">
        {/* Día */}
        <div className="form-group">
          <input
            type="number"
            id="dia"
            placeholder="Día"
            required
            value={formData.dia}
            onChange={handleChange}
            className={errors.dia ? "input-error" : ""}
          />
          {errors.dia && <span className="floating-error">{errors.dia}</span>}
        </div>

        {/* Mes */}
        <div className="form-group">
          <input
            type="number"
            id="mes"
            placeholder="Mes"
            required
            value={formData.mes}
            onChange={handleChange}
            className={errors.mes ? "input-error" : ""}
          />
          {errors.mes && <span className="floating-error">{errors.mes}</span>}
        </div>

        {/* Año */}
        <div className="form-group">
          <input
            type="number"
            id="año"
            placeholder="Año"
            required
            value={formData.año}
            onChange={handleChange}
            className={errors.año ? "input-error" : ""}
          />
          {errors.año && <span className="floating-error">{errors.año}</span>}
        </div>
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

          <button type="button" onClick={generarExcelFormato} className="submit-button">
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
