// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Si no hay un usuario autenticado, redirige a la página de inicio de sesión
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Si hay un usuario autenticado, renderiza los hijos
  return children;
};

export default ProtectedRoute;
