import '../styles/DatosUsuario.css';
import DatosUsuario from '../components/DatosUsuario';
import { usuario } from '../assets';

const PerfilUsuario = () => {
  return (
    <div className="imagen-datos">
      <img
        src={usuario}
        alt="Imagen de perfil del usuario"
        className="imagen-usuario"
      />
      <section className="seccion-usuario">
        <h1>Usuario</h1>
        <span>Detalles de perfil</span>
        <button className="btn-editar-perfil">Editar perfil</button>
        <div className="div-componentes-usuario">
          <DatosUsuario datoBold="Rol" />
          <DatosUsuario datoUsuario="Nombre Apellido" />
          <DatosUsuario datoBold="Correo" datoUsuario="correo@gmail.com" />
          <DatosUsuario datoBold="Celular" datoUsuario="+56912345678" />
        </div>
        <button className="btn-cambiar-contraseña">Cambiar contraseña</button>
      </section>
    </div>
  );
};

export default PerfilUsuario;
