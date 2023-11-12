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
var l_isLoggedIn = "";
var l_l_rol = 0;
var l_l_username = "";

const MisArticulos = () => {

  const { isLoggedIn, l_user, logout, n_rol, l_rol } = useAuth();
  let navigate = useNavigate();


  const [articles, setArticles] = useState([]);
  const [s_articles, setS_articles] = useState([]);
  const [oper, setOper] = useState(0);

  const [omodalRed, setomodalRed] = useState(false);
  const handleCloseRed = () => {
    setomodalRed(false)
  };

  l_isLoggedIn = localStorage.getItem('jcapp_logued')
  l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))
  l_l_username = localStorage.getItem('jcapp_username')

  useEffect(() => {
    //setOper(8);
    if (l_isLoggedIn && (l_l_rol === 5 || l_l_rol === 4 || l_l_rol === 3)) {
      //setOper(8)
      r_articles = [];
      leermisarticulos();
    } else {
      setomodalRed(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);
    }

  }, [])

  async function leermisarticulos() {
    try {
      response = await axios.post("http://localhost/proy/misarticulos.php", {
        usuario: l_l_username
      });
    } catch (error) {
      console.log(error);
    } finally {
      r_articles = response.data;
      if (r_articles.length >= 1) {
        setArticles(r_articles);
      }
    }
  };

  const verDetalle = (id) => {
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

  const EditarArt = (id) => {
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

  return (
    <div>
      <h3>
        Aqui podra ver sus articulos
      </h3>

      {oper === 0 ? (
        <div>
          <div className="card-container"
            style={{ display: "flex", columnGap: "2.5rem", rowGap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }} >
            {articles.map((article, index) => (
              <div key={index} className="card" style={{ minWidth: "15rem", width: "30%" }} >

                { article.status === '0' ? (
                  <div className="card-footer" style={{ backgroundColor: "yellow" }}>Por Moderar</div>
                ) : article.status === '1' ? (
                  <div className="card-footer" style={{ backgroundColor: "lightgreen" }}>Publicado</div>
                ) : (
                  <div className="card-footer" style={{ backgroundColor: "lightpink" }}>Rechazado</div>
                )}

                <div className="card-body">
                  <p className="card-text oculto">{article.id_articulo}</p>
                  <h5 className="card-title">{article.titulo_articulo}</h5>
                  <p className="card-text">
                    <b>Description:</b> {article.contenido_articulo.substring(0,50)}....
                  </p>
                  <p className="card-text">
                    <b>Category:</b> {article.nombre_categoria}
                  </p>
                  <p className="card-text">
                    <b>Subcategory:</b> {article.nombre_subcategoria}
                  </p>
                </div>
                <div className="card-footer mx-auto">
                  <button id="but" onClick={() => verDetalle(article.id_articulo)} >Ver Detalle</button>
                  <button id="but2" onClick={() => EditarArt(article.id_articulo)} >Editar</button>
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