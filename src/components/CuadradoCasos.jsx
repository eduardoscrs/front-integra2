function CuadradoCasos(titulo, imageSrc, numeroCasos) {
    return (
        <div className="cuadrado_casos"> {/* cuadrado contenedor */}
            <h2>{titulo}</h2> {/* titulo */}
            <img src={`../assets/${imageSrc}.svg`} alt="Icono" /> {/* icono */}
            <p>{numeroCasos}</p> {/* numero en grande */}
        </div>
    );
}

export default CuadradoCasos;