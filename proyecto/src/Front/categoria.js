import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

var a_categoria = '';
var em_categoria = '';
var em_id_categoria = '';
var em_st_categoria = '';
var r_categorias = [];

const Categoria = () => {

  
  let navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [oper, setOper] = useState(0);
  const [e_categoria, sete_categoria] = useState('');
  const [e_id_categoria, sete_id_categoria] = useState('');
  const [e_st_categoria, sete_st_categoria] = useState('');

  const [omodalRed, setomodalRed] = useState(false);
  const handleCloseRed = () => {
    setomodalRed(false)
  };

  const l_isLoggedIn = localStorage.getItem('jcapp_logued')
  const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

  useEffect(() => {
    setOper(7);
    if (l_isLoggedIn && l_l_rol === 5) {   
      setOper(8)
      leercategorias()    
    } else {
      setomodalRed(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);
    }

  }, [])

  async function leercategorias() {
    const response = await axios.get("http://gregserver/apisP/categorias.php")
    r_categorias = response.data
    if (r_categorias.length >= 1) {
      setDatos(r_categorias);
    }
    setOper(0);
  }

  const agregarCategoria = () => {
    setOper(1);
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (a_categoria === "") {
      alert("El Nombre de Categoría es Obligatorio");
    } else {
      setOper(9);
      try {
        const response = await axios.post("http://gregserver/apisP/crearcategoria.php", {
          categoria: a_categoria
        });

      } catch (error) {
        console.log("send data error");
      } finally {

        const response = await axios.get("http://gregserver/apisP/categorias.php")
        r_categorias = response.data
        if (r_categorias.length >= 1) {
          setDatos(r_categorias);
        }
        a_categoria = ""
        setOper(0);
      }
    }
  };

  const actualizarCategoria = async (e) => {
    e.preventDefault();
    setOper(9);
    try {
      const response = await axios.post("http://gregserver/apisP/actualizacategoria.php", {
        categoria: em_id_categoria,
        ncategoria: em_categoria,
        scategoria: em_st_categoria
      });
      // console.log(response)

    } catch (error) {
      console.log("send data error");
    } finally {

      const response = await axios.get("http://gregserver/apisP/categorias.php")
      r_categorias = response.data
      if (r_categorias.length >= 1) {
        setDatos(r_categorias);
      }
      setOper(0);
    }
  };

  const editarCategoria = (id) => {

    setOper(2)
    var i = 0
    var found = false;
    for (i = 0; i < r_categorias.length && !found; i++) {
      if (r_categorias[i].id_categoria === id) {
        found = true;
        break;
      }
    }
    em_id_categoria = r_categorias[i].id_categoria
    sete_id_categoria(em_id_categoria)
    em_categoria = r_categorias[i].nombre_categoria
    sete_categoria(em_categoria)
    em_st_categoria = r_categorias[i].activo
    sete_st_categoria(em_st_categoria)
  };

  function cambiaActivo() {
    if (em_st_categoria === 'X') {
      em_st_categoria = ''
    } else {
      em_st_categoria = 'X'
    }
    sete_st_categoria(em_st_categoria)
  }

  function regresar() {
    em_id_categoria = ''
    sete_id_categoria(em_id_categoria)
    em_categoria = ''
    sete_categoria(em_categoria)
    em_st_categoria = ''
    sete_st_categoria(em_st_categoria)
    setOper(0);
  }

  function regresar_a() {
    a_categoria = ''
    setOper(0);
  }

  const handleInputChange = (e, type) => {
    const valor = e.target.value;
    switch (type) {
      case "a_categoria":
        a_categoria = valor
        break;
      case "e_categoria":
        em_categoria = valor
        sete_categoria(em_categoria)
        break;
      case "e_id_categoria":
        em_id_categoria = valor
        sete_categoria(em_id_categoria)
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
                <th className='oculto'>ID</th>
                <th>Categoría</th>
                <th>Activo</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id_categoria}>
                  <td className='oculto'>{dato.id_categoria}</td>
                  <td>{dato.nombre_categoria}</td>
                  <td>{dato.activo}</td>
                  <td><button id='but' onClick={() => editarCategoria(dato.id_categoria)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={agregarCategoria}>Agregar Categoria</button>          
        </div>
      ) : oper === 1 ? (
        <div>
          <label>Agregar</label>
          <label className="form-label">Categoría</label>
          <input type="text" onChange={(e) => handleInputChange(e, "a_categoria")} id="a_categoria" placeholder='Categoría' />
          <button onClick={guardarCategoria}>Guardar</button>
          <button onClick={regresar_a}>Regresar</button>
        </div>
      ) : oper === 2 ? (
        <div>
          <label>Edición de Categoría</label>
          <br/><br/>
          <input type="text" onChange={(e) => handleInputChange(e, "e_id_categoria")} id="e_id_categoria" value={e_id_categoria} className='oculto'/>
          <label className="form-label">Categoría</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_categoria")} value={e_categoria} id="e_categoria" placeholder='Categoría' />
          <label className="form-label">Activo</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_st_categoria")} id="e_st_categoria" value={e_st_categoria} />
          <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
          <br/><br/>
          <button onClick={actualizarCategoria}>Grabar Datos</button>
          <button onClick={regresar}>Regresar</button>
        </div>
      ) : oper === 7 ? (
        <div>
          <p></p>
          {/* <span>No está logueado, redirigiendo al Home...</span>
          <div className="spinner-border" role="status" /> */}
        </div>
      ) : oper === 8 ? (
        <div>
          <span>Leyendo Categorias, espere..</span>
          <div className="spinner-border" role="status" />
        </div>
      ) : oper === 9 ? (
        <div>
          <span>Actualizando Categoria, espere..</span>
          <div className="spinner-border" role="status" />
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

    </div>
  );
}

export default Categoria;