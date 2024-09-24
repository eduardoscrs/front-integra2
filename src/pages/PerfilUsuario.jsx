import '../styles/DatosUsuario.css';
import DatosUsuario from '../components/DatosUsuario';
import { usuario } from '../assets';

const PerfilUsuario = () => {
  return (
    <div>
      <img src={usuario} alt="Imagen de perfil del usuario" />
      <h1>Usuario</h1>
      <span>Detalles de perfil</span>
      <button>Editar perfil</button>
      <DatosUsuario datoBold="Rol" />
      <DatosUsuario datoUsuario="Nombre Apellido" />
      <DatosUsuario datoBold="Correo" datoUsuario="correo@gmail.com" />
      <DatosUsuario datoBold="Celular" datoUsuario="+56912345678" />
      <button>Cambiar contraseña</button>
    </div>
  );
};

export default PerfilUsuario;
