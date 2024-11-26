import { useState } from 'react';
import '../styles/Formulario.css';
import { crearCaso } from '../services/formularioService';
import { Outlet, Link } from "react-router-dom"; // Importa Link para redirigir
import '../styles/Sidebar.css';
import logo from '../assets/Segurapp_rbg.png'; 

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
    sectores: []
  });

  const [sectores, setSectores] = useState([]);

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

  const [isOpen, setIsOpen] = useState(true);

  const handleMouseEnter = () => {
    setIsOpen(true); // Sidebar se abre
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Sidebar se cierra
  };

  return (
    <div className="form-container">

<div
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="sidebar__logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Menu */}
      <ul className="sidebar__menu">
        <li>
          <Link to="/inicio">
            <i className="icon-dashboard"></i>Inicio
          </Link>
        </li>
        <li>
          <Link to="/ingreso-formulario">
            <i className="icon-dashboard"></i>Formulario
          </Link>
        </li>
        
        <li>
          <Link to="/perfil-usuario">
            <i className="icon-analytics"></i> Perfil
          </Link>
        </li>

        <li>
          <Link to="/logout">
            <i className="icon-analytics"></i> Logout
          </Link>
        </li>

      </ul>

      {/* Login Section */}
      <div className="sidebar__login">
        <Link to="/login">
          <button className="login__button">Login</button>
        </Link>
      </div>
      <Outlet/>
    </div>
    
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
        
        <button type="submit" className="submit-button">
          Enviar datos
        </button>
      </form>
    </div>
  );
};

export default IngresoFormulario;

