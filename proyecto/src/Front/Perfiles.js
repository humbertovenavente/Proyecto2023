import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
// import { useAuth } from './AuthContext';

var a_usuario = '';
var em_usuario = '';
var em_username = '';
var em_st_usuario = '';
var em_st_rolusuario = '';
var r_usuario = [];

const roles = [
  {id_rol : 1, n_rol : 'Usuario'},    
  {id_rol : 2, n_rol : 'Suscriptor'},
  {id_rol : 3, n_rol : 'Autor'},
  {id_rol : 4, n_rol : 'Moderador'},
  {id_rol : 5, n_rol : 'Administrador'},
];
var m_rolAct = ""

const Perfiles = () => {


  
  let navigate = useNavigate();
  // const { isLoggedIn, l_user, l_rol } = useAuth();
  const [rol, setRol] = useState('');

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
  const [e_usuario, sete_usuario] = useState('');
  const [e_username, sete_username] = useState('');
  const [e_st_usuario, sete_st_usuario] = useState('');
  const [e_st_rolusuario, sete_st_rolusuario] = useState('');
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
    leerusuario()
  } else {
    setomodalRed(true)
    setTimeout(() => {
      return navigate('/')
    }, 2000);
  }

}, [])

  async function leerusuario() {
    const response = await axios.get("http://localhost/proy/perfiles.php")
    r_usuario = response.data
    console.log(response);
    if (r_usuario.length >= 1) {
      setDatos(r_usuario);
    }
    setOper(0);
  }


  const actualizarUsuario = async (e) => {
    e.preventDefault();
    setOper(9);
    console.log(rol);
    try {
      const response = await axios.post("http://localhost/proy/actualizarperfiles.php", {
        usuario: em_username,
        nusuario: em_st_usuario,
        srusuario: rol
      });
      // console.log(response)

    } catch (error) {
      console.log("send data error");
    } finally {

      const response = await axios.get("http://localhost/proy/perfiles.php")
      r_usuario = response.data
      if (r_usuario.length >= 1) {
        setDatos(r_usuario);
      }
      setOper(0);
    }
  };

  const editarUsuario = (id) => {

    setOper(2)
    var i = 0
    var found = false;
    for (i = 0; i < r_usuario.length && !found; i++) {
      if (r_usuario[i].username === id) {
        found = true;
        break;
      }
    }
    em_username = r_usuario[i].username
    sete_username(em_username)
    em_usuario = r_usuario[i].nombre_usuario
    sete_usuario(em_usuario)
    em_st_usuario = r_usuario[i].activo
    sete_st_usuario(em_st_usuario)
    em_st_rolusuario = r_usuario[i].rol
    setRol(r_usuario[i].rol)
  };

  function cambiaActivo() {
    if (em_st_usuario === 'X') {
      em_st_usuario = ''
    } else {
      em_st_usuario = 'X'
    }
    sete_st_usuario(em_st_usuario)
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
    em_username = ''
    sete_username(em_username)
    em_usuario = ''
    sete_usuario(em_usuario)
    em_st_usuario = ''
    sete_st_usuario(em_st_usuario)
    setOper(0);
  }


  const handleInputChange = (e, type) => {
    const valor = e.target.value;
    switch (type) {
      case "a_usuario":
        a_usuario = valor
        break;
      case "e_usuario":
        em_usuario = valor
        sete_usuario(em_usuario)
        break;
      case "e_st_rolusuario":
        em_st_rolusuario = valor
        sete_st_rolusuario(em_st_rolusuario)
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
                <th>Username</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Activo</th>
                <th>Rol</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.username}>
                  <td>{dato.username}</td>
                  <td>{dato.nombre_usuario}</td>
                  <td>{dato.apellido_usuario}</td>
                  <td>{dato.activo}</td>
                  <td>{dato.nombre_rol}</td>
                  <td><button id='but' onClick={() => editarUsuario(dato.username)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>

                   
        </div>
      
      ) : oper === 2 ? (
        <div>
          <label>Edición de Usuario</label>
          <br/><br/>
          {/* <input type="text" onChange={(e) => handleInputChange(e, "e_username")} id="e_username" value={e_username} /> */}
          <label className="form-label">Username</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_usuario")} value={e_usuario} id="e_usuario" placeholder='Usuario' disabled />
          <label className="form-label">Activo</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_st_usuario")} id="e_st_usuario" value={e_st_usuario} />
          <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
          <label className="form-label">Rol</label>
          {/* <input type="text" onChange={(e) => handleInputChange(e, "e_st_rolusuario")} id="e_st_rolusuario" value={e_st_rolusuario} maxLength="1"/> */}
          <select id="rol" name="rol" value={rol} onChange={(e) => changerol(e)} required> 
                                {roles.map((dato) => (
                                    <option value={dato.id_rol} key={dato.id_rol}>{dato.n_rol}</option>
                                ))} 
          </select>
          {/* <h3>{rol}</h3> */}
          <br/><br/>
          <button onClick={actualizarUsuario}>Grabar Datos</button>
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

    </div>


    );
};

export default Perfiles