import React from 'react';
import './carreras.css'; // Asegúrate de tener un archivo de estilos correspondiente

// Importación de imágenes
import gastroImage from '../images/gastro.jpg';
import tiImage from '../images/ti.jpeg';
import bioImage from '../images/bio.jpg';

const Carreras = () => {
  return (
    <div className="carreras">
      <div className="carrera">
        <a href="gastronomia.html">
          <img src={gastroImage} alt="Gastronomía" />
          <p>Gastronomía</p>
        </a>
      </div>
 
      <div className="carrera">
        <a href="tecnologias.html">
          <img src={tiImage} alt="Tecnologías" />
          <p>Tecnologías</p>
        </a>
      </div>

      <div className="carrera">
        <a href="biotecnologia.html">
          <img src={bioImage} alt="Biotecnología" />
          <p>Biotecnología</p>
        </a>
      </div>
    </div>
  );
};

export default Carreras;
