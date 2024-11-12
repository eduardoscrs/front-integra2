import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import '../Styles/AdminPage.css';

const AdminPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo para un reloj en tiempo real

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dayOfWeek = currentTime.toLocaleString('en-US', { weekday: 'short' });

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-page__content">
        <div className="welcome-banner">
          <h1>¡Bienvenido/a al panel de administración!</h1>
        </div>

        <div className="main-info">
          <div className="welcome-message">
            <p>¡Hola, administrador! Bienvenido al panel de administración de la plataforma. Aquí tienes acceso a herramientas avanzadas que te permitirán gestionar usuarios, supervisar el rendimiento del sistema, y configurar las opciones que garantizarán una experiencia óptima para todos.</p>
            <p>Este panel es tu centro de mando: desde aquí podrás revisar estadísticas detalladas, monitorear la actividad de los usuarios, y responder rápidamente a cualquier situación que necesite atención. Aprovecha cada herramienta para mantener el control y optimizar continuamente la plataforma.</p>
            <p>Tu rol es esencial para el éxito de la plataforma.</p>
          </div>
        </div>

        <button className="quick-action__button">Añadir nuevo Caso</button>

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
