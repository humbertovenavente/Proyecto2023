import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import imgtc from './../media/TC.jpg';
import { useAuth } from './AuthContext';

var em_usuario = '';
var em_username = '';
var em_st_usuario = '';
var em_st_rolusuario = '';
var r_usuario = [];

var response;
var m_usuario = [];
var m_oferta = [];
var m_planes = [];
var response = "";

var l_isLoggedIn = ""
var l_l_username = ""
var l_l_rol = 0
var m_fname = "";
var m_lname = "";
var m_username = "";
var m_email = "";

var omodal_msg = "";

const Perfil = () => {

  const { login, del_imagen, ref_imagen } = useAuth();

  let navigate = useNavigate();

  const [oper, setOper] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [oferta, setOferta] = useState(0);
  const [fecvcto, setFecvcto] = useState(new Date());
  const [planes, setPlanes] = useState([]);
  const [mto_pago, setMto_pago] = useState(0);

  const [imagen, setImagen] = useState(null); 
  const [imagensend, setImagensend] = useState(null);
  // const [lista, setLista] = useState([]);
  // const [file, setFile] = useState(null);

  //Manejo de Ventana Modal 
  const [omodalSuscripcion, setomodalSuscripcion] = useState(false);
  const [omodal, setomodal] = useState(false);
  const handleClose = () => {
    setomodal(false)
  };
  const handleOpen = (msg) => {
    omodal_msg = msg;
    setomodal(true)
  };
  //Manejo de Ventana Modal

  //Manejo de Ventana Modal TC
  const [omodalTC, setomodalTC] = useState(false);
  //Manejo de Ventana Modal TC

  useEffect(() => {
    // setOper(8);
    l_isLoggedIn = localStorage.getItem('jcapp_logued')
    l_l_username = localStorage.getItem('jcapp_username')
    l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))
    if (l_isLoggedIn) {
      setOper(8)
      leerusuario()
      getImagenes()
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
      response = await axios.post("http://localhost/proy/checkperfil.php", {
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
        setEmail(m_usuario[0].email);
      }
      m_oferta = []
      m_oferta = response.data.oferta
      // if (m_oferta) {      
      if (m_oferta.length >= 1) {
        setOferta(m_oferta[0].porcentaje);
        var from = m_oferta[0].fecfin.split("-")
        var f = new Date()
        f.setFullYear(from[0])
        f.setMonth(from[1] - 1)
        f.setDate(from[2])
        setFecvcto(f)
      }
      m_planes = []
      m_planes = response.data.planes
      if (m_planes.length >= 1) {
        setPlanes(m_planes);
      }
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

  }

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    handleOpen("Actualizando Datos de mi Perfil")
    // setOper(9);
    try {
      response = await axios.post("http://localhost/proy/actualizamiperfil.php", {
        username: username,
        nombre: m_fname,
        apellido: m_lname
      });
      // console.log(response)

    } catch (error) {
      console.log(error);
    } finally {

      response = await axios.post("http://localhost/proy/checkperfil.php", {
        usuario: username
      });
      m_usuario = []
      m_usuario = response.data.usuario
      if (m_usuario.length >= 1) {
        setFname(m_usuario[0].nombre_usuario);
        setLname(m_usuario[0].apellido_usuario);
        setUsername(m_usuario[0].username);
        setEmail(m_usuario[0].email);
      }
      m_oferta = []
      m_oferta = response.data.oferta
      if (m_oferta.length >= 1) {
        setOferta(m_oferta);
      }
      m_planes = []
      m_planes = response.data.planes
      if (m_planes.length >= 1) {
        setPlanes(m_planes);
      }
      // console.log(m_planes)
      setomodal(false)

    }
  };

  function Suscribirse(id) {
    setMto_pago(id)
    setomodalTC(true)
  };


  // const [state, setState] = useState({
  //   number: "",
  //   name: "",
  //   expiry: "",
  //   cvc: "",
  //   focus: ""
  // })
  const handleInputChangeTC = (e) => {
    // setState({
    //   ...state,
    //   [e.target.name] : e.target.value
    // })
  }
  const handleFocusChangeTC = (e) => {
    // setState({
    //   ...state,
    //   focus : e.target.name
    // })
  }

  const procesarPago = async () => {
    handleOpen("Habilitando Suscripcion")
    setMto_pago(0)
    // // setOper(9);
    try {
      response = await axios.post("http://localhost/proy/actualizasuscripcion.php", {
        username: username,
      });
      // console.log(response)
    } catch (error) {
      console.log(error);
    } finally {
      setomodal(false)
      login(l_l_username, 2);
      setomodalSuscripcion(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);
    }
    setomodalTC(false)

  }
  const cancelarPago = () => {
    setMto_pago(0)
    setomodalTC(false)
  }

  async function addImagen() {
    let fd = new FormData()
    fd.append("imagen", imagensend)
    fd.append("username", l_l_username)
    try {
      response = await axios.post('http://localhost/proy/imagenes.php', fd);
    } catch (error) {
      console.log(error)
    } finally {
      getImagenes();
      setImagensend(null)
      ref_imagen()
    }    
  }

  async function getImagenes() {
     const res = await axios.get('http://localhost/proy/imagenes.php?username=' + l_l_username);
    // console.log(res.data)
    if (res.data.length > 0) {
      setImagen(res.data[0].imagen)
    }    
  }

  async function delImagen() {
    if(window.confirm('¿Seguro de Eliminar la Foto?')){
      const res = await axios.delete('http://localhost/proy/imagenes.php?username=' + l_l_username);
      setImagen(null)
      setImagensend(null)
      del_imagen()
      getImagenes();
      // console.log(res.data)
    }
  }

  const handleFileChange = (e) => {
    // console.log(e)
    setImagensend(e)
  }

  return (

    <div>
      {oper === 0 ? (
        <div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem", width: "33%" }}>
              <label className="form-label">Datos no Editables</label>
              <div style={{ width: "90%" }}>
                <label className="form-label">Username</label>
                <input readOnly type="text" name="username" value={username} onChange={(e) => handleInputChange(e, "username")} // onBlur={checkUsername}
                  className="form-control" id="validationCustom03" required />
              </div>
              <div style={{ width: "90%" }}>
                <label className="form-label">Email</label>
                <div className="input-group has-validation">
                  <input readOnly type="text" name="email" value={email} onChange={(e) => handleInputChange(e, "email")} //onBlur={checkEmail}
                    className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                </div>
              </div>
            </div>
            <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "top", flexWrap: "wrap", marginTop: "2rem", width: "33%" }}>
              <div style={{ width: "90%" }}>
                <label className="form-label">First name</label>
                <input type="text" name="fname" value={fname} onChange={(e) => handleInputChange(e, "fname")}
                  className="form-control" id="validationCustom01" required />
              </div>
              <div style={{ width: "90%" }}>
                <label className="form-label">Last name</label>
                <input type="text" name="lname" value={lname} onChange={(e) => handleInputChange(e, "lname")}
                  className="form-control" id="validationCustom02" required />
              </div>
              <button onClick={actualizarUsuario} style={{ height: "3rem", width: "10rem" }}>Actualizar Datos</button>
            </div>

            <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem", width: "33%" }}>
              <p>Foto de Perfil</p>
              {imagen ?
                <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem"}}>
                  <img src={"data:image/png;base64," + imagen} className="img-fluid" alt="imagen" style={{ width: "7rem" }} />
                  <button onClick={delImagen} >Borrar</button>
                </div>
                :
                <div className='contenedor' style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem"}}>
                  <input type="file" className="form-control-file" accept="image/*" onChange={(e) => setImagensend(e.target.files[0])} />
                  { imagensend ?
                    <button onClick={addImagen} >Grabar Foto</button>
                  :
                    <p></p>
                  }
                  
                </div>
              } 

            </div>

          </div>

          {l_l_rol === 1 ?
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "top", flexWrap: "wrap",
              marginTop: "2rem", backgroundColor: "#d4d4d4", padding: "2rem"
            }}>
              {oferta ?
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h2>Tienes una Oferta Disponible por: {oferta} %</h2>
                  <h4>Disponible hasta el {fecvcto.toLocaleDateString('es-GT', { day: "numeric", month: "long", year: 'numeric' })}</h4>
                  <h4>Planes en Oferta Disponibles</h4>
                  <table className="table" id="tabla">
                    <thead>
                      <tr>
                        <th className='oculto'>ID</th>
                        <th>Plan</th>
                        <th>Costo</th>
                        <th>Descuento</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {planes.map((dato) => (
                        <tr key={dato.id_plan}>
                          <td className='oculto'>{dato.id_plan}</td>
                          <td>{dato.nombre_plan}</td>
                          <td>{dato.costo}</td>
                          <td>{parseFloat(dato.costo * oferta / 100).toFixed(2)}</td>
                          <td>{parseFloat(dato.costo - (dato.costo * oferta / 100)).toFixed(2)}</td>
                          <td><button id='but' onClick={() => Suscribirse(parseFloat(dato.costo - (dato.costo * oferta / 100)).toFixed(2))}>Suscribete a este Plan</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
                :
                <div>
                  <h4>Planes Disponibles</h4>
                  <table className="table" id="tabla">
                    <thead>
                      <tr>
                        <th className='oculto'>ID</th>
                        <th>Plan</th>
                        <th>Costo Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {planes.map((dato) => (
                        <tr key={dato.id_plan}>
                          <td className='oculto'>{dato.id_plan}</td>
                          <td>{dato.nombre_plan}</td>
                          <td>{dato.costo}</td>
                          <td><button id='but' onClick={() => Suscribirse(dato.id_plan)}>Suscribete a este Plan</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }


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

      {/* **Ventana Modal para TC** */}
      <Modal open={omodalTC} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '50px' }}>
          <div>

            <form>
              <img src={imgtc} alt="..." className='mx-auto d-block' style={{ align: "center", height: "8rem" }} />
              <div className="form-group">
                <label htmlFor="number">Número de la tarjeta</label>
                <input type="text" name="number" id="number" maxLength="16" className="form-control"
                  onChange={handleInputChangeTC} onFocus={handleFocusChangeTC} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" id="name" maxLength="30" className="form-control"
                  onChange={handleInputChangeTC} onFocus={handleFocusChangeTC} />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="expiry">Fecha de expiración</label>
                  <input type="text" name="expiry" id="expiry" maxLength="5" className="form-control"
                    onChange={handleInputChangeTC} onFocus={handleFocusChangeTC} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="cvc">CVC</label>
                  <input type="text" name="cvc" id="cvc" maxLength="3" className="form-control"
                    onChange={handleInputChangeTC} onFocus={handleFocusChangeTC} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mto">Monto de Transacción</label>
                  <input readOnly type="text" name="mto" id="mto" value={mto_pago} className="form-control" style={{ fontSize: "2rem" }}
                    onChange={handleInputChangeTC} onFocus={handleFocusChangeTC} />
                </div>
              </div>
              <div style={{
                display: "flex", flexDirection: "row", alignItems: "center", rowGap: "1rem", justifyContent: "top", flexWrap: "wrap", marginTop: "2rem",
                backgroundColor: "#d4d4d4", padding: "2rem"
              }}>
                <button onClick={procesarPago} type="button" className="btn btn-success btn-block btn-lg">Pagar</button>
                <button onClick={cancelarPago} type="button" className="btn btn-success btn-block btn-lg">Cancelar</button>
              </div>
            </form>

          </div>
        </Box>
      </Modal>
      {/* **Ventana Modal para TC** */}

      {/* **Ventana Modal para Mensaje** */}
      <Modal open={omodalSuscripcion} onClose={procesarPago} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Suscripcion exitosa, redirigiendo al home</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>
      {/* **Ventana Modal para Responder** */}

    </div>

  );
};

export default Perfil