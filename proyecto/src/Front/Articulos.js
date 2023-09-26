import React from 'react'

const Articulos = () => {
    return (

      <div>
      <h3>Bienvenidos al Home, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>

      <div className="card" style={{ width: '18rem' }}>
        <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    )
  }
   

export default Articulos
