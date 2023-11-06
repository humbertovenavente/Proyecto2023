import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useAuth } from "./AuthContext";


var response;
var r_articles = [];
var sel_articles = [];

const MisArticulos = () => {
    
    const { isLoggedIn, l_user, logout, n_rol , l_rol} = useAuth();
    let navigate = useNavigate();


    const [articles, setArticles] = useState([]);
    const [s_articles, setS_articles] = useState([]);
    const [oper, setOper] = useState(0);
  
    const [omodalRed, setomodalRed] = useState(false);
    const handleCloseRed = () => {
    setomodalRed(false)
    };
  
    const l_isLoggedIn = localStorage.getItem('jcapp_logued')
    const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))
  
    useEffect(() => {
      //setOper(8);
      if (l_isLoggedIn && (l_l_rol === 5 || l_l_rol === 4)) {   
        //setOper(8)
        r_articles = [];
        leer10articulos();
      } else {
        setomodalRed(true)
        setTimeout(() => {
          return navigate('/')
        }, 2000);
      }
    
    }, [])
  
    // async function leer10articulos() {
    //   const response = await axios.get("http://localhost/proy/moderacion.php");
    //   r_articles = response.data;
    //   if (r_articles.length >= 1) {
    //     setArticles(r_articles);
    //   }
    // }

    async function leer10articulos() {
      // e.preventDefault();
      // setOper(9);
      // console.log(rol);
      try {
        // console.log(l_user);
        response = await axios.post("http://localhost/proy/misarticulos.php", {
          usuario: l_user
        });
        
        // console.log(response)
      } catch (error) {
        console.log(error);
      } finally {
        r_articles = response.data;
        if (r_articles.length >= 1) {
          setArticles(r_articles);
        }
       
        // console.log(response.data);
        // m_usuario = response.data
        // console.log(m_usuario.length);
        // console.log(m_usuario);
        // if (m_usuario.length >= 1) {
        //   setDatos(m_usuario);
        // }
        // m_usuario = response.data
        // setDatos(m_usuario);
        // setOper(0);
      }
    };
  
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

      return navigate(`/vermisarts/${sel_articles[0].id_articulo}`)
    };
  
    function regresar_a() {
      setOper(0);
    }
  

    const EditarArt = (id) => {
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

      return navigate(`/editarart/${sel_articles[0].id_articulo}`)
    };
    
  

    return(
        <div>
      <h3>
        Aqui podra ver sus articulos
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
                  <button
                    id="but"
                    onClick={() => EditarArt(article.id_articulo)}
                  >
                    Editar
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

      
{/* **Ventana Modal para Mensaje** */}
<Modal open={omodalRed} onClose={handleCloseRed} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                <div>
                    <span>No tienes autorizacion, redirigiendo al home</span>
                    <div className="spinner-border" role="status" />                            
                </div>
              </Box>
            </Modal>
            {/* **Ventana Modal para Responder** */}

    </div>
    );

}
export default MisArticulos;