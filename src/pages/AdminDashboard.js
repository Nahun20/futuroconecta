import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import './adminDashboard.css'; // Estilos del dashboard

const AdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar el loading de la validación
  const navigate = useNavigate();
  const db = getFirestore();

  // Verificar si el usuario logueado es admin
  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User Data:', userData); // Verifica que los datos del usuario sean correctos
            if (userData.role !== 'admin') {
              console.log('Usuario no es admin, redirigiendo...');
              navigate('/'); // Redirigir si no es admin
            } else {
              setIsAdmin(true); // Es admin, habilitar el formulario
            }
          } else {
            console.log('El usuario no existe en Firestore');
            navigate('/'); // Redirigir si no se encuentra el usuario en Firestore
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setError('Error al verificar el rol del usuario');
        }
      } else {
        console.log('Usuario no autenticado, redirigiendo...');
        navigate('/login'); // Redirigir si no está logueado
      }
      setLoading(false); // Termina el estado de carga
    };
    checkAdmin();
  }, [navigate, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar que el correo no esté vacío
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    setError(''); // Limpiar mensajes de error previos

    try {
      // Verificar si el correo ya está registrado
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError('Este correo electrónico ya está en uso.');
        setLoading(false);
        return;
      }

      // Registrar un nuevo administrador
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el nuevo admin en Firestore con el rol 'admin'
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
      });

      alert('Administrador registrado exitosamente');
      navigate('/AdminDashboard'); // Redirigir al dashboard de administrador
    } catch (error) {
      setError('Error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div id="admin-dashboard">
      <h1>Dashboard de Administrador</h1>
      {loading ? (
        <p>Cargando...</p> // Muestra "Cargando..." mientras validamos
      ) : isAdmin ? (
        <form onSubmit={handleSubmit}>
          <h2>Registrar nuevo Administrador</h2>
          {error && <p className="error-message">{error}</p>} {/* Mostrar error si ocurre */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar Administrador'}
          </button>
        </form>
      ) : (
        <p>No tienes acceso para ver esta página.</p> // Mensaje de acceso denegado si no es admin
      )}
    </div>
  );
};

export default AdminDashboard;
