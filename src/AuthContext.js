import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Asegúrate de que esta importación sea correcta
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Guarda el usuario en el estado
        });

        return () => unsubscribe(); // Limpia el listener cuando se desmonta el componente
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
