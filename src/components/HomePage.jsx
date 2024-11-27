import '../styles/Logout.css';
import '../styles/HomePage.css';
import APPmovil from '../assets/APPmovil.png';
import APPmovil2 from '../assets/APPmovil2.png';
import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">


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
      
      <div id="title" className="slide header">
        <h1>Bienvenidos a</h1>
        <h1>SegurApp</h1>
      </div>
      
      <div id="slide1" className="slide">
        <div className="title">
          <h1>¿Qué es SegurApp?</h1>
          <p>SegurApp es una plataforma integral diseñada para empresas del sector asegurador. Con ella, los inspectores pueden llevar a cabo inspecciones en propiedades de forma estructurada, recopilando, gestionando y analizando información relevante. La plataforma permite la creación de registros formales y documentos de catastro, todo organizado en plantillas predefinidas para facilitar su almacenamiento y acceso.</p>
        </div>
      </div>
      
      <div id="slide2" className="slide">
        <div className="title">
          <h1>Funcionalidades Clave</h1>
          <p>La plataforma cuenta con una aplicación móvil complementaria que permite la recopilación de datos en campo, incluso sin conexión a internet. Además, SegurApp integra un sistema de respaldo de datos (backup), seguridad de información y sincronización entre dispositivos. Esto asegura que todos los registros estén protegidos y sean accesibles para el equipo de inspección en cualquier momento y desde cualquier lugar.</p>
        </div>
        <img src={APPmovil} alt="Funcionalidades de SegurApp" />
        <img src={APPmovil2} alt="Aplicación móvil de SegurApp" /> 
      </div>
      
      <div id="slide3" className="slide">
        <div className="title">
          <h1>Beneficios de Usar SegurApp</h1>
          <p>Con SegurApp, las empresas de seguros pueden optimizar sus procesos de inspección y catastro. La plataforma facilita la transferencia de datos y documentación entre los dispositivos de los inspectores y la oficina central, aumentando la precisión y la eficiencia en la generación de reportes. Además, su interfaz intuitiva y su soporte multiusuario hacen que sea fácil de usar para todo el equipo.</p>
        </div>
      </div>
      
      <div id="slide4" className="slide header">
        <h1>Gracias por visitar SegurApp</h1>
        <p>Explora todo lo que SegurApp puede hacer para mejorar tus procesos de inspección y gestión de seguros.</p>
      </div>
    </div>
  );
};

export default HomePage;

