// src/TestFirestore.js

import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

function TestFirestore() {
  useEffect(() => {
    // Función para obtener datos de Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'nombre_de_tu_coleccion'));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      } catch (error) {
        console.error("Error al obtener los documentos: ", error);
      }
    };

    fetchData();
  }, []);

  return <div>Revisa la consola para ver los datos de Firestore</div>;
}

export default TestFirestore;
