import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import imgcatp1 from '../../src/media/catplantilla1.png';
import imgcatp2 from '../../src/media/catplantilla2.png';

var a_categoria = '';
var em_categoria = '';
var em_id_categoria = '';
var em_st_categoria = '';
var em_pr_categoria = '';
var em_plant = 0;
var r_categorias = [];
var imgplantilla;

const l_plant = [
  {id_pl : 1, n_pl : 'Plantilla 1'},    
  {id_pl : 2, n_pl : 'Plantilla 2'}
];

const Categoria = () => {

  
  let navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [oper, setOper] = useState(0);
  const [plant, setPlant] = useState(1);
  const [e_categoria, sete_categoria] = useState('');
  const [e_id_categoria, sete_id_categoria] = useState('');
  const [e_st_categoria, sete_st_categoria] = useState('');
  const [e_pr_categoria, sete_pr_categoria] = useState('');

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
    const response = await axios.get("http://localhost/proy/categorias.php")
    r_categorias = response.data
    if (r_categorias.length >= 1) {
      setDatos(r_categorias);
    }
    setOper(0);
  }

  const agregarCategoria = () => {
    em_categoria = '';
    sete_categoria(em_categoria)
    sete_st_categoria(e_pr_categoria)
    em_id_categoria = '';
    sete_id_categoria(em_id_categoria)
    em_st_categoria = '';
    sete_st_categoria(em_st_categoria)
    em_pr_categoria = '';
    sete_pr_categoria('')
    em_plant = 1;
    setPlant(em_plant)
    imgplantilla = imgcatp1
    setOper(1);
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (a_categoria === "") {
      alert("El Nombre de Categoría es Obligatorio");
    } else {
      setOper(9);
      try {
        const response = await axios.post("http://localhost/proy/crearcategoria.php", {
          categoria: a_categoria,
          premium : em_pr_categoria,
          plantilla: em_plant
        });

      } catch (error) {
        console.log("send data error");
      } finally {

        const response = await axios.get("http://localhost/proy/categorias.php")
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
      const response = await axios.post("http://localhost/proy/actualizacategoria.php", {
        categoria: em_id_categoria,
        ncategoria: em_categoria,
        scategoria: em_st_categoria,
        prcategoria: em_pr_categoria,
        plantilla: em_plant
      });
      // console.log(response)

    } catch (error) {
      console.log("send data error");
    } finally {

      const response = await axios.get("http://localhost/proy/categorias.php")
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
    em_pr_categoria = r_categorias[i].premium
    sete_pr_categoria(em_pr_categoria)
    em_plant = r_categorias[i].plantilla
    setPlant(em_plant)
    if (em_plant === '1') {
      imgplantilla = imgcatp1
    } else {
      imgplantilla = imgcatp2
    }
  };

  function cambiaActivo() {
    if (em_st_categoria === 'X') {
      em_st_categoria = ''
    } else {
      em_st_categoria = 'X'
    }
    sete_st_categoria(em_st_categoria)
  }

  function cambiaPremium() {
    if (em_pr_categoria === 'X') {
      em_pr_categoria = ''
    } else {
      em_pr_categoria = 'X'
    }
    sete_pr_categoria(em_pr_categoria)
  }

  function regresar() {
    em_id_categoria = ''

    sete_id_categoria(em_id_categoria)
    em_categoria = ''
    sete_categoria(em_categoria)
    em_st_categoria = ''
    sete_st_categoria(em_st_categoria)
    em_pr_categoria = ''
    sete_pr_categoria(em_pr_categoria)
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
        case "e_pr_categoria":
        em_pr_categoria = valor
        sete_categoria(em_pr_categoria)
        break;
        case "e_plantilla":
          em_plant = valor
          setPlant(em_plant)
          console.log(em_plant)
          if (em_plant === '1') {
            imgplantilla = imgcatp1
          } else {
            imgplantilla = imgcatp2
          }
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
                <th>Premium</th>
                <th>Plantilla</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id_categoria}>
                  <td className='oculto'>{dato.id_categoria}</td>
                  <td>{dato.nombre_categoria}</td>
                  <td>{dato.activo}</td>
                  <td>{dato.premium}</td>
                  <td>{dato.plantilla}</td>
                  <td><button id='but' onClick={() => editarCategoria(dato.id_categoria)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={agregarCategoria}>Agregar Categoria</button>          
        </div>
      ) : oper === 1 ? (
        <div style={{ padding: "10px", marginRight: "5px"}}>
          <label>Agregar</label>
          <br/>
          <label className="form-label">Categoría</label>
          <input type="text" onChange={(e) => handleInputChange(e, "a_categoria")} id="a_categoria" placeholder='Categoría' />
          <br/>
          <label className="form-label">Premium</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_pr_categoria")} id="e_pr_categoria" value={e_pr_categoria} />
          <button onClick={cambiaPremium}>Cambiar A Premium</button>

          <br/>
          <label className="form-label">Plantilla para Mostrar Art. x Categoría</label>
          <select id="plant" name="plant" value={plant} onChange={(e) => handleInputChange(e, "e_plantilla")} required> 
              {l_plant.map( (dato) => ( <option value={dato.id_pl} key={dato.id_pl}>{dato.n_pl}</option> ) )} 
          </select>
          <br/>
          <img src={imgplantilla} alt="..." className='d-block' style={{ height: "12rem" }} />
          <br/>
          <button onClick={guardarCategoria}>Guardar</button>
          <button onClick={regresar_a}>Regresar</button>
        </div>
      ) : oper === 2 ? (
        <div style={{ padding: "10px", marginRight: "5px"}}>
          <label>Edición de Categoría</label>
          <br/>
          <input type="text" onChange={(e) => handleInputChange(e, "e_id_categoria")} id="e_id_categoria" value={e_id_categoria} className='oculto'/>
          <label className="form-label">Categoría</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_categoria")} value={e_categoria} id="e_categoria" placeholder='Categoría' />
          <br/>
          <label className="form-label">Activo</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_st_categoria")} id="e_st_categoria" value={e_st_categoria} />
          <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
          <br/>

          <label className="form-label">Premium</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_pr_categoria")} id="e_pr_categoria" value={e_pr_categoria} />
          <button onClick={cambiaPremium}>Cambiar A Premium</button>
          <br/>
          <label className="form-label">Plantilla para Mostrar Art. x Categoría</label>
          <select id="plant" name="plant" value={plant} onChange={(e) => handleInputChange(e, "e_plantilla")} required> 
              {l_plant.map( (dato) => ( <option value={dato.id_pl} key={dato.id_pl}>{dato.n_pl}</option> ) )} 
          </select>
          <br/>
          <img src={imgplantilla} alt="..." className='d-block' style={{ height: "12rem" }} />
          <br/>

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