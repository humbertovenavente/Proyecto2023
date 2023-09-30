import React from 'react';

const PFutbol = ({ data }) => {
  // Verificar si data está definida antes de acceder a sus propiedades
  if (!data) {
    return null; // Otra opción: mostrar un mensaje de error
  }

  return (
    <div>
      <h2>{data.titulo}</h2>
      <p>Categoría: {data.categoria}</p>
      <p>Subcategoría: {data.subCategoria}</p>
      <p>Contenido: {data.contenido}</p>
     
    </div>
  );
};

export default PFutbol;
