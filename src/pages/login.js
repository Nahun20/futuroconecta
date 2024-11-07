import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'; // Asegúrate de importar estas funciones
import { db } from '../firebaseConfig'; // Importa la instancia de Firestore


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Inicializa Firebase Authentication

    try {
      // Intenta iniciar sesión con email y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Redirige al usuario según su rol
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.rol === 'admin') {
          navigate('/AdminDashboard'); // Redirige a AdminDashboard si es admin
        } else {
          navigate('/carreras'); // Redirige a carreras si es usuario
        }
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
