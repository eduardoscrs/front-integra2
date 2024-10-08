import { useState } from 'react';
import '../styles/PasswordRecovery.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta



const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordRecovery = (e) => {
    e.preventDefault();

    if (email) {
      // Aquí se integrará la lógica del backend más adelante
      setMessage('Se ha enviado un enlace de recuperación a tu correo.');
    } else {
      setMessage('Por favor, ingresa un correo válido.');
    }
  };

  return (
    <div className="password-recovery-page">
      <div className="recuperar-contra">
        <h2>Ingresa tu correo electrónico para recuperar tu contraseña</h2>
        <form onSubmit={handlePasswordRecovery}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Value" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="recovery-btn">Reset Password</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      
    </div>
  );
};

export default PasswordRecovery;
