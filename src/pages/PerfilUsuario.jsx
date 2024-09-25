import '../styles/PerfilUsuario.css';
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
        <div className="div-componentes-usuario">
          <button className="btn-editar-perfil">Editar perfil</button>
          <DatosUsuario datoUsuario="Rol" />
          <DatosUsuario datoBold="Nombre" datoUsuario="Eduardo Escares" />
          <DatosUsuario datoBold="Correo" datoUsuario="eduardo@gmail.com" />
          <DatosUsuario datoBold="Celular" datoUsuario="+56912345678" />
          <button className="btn-cambiar-contraseña">Cambiar contraseña</button>
        </div>
      </section>
    </div>
  );
};

export default PerfilUsuario;
