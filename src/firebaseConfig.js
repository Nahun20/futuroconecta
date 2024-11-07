// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDKjIrYdsSKkqTKmXeqd7dt8L3X8yQJyFg",
  authDomain: "futuroconecta-376dc.firebaseapp.com",
  projectId: "futuroconecta-376dc",
  storageBucket: "futuroconecta-376dc.firebasestorage.app",
  messagingSenderId: "940197688562",
  appId: "1:940197688562:web:ee1ea8e0ff5e3ffb2ccc6b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta servicios
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
export default app; // Exportación predeterminada
