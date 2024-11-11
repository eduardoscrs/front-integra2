////import { useState } from 'react';

/*
const SubsectorList = ({ subsectorData, onSubsectorChange }) => {
  const [subsectores, setSubsectores] = useState(subsectorData || []);

  const handleSubsectorChange = (index, e) => {
    const updatedSubsectores = subsectores.map((subsector, i) =>
      i === index ? { ...subsector, [e.target.name]: e.target.value } : subsector
    );
    setSubsectores(updatedSubsectores);
    onSubsectorChange(updatedSubsectores);
  };

  const agregarSubsector = () => {
    setSubsectores([...subsectores, { nombreSubsector: '', detalleSubsector: '' }]);
  };

  const eliminarSubsector = (index) => {
    const updatedSubsectores = subsectores.filter((_, i) => i !== index);
    setSubsectores(updatedSubsectores);
    onSubsectorChange(updatedSubsectores);
  };

  return (
    <div className="subsector-list">
      {subsectores.map((subsector, index) => (
        <div key={index} className="subsector-section">
          <input
            type="text"
            name="nombreSubsector"
            placeholder="Nombre del subsector"
            value={subsector.nombreSubsector}
            onChange={(e) => handleSubsectorChange(index, e)}
          />
          <input
            type="text"
            name="detalleSubsector"
            placeholder="Detalle del subsector"
            value={subsector.detalleSubsector}
            onChange={(e) => handleSubsectorChange(index, e)}
          />
          <button type="button" onClick={() => eliminarSubsector(index)}>
            Eliminar subsector
          </button>
        </div>
      ))}

      <button type="button" onClick={agregarSubsector}>
        Agregar subsector
      </button>
    </div>
  );
};

export default SubsectorList;
*/
