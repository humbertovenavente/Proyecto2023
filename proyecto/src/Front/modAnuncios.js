import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
// import { useAuth } from './AuthContext';

var a_anuncio = '';
var em_anuncio = '';
var em_id_anuncio = '';
var em_st_anuncio = '';
var em_st_rolanuncio = '';
var r_anuncio = [];

const roles = [
  {id_rol : 1, n_rol : 'Usuario'},    
  {id_rol : 2, n_rol : 'Suscriptor'},
  {id_rol : 3, n_rol : 'Autor'},
  {id_rol : 4, n_rol : 'Moderador'},
  {id_rol : 5, n_rol : 'Administrador'},
];
var m_rolAct = ""

const ModAnuncios = () => {


  
  let navigate = useNavigate();
  // const { isLoggedIn, l_user, l_rol } = useAuth();
  const [rol, setRol] = useState('');
  const [omodalPubli, setomodalPubli] = useState(false);

  function changerol(e) {
    setRol(e.target.value)
    console.log(e.target.value)
}
  // const [inputValue, setInputValue] = useState(''); // Inicializa el valor del cuadro de texto como una cadena vacía

  // const handleInput = (event) => {
  //   let value = event.target.value;

  //   // Si el valor no es un número del 1 al 5, elimina cualquier carácter adicional
  //   if (!/^[1-5]$/.test(value)) {
  //     value = value.replace(/[^1-5]/g, '');
  //   }

  //   setInputValue(value);
  //   // {value={inputValue} onInput={handleInput}}
  // }


  const [datos, setDatos] = useState([]);
  const [oper, setOper] = useState(0);
  const [e_anuncio, sete_anuncio] = useState('');
  const [e_id_anuncio, sete_id_anuncio] = useState('');
  const [e_st_anuncio, sete_st_anuncio] = useState('');
  const [e_st_rolanuncio, sete_st_rolanuncio] = useState('');

  const [titulo_anuncio, setTitulo_anuncio] = useState("");
  const [detalle_anuncio, setDetalle_anuncio] = useState("");
  const [url_anuncio, setUrl_anuncio] = useState("");
  const [url_imagen, setUrl_imagen] = useState("");

  // const [e_rol_usuario, sete_rol_usuario] = useState('');

  const [omodalRed, setomodalRed] = useState(false);
  const handleCloseRed = () => {
  setomodalRed(false)
  };

  const l_isLoggedIn = localStorage.getItem('jcapp_logued')
  const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

  useEffect(() => {
  //setOper(8);
  if (l_isLoggedIn && l_l_rol === 5) {   
    //setOper(8)
    leeranuncios()
  } else {
    setomodalRed(true)
    setTimeout(() => {
      return navigate('/')
    }, 2000);
  }

}, [])

  async function leeranuncios() {
    const response = await axios.get("http://localhost/proy/anuncios.php")
    r_anuncio = response.data
    console.log(response);
    if (r_anuncio.length >= 1) {
      setDatos(r_anuncio);
    }
    setOper(0);
  }


  const actualizarAnuncio = async (e) => {
    e.preventDefault();
    setOper(9);
    console.log(em_id_anuncio);
    console.log(em_st_rolanuncio);
    try {
      const response = await axios.post("http://localhost/proy/actualizaranuncios.php", {
        id_anuncio: em_id_anuncio,
        estadoAnuncio: em_st_rolanuncio,
        
      });
      // console.log(response)

    } catch (error) {
      console.log("send data error");
    } finally {

      const response = await axios.get("http://localhost/proy/anuncios.php")
      r_anuncio = response.data
      if (r_anuncio.length >= 1) {
        setDatos(r_anuncio);
      }
      setOper(0);
    }
  };

  const editarAnuncio = (id) => {

    setOper(2)
    var i = 0
    var found = false;
    for (i = 0; i < r_anuncio.length && !found; i++) {
      if (r_anuncio[i].id_anuncio === id) {
        found = true;
        break;
      }
    }
    em_id_anuncio = r_anuncio[i].id_anuncio
    sete_id_anuncio(em_id_anuncio)
    em_anuncio = r_anuncio[i].titulo_anuncio
    sete_anuncio(em_anuncio)
    em_st_anuncio = r_anuncio[i].detalle_anuncio
    sete_st_anuncio(em_st_anuncio)
    em_st_rolanuncio = r_anuncio[i].activo
    setRol(r_anuncio[i].rol)
  };

  function cambiaActivo() {
    if (em_st_rolanuncio === 'X') {
        em_st_rolanuncio = ''
    } else {
        em_st_rolanuncio = 'X'
    }
    sete_st_anuncio(em_st_rolanuncio)
  }

  // function cambiaRol() {
  //   if (em_st_rolusuario === 'X') {
  //     em_st_rolusuario = ''
  //   } else {
  //     em_st_rolusuario = 'X'
  //   }
  //   sete_st_rolusuario(em_st_rolusuario)
  // }

  function regresar() {
    em_id_anuncio = ''
    sete_id_anuncio(em_id_anuncio)
    em_anuncio = ''
    sete_anuncio(em_anuncio)
    em_st_anuncio = ''
    sete_st_anuncio(em_st_anuncio)
    setOper(0);
  }

  const agregarAnuncio = () => {
    setOper(1);
  };
//   const guardarAnuncio = async (e) => {
//     e.preventDefault();

//     if (a_anuncio === "") {
//       alert("El Nombre de Categoría es Obligatorio");
//     } else {
//       setOper(9);
//       try {
//         const response = await axios.post("http://localhost/proy/crearcategoria.php", {
//           categoria: a_anuncio
//         });

//       } catch (error) {
//         console.log("send data error");
//       } finally {

//         const response = await axios.get("http://localhost/proy/anuncios.php")
//         r_anuncio = response.data
//         if (r_anuncio.length >= 1) {
//           setDatos(r_anuncio);
//         }
//         a_anuncio = ""
//         setOper(0);
//       }
//     }
//   };

  const guardarAnuncio = async (e) => {
    e.preventDefault();
    try {
      // console.log("post1");
      const response = await axios.post("http://localhost/proy/guardaranuncio.php",
        {
          titulo_anuncio: titulo_anuncio,
          detalle_anuncio: detalle_anuncio,
          url_anuncio: url_anuncio,
          url_imagen: url_imagen,
        }
      );
      console.log(response.data);
      // console.log("post1");
    } catch (error) {
      console.log(error);
    } finally {

      setomodalPubli(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);


      //const response = await axios.get("http://localhost/proy/anuncios.php")
//         r_anuncio = response.data
//         if (r_anuncio.length >= 1) {
//           setDatos(r_anuncio);
//         }
//         a_anuncio = ""
//         setOper(0);
    }
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

  // const handleInput = (event) => {
  //   let inputValue = event.target.value;

  //   // Asegurarse de que solo haya un carácter en la entrada
  //   if (inputValue.length > 1) {
  //     inputValue = inputValue.substring(0, 1);
  //   }

  //   // Verificar si la entrada es un número entre 1 y 5
  //   if (/^[1-5]$/.test(inputValue)) {
  //     // this.setState({ inputValue });
  //     sete_st_rolusuario({ inputValue });
  //   }
  // }

  return (
<div>
      {oper === 0 ? (
        <div>
          <table className="table" id="tabla">
            <thead>
              <tr>
                {/* <th>ID Anuncio</th> */}
                <th>Titulo Anuncio</th>
                <th>Detalle Anuncio</th>
                <th>Activo</th>
                <th>URL Anuncio</th>
                <th>URL Imagen</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id_anuncio}>
                  {/* <td>{dato.id_anuncio}</td> */}
                  <td>{dato.titulo_anuncio}</td>
                  <td>{dato.detalle_anuncio}</td>
                  <td>{dato.activo}</td>
                  <td>{dato.url_anuncio}</td>
                  <td>{dato.url_imagen}</td>
                  <td><button id='but' onClick={() => editarAnuncio(dato.id_anuncio)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={agregarAnuncio}>Agregar Anuncio</button>  
                   
        </div>
     ) : oper === 1 ? (
        // <div>
        //   <label>Agregar</label>
        //   <label className="form-label">Anuncio</label>
        //   <input type="text" onChange={(e) => handleInputChange(e, "a_categoria")} id="a_categoria" placeholder='Categoría' />
        //   <button onClick={guardarAnuncio}>Guardar</button>
        //   <button onClick={regresar}>Regresar</button>
        // </div>
        <form onSubmit={guardarAnuncio}>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese el titulo del anuncio</label>
          <input type="text" id="titulo_anuncio" name="titulo_anuncio" value={titulo_anuncio} onChange={(e) => setTitulo_anuncio(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese el detalle del anuncio</label>
          <input type="text" id="detalle_anuncio" name="detalle_anuncio" value={detalle_anuncio} onChange={(e) => setDetalle_anuncio(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese URL del anuncio</label>
          <input type="text" id="url_anuncio" name="url_anuncio" value={url_anuncio} onChange={(e) => setUrl_anuncio(e.target.value)} className="w-50" required />
        </div>


        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la imagen</label>
          <input type="text" id="url_imagen" name="url_imagen" value={url_imagen} onChange={(e) => setUrl_imagen(e.target.value)} className="w-50" required />
        </div>
        
        <button type="submit" className="btn btn-primary">Guardar anuncio</button>
      </form>


      ) : oper === 2 ? (
        <div>
          <label>Edición de Usuario</label>
          <br/><br/>
          {/* <input type="text" onChange={(e) => handleInputChange(e, "e_username")} id="e_username" value={e_username} /> */}
          <label className="form-label">Titulo Anuncio</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_anuncio")} value={e_anuncio} id="e_anuncio" placeholder='Id Anuncio' disabled />
          <label className="form-label">Activo Inactivo</label>
          <input type="text" onChange={(e) => handleInputChange(e, "em_st_rolanuncio")} id="em_st_rolanuncio" value={em_st_rolanuncio} />
          <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
         
          {/* <input type="text" onChange={(e) => handleInputChange(e, "e_st_rolusuario")} id="e_st_rolusuario" value={e_st_rolusuario} maxLength="1"/> */}
          
          {/* <h3>{rol}</h3> */}
          <br/><br/>
          <button onClick={actualizarAnuncio}>Grabar Datos</button>
          <button onClick={regresar}>Regresar</button>
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


            <Modal open={omodalPubli} onClose={guardarAnuncio} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Anuncio Guardado correctamente, redirigiendo al home</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>

    </div>


    );
};

export default ModAnuncios


