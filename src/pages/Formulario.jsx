import React, { useState } from 'react';
import './Formulario.css'; // Importar el CSS

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    comuna: '',
    dia: '',
    mes: '',
    año: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="form-container">
      <h2>Formulario de Proyecto</h2>
      <form id="project-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
          title="El nombre solo debe contener letras y espacios."
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          id="rut"
          placeholder="RUT"
          required
          pattern="\d{1,2}\.\d{3}\.\d{3}-[0-9Kk]{1}"
          title="El RUT debe tener el formato 12.345.678-9."
          value={formData.rut}
          onChange={handleChange}
        />
        <input
          type="text"
          id="direccion"
          placeholder="Dirección"
          required
          pattern="[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+"
          title="La dirección solo debe contener letras, números y espacios."
          value={formData.direccion}
          onChange={handleChange}
        />
        <input
          type="text"
          id="comuna"
          placeholder="Comuna"
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
          title="La comuna solo debe contener letras y espacios."
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
            title="Por favor ingresa un día válido entre 1 y 31."
            value={formData.dia}
            onChange={handleChange}
          />
          <select
            id="mes"
            required
            value={formData.mes}
            onChange={handleChange}
          >
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
            min="1900"
            max="2100"
            required
            title="Por favor ingresa un año válido entre 1900 y 2100."
            value={formData.año}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
