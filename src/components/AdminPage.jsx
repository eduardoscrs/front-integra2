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

        <div className="main-info">
          <div className="box">
          </div>
        </div>

        <div className="main-info">
          <div className="box2">
          </div>
        </div>

        <div className="main-info">
          <div className="box3">
          <iframe
            width="350"
            height="300"
            src="https://www.youtube.com/embed/6y-BJPlTGic"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          </div>
        </div>

        <div className="main-info">
          <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5140.765314279909!2d-72.55041642268066!3d-38.702891171766254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d25bb3523b6b%3A0x6d64cbb854e11a5b!2sUniversidad%20Cat%C3%B3lica%20de%20Temuco%20-%20Campus%20San%20Juan%20Pablo%20Segundo%2C%20IX%20Regi%C3%B3n%2C%20Chile!5e1!3m2!1ses-419!2scl!4v1731949017879!5m2!1ses-419!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
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
