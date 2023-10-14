import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

var r_articles = [];
var sel_articles = [];

const Moderar = () => {
  
  let navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [s_articles, setS_articles] = useState([]);
  const [oper, setOper] = useState(0);

  useEffect(() => {
    r_articles = [];
    leer10articulos();
    setOper(0);
  }, []);

  async function leer10articulos() {
    const response = await axios.get("http://gregserver/apisP/moderacion.php");
    r_articles = response.data;
    if (r_articles.length >= 1) {
      setArticles(r_articles);
    }
  }

  const verDetalle = (id) => {
    // console.log(id)
    setOper(1);
    var i = 0;
    var found = false;
    sel_articles = [];
    for (i = 0; i < r_articles.length && !found; i++) {
      if (r_articles[i].id_articulo === id) {
        found = true;
        break;
      }
    }
    sel_articles[0] = r_articles[i];
    setS_articles(sel_articles);
  };

  function regresar_a() {
    setOper(0);
  }

  const publicarArticulo = async (id) => {
    // const publicarArticulo = async (e) => {
    // e.preventDefault();
    setOper(9);
    console.log(id);
    try {
      const response = await axios.post("http://gregserver/apisP/publicararticulo.php", {
        id_articulo : id
      });
      // console.log(response)

    } catch (error) {
      console.log(error);
    } finally {

      // const response = await axios.get("http://gregserver/apisP/categorias.php")
      // r_categorias = response.data
      // if (r_categorias.length >= 1) {
      //   setDatos(r_categorias);
      // }
      setOper(1);
    }
  };

  // function publicarArticulo() {
  //   if (em_st_categoria === 'X') {
  //     em_st_categoria = ''
  //   } else {
  //     em_st_categoria = 'X'
  //   }
  //   sete_st_categoria(em_st_categoria)
  // }

  function rechazarArticulo() {
    // return navigate('/moderar')
    setOper(0);
  }


  return (
    <div>
      <h3>
        Bienvenidos al Home, en esta parte se mostrarán los artículos que hayan
        sido publicados recientemente
      </h3>

      {oper === 0 ? (
        <div>
          <h3
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            10 Últimos Artículos
          </h3>

          <div
            className="card-container"
            style={{
              display: "flex",
              columnGap: "2.5rem",
              rowGap: "2.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                className="card"
                style={{ minWidth: "15rem", width: "30%" }}
              >
                <div className="card-footer">
                  <img
                    src={article.image}
                    className="card-img-top"
                    alt={article.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{article.titulo_articulo}</h5>
                  <p className="card-text oculto">{article.id_articulo}</p>
                  <p className="card-text">
                    Description: {article.contenido_articulo}
                  </p>
                  <p className="card-text">
                    Category: {article.nombre_categoria}
                  </p>
                  <p className="card-text">
                    Subcategory: {article.nombre_subcategoria}
                  </p>
                </div>
                <div className="card-footer mx-auto">
                  <button
                    id="but"
                    onClick={() => verDetalle(article.id_articulo)}
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : oper === 1 ? (
        <div>
          <button onClick={regresar_a}>Regresar a la Lista</button>
          <div className="d-flex justify-content-center align-items-center">
            {s_articles.map((sarticle, index2) => (
              <div key={index2} className="bg-white p-4">
                <h1 className="text-center">{sarticle.titulo_articulo}</h1>
                <section className="container">
                  <div className="row">
                    <div className="col-md-4 d-flex">
                      <div className="bg-primary p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white">
                        {" "}
                        {/* Cuadro azul */}
                        <p className="text-center fs-4">
                          {sarticle.contenido_articulo}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex">
                      <div className="bg-success p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white">
                        {" "}
                        {/* Cuadro verde */}
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg"
                          alt="Pelota de fútbol"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-4 d-flex">
                      <div className="bg-warning p-3 w-100 d-flex flex-column">
                        {" "}
                        {/* Cuadro amarillo */}
                        <label className="fs-5 fw-bold">Categoría</label>
                        <p className="fw-bold" style={{ marginLeft: "1em" }}>
                          {sarticle.nombre_categoria}
                        </p>
                        <label className="fs-5 fw-bold">SubCategoría</label>
                        <p className="fw-bold" style={{ marginLeft: "1em" }}>
                          {sarticle.nombre_subcategoria}
                        </p>
                        <label className="fs-5 fw-bold">
                          Fecha Publicación
                        </label>
                        <p className="fw-bold" style={{ marginLeft: "1em" }}>
                          {sarticle.fecha_publicacion}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <div>
                  <button onClick={() => publicarArticulo(sarticle.id_articulo)}>Publicar</button>
                  <button onClick={() => rechazarArticulo(sarticle.id_articulo)}>Rechazar</button>
                </div>
              </div>
            ))}
          </div>

          
        </div>
        ) : oper === 1 ? (
          <div>
            <p>Publicando Articulo</p>
          </div>
      ) : (
        <p></p>
      )}

      
    </div>
  );
};

export default Moderar;