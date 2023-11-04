import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

var em_usuario = '';
var em_username = '';
var em_st_usuario = '';
var em_st_rolusuario = '';
var r_usuario = [];

var response;
var m_usuario = [];
var m_oferta = [];

var l_isLoggedIn = ""
var l_l_username = ""
var l_l_rol = 0
var m_fname = "";
var m_lname = "";
var m_username = "";
var m_email = "";

var omodal_msg = "";

const Perfil = () => {

  let navigate = useNavigate();

  const [oper, setOper] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [oferta, setOferta] = useState([]);

  //Manejo de Ventana Modal 
  const [omodal, setomodal] = useState(false);
  const handleClose = () => {
    setomodal(false)
  };
  const handleOpen = (msg) => {
    omodal_msg = msg;
    setomodal(true)
  };
  //Manejo de Ventana Modal

  useEffect(() => {
    // setOper(8);
    l_isLoggedIn = localStorage.getItem('jcapp_logued')
    l_l_username = localStorage.getItem('jcapp_username')
    l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))
    if (l_isLoggedIn) {
      setOper(8)
      leerusuario()
    } else {
      handleOpen(" No tienes autorizacion, redirigiendo al home")
      setTimeout(() => {
        handleClose()
        return navigate('/')
      }, 2000);
    }
  }, [])

  async function leerusuario() {
    try {
      response = await axios.post("http://gregserver/apisP/checkperfil.php", {
        usuario: l_l_username
      });
    } catch (error) {
      console.log(error);
    } finally {
      m_usuario = []
      m_usuario = response.data.usuario
      if (m_usuario.length >= 1) {
        setFname(m_usuario[0].nombre_usuario);
        setLname(m_usuario[0].apellido_usuario);
        setUsername(m_usuario[0].username);
        setEmail(m_usuario[0].correo_usuario);
      }
      m_oferta = []
      m_oferta = response.data.oferta
      if (m_oferta.length >= 1) {
        setOferta(m_oferta);
      }
      console.log(m_oferta)
      setOper(0);
    }
  };

  const handleInputChange = (e, type) => {
    const valor = e.target.value;
    // numerror = 0
    switch (type) {
      case "fname":
        m_fname = valor
        setFname(valor);
        break;
      case "lname":
        m_lname = valor
        setLname(valor);
        break;
      case "email":
        m_email = valor
        setEmail(valor);
        break;
      default:
    }

    // validaError();

  }

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    // setOper(9);
    // console.log(rol);
    // try {
    //   const response = await axios.post("http://localhost/proy/actualizarperfil.php", {
    //     usuario: em_username,
    //     nusuario: em_st_usuario,
    //     srusuario: rol
    //   });

    // } catch (error) {
    //   console.log("send data error");
    // } finally {

    //   const response = await axios.get("http://localhost/proy/perfiles.php")
    //   r_usuario = response.data
    //   if (r_usuario.length >= 1) {
    //     setDatos(r_usuario);
    //   }
    //   setOper(0);
    // }
  };

  function Suscribirse() {
  };

  // const editarUsuario = (id) => {
  //   setOper(2)
  //   var i = 0
  //   var found = false;
  //   for (i = 0; i < r_usuario.length && !found; i++) {
  //     if (r_usuario[i].username === id) {
  //       found = true;
  //       break;
  //     }
  //   }
  //   em_username = r_usuario[i].username
  //   sete_username(em_username)
  //   em_usuario = r_usuario[i].nombre_usuario
  //   sete_usuario(em_usuario)
  //   em_st_usuario = r_usuario[i].activo
  //   sete_st_usuario(em_st_usuario)
  //   em_st_rolusuario = r_usuario[i].rol
  //   setRol(r_usuario[i].rol)
  // };

  // function cambiaActivo() {
  //   if (em_st_usuario === 'X') {
  //     em_st_usuario = ''
  //   } else {
  //     em_st_usuario = 'X'
  //   }
  //   sete_st_usuario(em_st_usuario)
  // }

  // function regresar() {
  //   em_username = ''
  //   sete_username(em_username)
  //   em_usuario = ''
  //   sete_usuario(em_usuario)
  //   em_st_usuario = ''
  //   sete_st_usuario(em_st_usuario)
  //   setOper(0);
  // }



  return (

    <div>
      {oper === 0 ? (
        <div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
              <label className="form-label">Datos no Editables</label>
              <div style={{width: "90%"}}>
                <label className="form-label">Username</label>
                <input readOnly type="text" name="username" value={username} onChange={(e) => handleInputChange(e, "username")} // onBlur={checkUsername}
                  className="form-control" id="validationCustom03" required />
              </div>
              <div style={{width: "90%"}}>
                <label className="form-label">Email</label>
                <div className="input-group has-validation">
                  <input readOnly type="text" name="email" value={email} onChange={(e) => handleInputChange(e, "email")} //onBlur={checkEmail}
                    className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                </div>
              </div>
            </div>
            <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "top", flexWrap: "wrap", marginTop: "2rem" }}>
              <div style={{width: "90%"}}>
                <label className="form-label">First name</label>
                <input type="text" name="fname" value={fname} onChange={(e) => handleInputChange(e, "fname")}
                  className="form-control" id="validationCustom01" required />
              </div>
              <div style={{width: "90%"}}>
                <label className="form-label">Last name</label>
                <input type="text" name="lname" value={lname} onChange={(e) => handleInputChange(e, "lname")}
                  className="form-control" id="validationCustom02" required />
              </div>
              <button onClick={actualizarUsuario} style={{ height: "3rem", width: "10rem" }}>Actualizar Datos</button>
            </div>
          </div>

          { l_l_rol === 1 ?
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "top", flexWrap: "wrap", marginTop: "2rem", 
                        backgroundColor: "#d4d4d4", padding: "2rem" }}>
            <button onClick={Suscribirse} style={{ height: "3rem", width: "10rem" }}>Suscripción</button>
            {oferta.map((dato) => (
              <div key={dato.id_oferta}>
                <h2>Oferta Disponible por: {dato.porcentaje} %</h2>
              </div>
            ))}
          </div>
          : <div> </div>} 

        </div>
      ) : oper === 2 ? (
        <div>
          <label>Edición de Usuario</label>
        </div>
      ) : oper === 8 ? (
        <div>
          <span>Leyendo Perfil, espere..</span>
          <div className="spinner-border" role="status" />
        </div>
      ) : oper === 9 ? (
        <div>
          <span>Actualizando Perfil, espere..</span>
          <div className="spinner-border" role="status" />
        </div>
      ) : (<p></p>)}



      {/* **Ventana Modal para Mensaje** */}
      <Modal open={omodal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>           
            <span>{omodal_msg}</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>
      {/* **Ventana Modal para Responder** */}

    </div>


    );
};

export default Perfil