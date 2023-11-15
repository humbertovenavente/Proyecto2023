import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { ConstructionOutlined } from '@mui/icons-material';

var a_anuncio = '';
var em_anuncio = '';
var em_id_anuncio = '';
var em_id_comentario = '';
var em_st_anuncio = '';
var em_st_rolanuncio = '';
var r_comentarios = [];

var l_l_username = "";

var r_articles = [];
var sel_articles = [];

var response;


const Comentarios = () => {

    let navigate = useNavigate();
    const [rol, setRol] = useState('');
    const [omodalCensurar, setomodalCensurar] = useState(false);
    const [omodalDescensurar, setomodalDescensurar] = useState(false);
    const [omodalIgnorar, setomodalIgnorar] = useState(false);
  
    const [s_articles, setS_articles] = useState([]);
    const [articles, setArticles] = useState([]);
  
    const [datos, setDatos] = useState([]);
    const [oper, setOper] = useState(0);
    const [e_anuncio, sete_anuncio] = useState('');
    const [e_id_anuncio, sete_id_anuncio] = useState('');
    const [e_id_comentario, sete_id_comentario] = useState('');
    const [e_st_anuncio, sete_st_anuncio] = useState('');
    const [e_st_rolanuncio, sete_st_rolanuncio] = useState('');
  
    const [titulo_anuncio, setTitulo_anuncio] = useState("");
    const [detalle_anuncio, setDetalle_anuncio] = useState("");
    const [url_anuncio, setUrl_anuncio] = useState("");
    const [url_imagen, setUrl_imagen] = useState("");
  
    const [omodalRed, setomodalRed] = useState(false);
    const handleCloseRed = () => {
      setomodalRed(false)
    };
  
    const l_isLoggedIn = localStorage.getItem('jcapp_logued')
    const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))
    l_l_username = localStorage.getItem('jcapp_username')
  
    useEffect(() => {
      if (l_isLoggedIn && l_l_rol === 5) {
        //setOper(8)
        // r_articles = [];
        // comentariosTitulo()
        leercomentarios()
      } else {
        setomodalRed(true)
        setTimeout(() => {
          return navigate('/')
        }, 2000);
      }
    }, [])
  
    async function leercomentarios() {
      setDatos([]);
      const response = await axios.get("http://localhost/proy/comentarios.php")
      r_comentarios = response.data
      console.log(r_comentarios);
      if (r_comentarios.length >= 1) {
        setDatos(r_comentarios);
      }
      setOper(0);
    }
  
const censurarComentario = async (e) => {
      // e.preventDefault();
      try {
        // console.log(r_comentarios[0].id_comentario);
        const response = await axios.post("http://localhost/proy/censurarcomentario.php",
          {
            id_comentario: e
          }
        );
        console.log(response.data);
        // console.log("post1");
      } catch (error) {
        console.log(error);
      } finally {
        leercomentarios()
        setomodalCensurar(true)
        setTimeout(() => {
          setOper(0);
          setomodalCensurar(false)
          return navigate('/comentarios')
        }, 2000);
  
      }
    };
    const descensurarComentario = async (e) => {
      // e.preventDefault();
      try {
        // console.log(r_comentarios[0].id_comentario);
        const response = await axios.post("http://localhost/proy/descensurarcomentario.php",
          {
            id_comentario: e
          }
        );
        console.log(response.data);
        // console.log("post1");
      } catch (error) {
        console.log(error);
      } finally {
        leercomentarios()
        setomodalDescensurar(true)
        setTimeout(() => {
          setOper(0);
          setomodalDescensurar(false)
          return navigate('/comentarios')
        }, 2000);
  
      }
    };
    const ignorarComentario = async (e , e_id_art , e_nod_pad , e_nodo , e_nivel) => {
      // e.preventDefault();
  
      try {
        // console.log(r_comentarios[0].id_comentario);
        const response = await axios.post("http://localhost/proy/ignorarcomentario.php",
          {
            id_comentario: e,
            e_id_art : e_id_art,
            e_nod_pad : e_nod_pad,
            e_nodo : e_nodo,
            e_nivel : e_nivel
          }
        );
        console.log(response.data);
        // console.log("post1");
      } catch (error) {
        console.log(error);
      } finally {
        leercomentarios()
        setomodalIgnorar(true)
        setTimeout(() => {
          setOper(0);
          setomodalIgnorar(false)
          return navigate('/comentarios')
        }, 2000);
  
      }
    };
  
    const verDetalle = (id) => {
      // console.log(id)
      // setOper(1);
      var i = 0;
      var found = false;
      sel_articles = [];
      for (i = 0; i < r_comentarios.length && !found; i++) {
        if (r_comentarios[i].id_articulo === id) {
          found = true;
          break;
        }
      }
      sel_articles[0] = r_comentarios[i];
      // setS_articles(sel_articles);
  
      return navigate(`/articulo/${sel_articles[0].id_articulo}`)
    };


  
    const handleInputChange = (e, type) => {
      const valor = e.target.value;
      switch (type) {
        case "a_anuncio":
          a_anuncio = valor
          break;
        case "e_anuncio":
          em_anuncio = valor
          sete_anuncio(em_anuncio)
          break;
        case "e_st_rolanuncio":
          em_st_rolanuncio = valor
          sete_st_rolanuncio(em_st_rolanuncio)
          break;
        default:
      }
    }

    

  return (
    <div>
      {oper === 0 ? (
        <div>
          <table className="table" id="tabla">
            <thead>
              <tr>
                {/* <th>ID Anuncio</th> */}
                <th>Articulo</th>
                <th>Comentario</th>
                <th>Detalle</th>
                <th>Username</th>
                <th>Numero de reportes</th>
                <th>Status del comentario</th>
                <th>Autocensura</th>
                <th>&nbsp;</th>
                <th>Opciones</th>
                <th>&nbsp;</th>
                {/* <th>URL Anuncio</th> */}
                {/* <th>URL Imagen</th> */}
                {/* <th>Seleccionar</th> */}
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id_comentario}>
                  {/* <td>{dato.id_anuncio}</td> */}
                  {/* {console.log(dato.titulo_articulo)} */}
                  <td>{dato.titulo_articulo}</td>
                  <td>{dato.comentario}</td>
                  <td><button  id='but' onClick={() => verDetalle(dato.id_articulo)} >Ver Detalle</button></td>
                  <td>{dato.username}</td>
                  <td>{dato.n_reportes}</td>
                  {dato.status === '0' ? (
                    <td>No censurado</td>
                  ): (
                    <td>Censurado</td>
                  )}
                  
                  <td>{dato.autocensura}</td>
                  {/* <td>{dato.url_anuncio}</td> */}
                  {/* <td>{dato.url_imagen}</td> */}
                  <td><button  id='but' onClick={() => censurarComentario(dato.id_comentario)}>Censurar</button></td>
                  <td><button  id='but' onClick={() => descensurarComentario(dato.id_comentario)}>Descensurar</button></td>
                  <td><button  id='but' onClick={() => ignorarComentario(dato.id_comentario , dato.id_articulo , dato.nodo_padre , dato.nodo , dato.nivel)}>Ignorar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          

        </div>
      ) : (<p></p>)}

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


      <Modal open={omodalCensurar} onClose={censurarComentario} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Comentario censurado correctamente, redirigiendo...</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>

      <Modal open={omodalDescensurar} onClose={descensurarComentario} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Comentario descensurado correctamente, redirigiendo...</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>

      <Modal open={omodalIgnorar} onClose={ignorarComentario} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Comentario ignorado correctamente, redirigiendo...</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>

    </div>
  )
}

export default Comentarios
