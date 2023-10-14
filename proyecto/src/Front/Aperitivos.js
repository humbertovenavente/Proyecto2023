import React from 'react';
import './plantilla.css'; 

const Aperitivos = () => {
  return (
    <div className="container">
      <h3 className="text-center my-5">Bienvenidos a APERITIVOS</h3>
      
      <div id="carouselExampleIndicators" className="carousel slide mb-5">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://picsum.photos/1920/500" className="d-block w-100" alt="Imagen 1"/>
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1920/500" className="d-block w-100" alt="Imagen 2"/>
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1920/500" className="d-block w-100" alt="Imagen 3"/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section>
        <h2 className="text-center m-5">Aperitivos</h2>
        <div className="row us mb-5">
          <div className="col-md-5">
            <img className="img-fluid rounded shadow" src="https://picsum.photos/800/300" alt="Artículo" />
          </div>
          <div className="col-md-7">
            <p className="lead">Titulo del articulo</p>
            <p>Descripcion</p>
            <button className="btn btn-primary">Leer más</button>
          </div>
        </div>

        <div className="row us mt-5">
          <div className="col-md-7 order-md-2">
            <p className="lead">Titulo del articulo</p>
            <p>Descripcion</p>
            <button className="btn btn-secondary">Leer más</button>
          </div>
          <div className="col-md-5 order-md-1">
            <img className="img-fluid rounded shadow" src="https://picsum.photos/800/300" alt="Artículo 2" />
          </div>
        </div>

        

        <div className="row us mt-5">
          <div className="col-md-7 order-md-2">
            <p className="lead">Titulo del articulo</p>
            <p>Descripcion</p>
            <button className="btn btn-secondary">Leer más</button>
          </div>
          <div className="col-md-5 order-md-1">
            <img className="img-fluid rounded shadow" src="https://picsum.photos/800/300" alt="Artículo 2" />
          </div>
        </div>

        

        <div className="row us mt-5">
          <div className="col-md-7 order-md-2">
            <p className="lead">Titulo del articulo</p>
            <p>Descripcion</p>
            <button className="btn btn-secondary">Leer más</button>
          </div>
          <div className="col-md-5 order-md-1">
            <img className="img-fluid rounded shadow" src="https://picsum.photos/800/300" alt="Artículo 2" />
          </div>
        </div>

        

        <div className="row us mt-5">
          <div className="col-md-7 order-md-2">
            <p className="lead">Titulo del articulo</p>
            <p>Descripcion</p>
            <button className="btn btn-secondary">Leer más</button>
          </div>
          <div className="col-md-5 order-md-1">
            <img className="img-fluid rounded shadow" src="https://picsum.photos/800/300" alt="Artículo 2" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default Aperitivos;

