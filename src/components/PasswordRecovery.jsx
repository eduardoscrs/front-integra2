import { useState } from 'react';
import '../styles/PasswordRecovery.css';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    
    // Simular envío de email de recuperación
    if (email) {
      // mas adelante se debe integrar la logica del backend para enviar un correo de recuperacion.
      setMessage('Se ha enviado un enlace de recuperación a tu correo.');
    } else {
      setMessage('Por favor, ingresa un correo válido.');
    }
  };

  return (
    <div className="password-recovery-page">
      <div className="password-recovery-box">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handlePasswordRecovery}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="ejemplo@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit" className="recovery-btn">Enviar</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordRecovery;
