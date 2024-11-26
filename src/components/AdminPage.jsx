import { useState, useEffect } from "react";
import '../Styles/AdminPage.css';
import { Outlet, Link } from "react-router-dom";
import { getMaterials, updateMaterialPrice } from "../services/adminService"; // Asegúrate de importar el service
import { obtenerCasos } from "../services/casosService";

const AdminPage = () => {

  const [casos, setCasos] = useState({ total: 0, aceptados: 0, rechazados: 0 });

  useEffect(() => {
    const fetchCasos = async () => {
      try {
        const casosData = await obtenerCasos(); // Llamamos al servicio
        setCasos({
          total: casosData.length, // Casos totales
          aceptados: casosData.filter((caso) => caso.ID_estado === 3).length, // Casos aceptados
          rechazados: casosData.filter((caso) => caso.ID_estado === 4).length, // Casos rechazados
        });
      } catch (error) {
        console.error("Error al cargar los casos:", error);
      }
    };

    fetchCasos(); // Ejecutamos la función para cargar los casos
  }, []); // El hook se ejecuta solo una vez al montar el componente

  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Cargar los materiales al cargar el componente
  useEffect(() => {
    const fetchMaterials = async () => {
      console.log(materialsData)
      const materialsData = await getMaterials();
      setMaterials(materialsData);
    };
    fetchMaterials();
  }, []);

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    if (selectedMaterial && newPrice) {
      const updatedMaterial = await updateMaterialPrice(selectedMaterial, newPrice);
      if (updatedMaterial) {
        alert('Precio actualizado exitosamente');
        // Podrías también actualizar el estado local de los materiales si es necesario
      }
    } else {
      alert('Por favor selecciona un material y un nuevo precio.');
    }
  };


  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    contraseña: "",
    direccion: "",
    comuna: "",
    rol: "inspector", // Por defecto "inspector"
  });
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo para un reloj en tiempo real

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario creado:", formData);
    alert("Usuario creado exitosamente.");
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dayOfWeek = currentTime.toLocaleString('en-US', { weekday: 'short' });

  return (
    <div className="admin-page">


    <ul className="menu">
        <li>
          <Link to="/inicio">
            <i className="inicio-h"></i>Inicio
          </Link>
        </li>
        <li>
          <Link to="/ingreso-formulario">
            <i className="form-h"></i>Formulario
          </Link>
        </li>

        <li>
          <Link to="/casos">
            <i className="casos-h"></i> Casos
          </Link>
        </li>
        
        <li>
          <Link to="/perfil-usuario">
            <i className="perfil-h"></i> Perfil
          </Link>
        </li>

        <li>
          <Link to="/logout">
            <i className="logout-h"></i> Logout
          </Link>
        </li>

      </ul> 
      <Outlet/>
      <div className="admin-page__content">
        <div className="welcome-banner">
          <h1>Panel de administración</h1>
        </div>

        <div className="main-info">
          <div className="welcome-message">
            <p>¡Hola, administrador! Bienvenido al panel de administración de la plataforma. Aquí tienes acceso a herramientas avanzadas que te permitirán gestionar usuarios, supervisar el rendimiento del sistema, y configurar las opciones que garantizarán una experiencia óptima para todos.</p>
            <p>Este panel es tu centro de mando: desde aquí podrás revisar estadísticas detalladas, monitorear la actividad de los usuarios, y responder rápidamente a cualquier situación que necesite atención. Aprovecha cada herramienta para mantener el control y optimizar continuamente la plataforma.</p>
            <p>Tu rol es esencial para el éxito de la plataforma.</p>
          </div>
        </div>

        <div className="main-info">
          <div className="logo">
          </div>
        </div>

        <div className="main-info">
        <div className="box">
            <h3>Eliminar Usuario</h3>
            <form className="delete-user-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                Correo del Usuario:
                <input type="email" name="correo" placeholder="Ejemplo: usuario@email.com" required />
              </label>
              <button type="submit">Eliminar Usuario</button>
            </form>
            <p className="delete-user-message">
              Ingresa el correo electrónico del usuario que deseas eliminar y presiona el botón.
            </p>
          </div>
        </div>

        <div className="main-info">
          <div className="box2">
            <h3>Crear Usuario</h3>
            <form onSubmit={handleSubmit} className="user-form">
              <label>
                Nombre:
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </label>
              <label>
                Apellido:
                <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
              </label>
              <label>
                Correo:
                <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} required />
              </label>
              <label>
                Celular:
                <input type="tel" name="celular" value={formData.celular} onChange={handleInputChange} required />
              </label>
              <label>
                Contraseña:
                <input type="password" name="contraseña" value={formData.contraseña} onChange={handleInputChange} required />
              </label>
              <label>
                Dirección:
                <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
              </label>
              <label>
                Comuna:
                <input type="text" name="comuna" value={formData.comuna} onChange={handleInputChange} required />
              </label>
              <label>
                Rol:
                <select name="rol" value={formData.rol} onChange={handleInputChange}>
                  <option value="inspector">Inspector</option>
                  <option value="cliente">Cliente</option>
                </select>
              </label>
              <button type="submit">Crear Usuario</button>
            </form>
          </div>
        </div>

        <div className="main-info">
          <div className="box3">
               <h3>Casos</h3>
              <div className="scard">Casos Totales {casos.total}</div>
              <div className="scard">Aceptados {casos.aceptados}</div>
              <div className="scard">Rechazados {casos.rechazados}</div>
              <Link to="/casos">
              <button type="submit">ir a Casos</button>
              </Link>
          </div>
        </div>

        <div className="main-info">
            <div className="map">
            <h3>Actualizar Precios de Materiales</h3>
            <form onSubmit={handleUpdatePrice}>
              <label>
                Selecciona un material:
                <select value={selectedMaterial} onChange={handleMaterialChange} required>
                  <option value="">-- Seleccionar --</option>
                  {materials.map((material) => (
                    <option key={material.ID_material} value={material.ID_material}>
                      {material.nombre_material}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ingresa el nuevo precio:
                <input
                  type="number"
                  value={newPrice}
                  onChange={handlePriceChange}
                  placeholder="Ej: 6000"
                  required
                />
              </label>
              <button type="submit">Actualizar Precio</button>
            </form>
          </div>
        </div>

         
        <div className="date-time">
          <h2>{dayOfWeek}</h2>
          <h1>{currentTime.getDate()}</h1>
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>

        <div className="key-stats">
          <div className="stat-card">Estadísticas Clave</div>
          <div className="stat-card">Total de Usuarios: 1,250</div>
          <div className="stat-card">Casos Resueltos: 320</div>
          <div className="stat-card">Casos Pendientes: 15</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
