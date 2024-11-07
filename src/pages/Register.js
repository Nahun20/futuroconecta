import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Asegúrate de importar el archivo CSS

function Register() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Crear el usuario con el correo y la contraseña proporcionados
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda el usuario en Firestore con rol 'user' por defecto
      await setDoc(doc(db, 'usuarios', user.uid), {
        email: user.email,
        rol: 'user', // Asignar el rol de usuario por defecto
      });

      // Redirige al login después de registrar al usuario
      navigate('/login');
    } catch (err) {
      setError(err.message);
      console.error("Error de registro:", err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label className="register-label" htmlFor="email">Correo electrónico</label>
            <input
              className="register-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="password">Contraseña</label>
            <input
              className="register-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              className="register-input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
