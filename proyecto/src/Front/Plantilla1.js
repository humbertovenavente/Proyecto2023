import React from 'react';

const Plantilla1 = () => {
  return (
    <div className="degradado-o d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded-5 text-secondary" style={{ maxWidth: '50rem', minHeight: '45rem' }}>
        <label className="text-center">Plantilla 1</label>
        <h1 className="text-center">*Título del artículo*</h1>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="col-md-6">
            <p className="my-1">
              Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un
              texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo.
              Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto
              de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto
              es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de
              ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es
              un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de
              ejemplo.
            </p>
          </div>
          <div className="col-md-6">
            <div className="border p-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg"
                alt="Pelota de fútbol"
                style={{ height: '15rem' }}
                className="img-fluid"
              />
              <p>Autor</p>
              <p>Año de publicación</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plantilla1;

