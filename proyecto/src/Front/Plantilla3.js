import React from 'react';

const Plantilla3 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-4"> {/* Cuadro blanco alrededor de todo el contenido */}
        <label className="text-center">Esta es la plantilla 3</label>

        <h1 className="text-center">*Título del artículo*</h1>

        <section className="container">
          <div className="row">
            <div className="col-md-4 d-flex">
              <div className="bg-primary p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> {/* Cuadro azul */}
                <p className="text-center">
                  Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un
                  texto de ejemplo.
                </p>
              </div>
            </div>

            <div className="col-md-4 d-flex">
              <div className="bg-success p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> {/* Cuadro verde */}
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg"
                  alt="Pelota de fútbol"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>

            <div className="col-md-4 d-flex">
              <div className="bg-warning p-3 w-100 d-flex flex-column align-items-center justify-content-center"> {/* Cuadro amarillo */}
                <p className="text-center">
                  Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un
                  texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de
                  ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo.
                  Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un
                  texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de
                  ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo. Esto es un texto de ejemplo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Plantilla3;



