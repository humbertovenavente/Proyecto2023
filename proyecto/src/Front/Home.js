import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {

  
  useEffect(() => { articles()}, [])

  const [data, setData] = useState ([]);

  async function articles() {

    const info = await axios.get("http://localhost/apisP/articulos.php")

    setData(info.data);

  }
  return (
    <div>
      <h3>Bienvenidos al Home, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>

      {data.map(function(article) {
    return (
      <div>
        <div>{article.titulo_articulo}</div>
        <div></div>
      </div>
   )
})}

      <div style={{ display: "flex", columnGap: "2.5rem", rowGap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>

        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div>
        <div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>
        </div><div className="card" style={{ width: '15rem' }}>
          <img src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg" className="card-img-top" alt="Pelota de fútbol" />
          <div className="card-body">
            <h5 className="card-title">Pelota de futbol</h5>
            <p className="card-text">Es utilizada para jugar al futbol 11, 7 o 5.</p>
            <a href="#" className="btn btn-primary">Entrar al articulo</a>
          </div>

        </div>

      </div>



    </div>
  );
  }

export default Home
