import React, { useState } from 'react';
import './FormularioProyecto.css'; // Importa los estilos desde el archivo CSS

const FormularioProyecto = () => {
    const [formData, setFormData] = useState({
        name: '',
        rut: '',
        direccion: '',
        comuna: '',
        dia: '',
        mes: '',
        año: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)) {
            newErrors.name = 'El nombre solo debe contener letras y espacios.';
        }

        if (!formData.rut.match(/^\d{1,2}\.\d{3}\.\d{3}-[0-9Kk]{1}$/)) {
            newErrors.rut = 'El RUT debe tener el formato 12.345.678-9.';
        }

        if (!formData.direccion.match(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/)) {
            newErrors.direccion = 'La dirección solo debe contener letras, números y espacios.';
        }

        if (!formData.comuna.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)) {
            newErrors.comuna = 'La comuna solo debe contener letras y espacios.';
        }

        if (!formData.dia || formData.dia < 1 || formData.dia > 31) {
            newErrors.dia = 'Por favor ingresa un día válido entre 1 y 31.';
        }

        if (!formData.mes) {
            newErrors.mes = 'Por favor selecciona un mes.';
        }

        if (!formData.año || formData.año < 1900 || formData.año > 2100) {
            newErrors.año = 'Por favor ingresa un año válido entre 1900 y 2100.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario enviado con éxito:', formData);
            // Aquí podrías enviar los datos a un servidor o realizar alguna acción adicional.
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="form-container">
            <h2>Formulario de Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <small>{errors.name}</small>}

                <input
                    type="text"
                    name="rut"
                    placeholder="RUT"
                    value={formData.rut}
                    onChange={handleChange}
                    className={errors.rut ? 'error' : ''}
                />
                {errors.rut && <small>{errors.rut}</small>}

                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={errors.direccion ? 'error' : ''}
                />
                {errors.direccion && <small>{errors.direccion}</small>}

                <input
                    type="text"
                    name="comuna"
                    placeholder="Comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    className={errors.comuna ? 'error' : ''}
                />
                {errors.comuna && <small>{errors.comuna}</small>}

                <div className="date-container">
                    <input
                        type="number"
                        name="dia"
                        placeholder="día"
                        value={formData.dia}
                        onChange={handleChange}
                        className={errors.dia ? 'error' : ''}
                    />
                    <select
                        name="mes"
                        value={formData.mes}
                        onChange={handleChange}
                        className={errors.mes ? 'error' : ''}
                    >
                        <option value="" disabled>mes</option>
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
                        name="año"
                        placeholder="año"
                        value={formData.año}
                        onChange={handleChange}
                        className={errors.año ? 'error' : ''}
                    />
                </div>
                {errors.dia && <small>{errors.dia}</small>}
                {errors.mes && <small>{errors.mes}</small>}
                {errors.año && <small>{errors.año}</small>}

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default FormularioProyecto;
