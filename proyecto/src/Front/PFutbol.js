import React from 'react';

const PFutbol = ({ informacionGuardada }) => {
  // Verificar si data está definida antes de acceder a sus propiedades
  if (!informacionGuardada) {
    return null; // : mostrar un mensaje de error
  }

  return (
    <div>
      <h2>{informacionGuardada.titulo}</h2>
      <p>Categoría: {informacionGuardada.categoria}</p>
      <p>Subcategoría: {informacionGuardada.subCategoria}</p>
      <p>Contenido: {informacionGuardada.contenido}</p>
     
    </div>
  );
};

export default PFutbol;
