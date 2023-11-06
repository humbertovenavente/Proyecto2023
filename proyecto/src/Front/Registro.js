import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"

var m_fname = "";
var m_lname = "";
var m_username = "";
var m_email = "";
var m_password1 = "";
var m_password2 = "";
var numerror = 1;
var m_usuario = [];
var m_correo = [];
// var response;
var r_vusuarios = [];

const Registro = () => {

    let navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [usuario, setUsuario] = useState([]);

    const [estado, setEstado] = useState(0);
    //--------------
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setTimeout(function () {
            setMsg("");
        }, 15000);
    }, [msg]);


    const handleInputChange = (e, type) => {

        const valor = e.target.value;
        numerror = 0

        switch (type) {
            case "fname":
                m_fname = valor
                setFname(valor);
                break;

            case "lname":
                m_lname = valor
                setLname(valor);
                break;

            case "username":
                m_username = valor
                setUsername(valor);

                if (m_username.length > 5) {
                    // console.log('llamada')
                    sendUsername();
                }
                break;

            case "email":
                m_email = valor
                setEmail(valor);
                sendEmail();
                break;

            case "password1":
                m_password1 = valor
                setPassword1(valor);
                break;

            case "password2":
                m_password2 = valor
                setPassword2(valor);
                break;

            default:
        }

        validaError();

    }

    function validaError() {
        if (m_fname.length === 0) {
            numerror = 1;
        } else if (m_lname.length === 0) {
            numerror = 2;
        } else if (m_username.length === 0) {
            numerror = 3;
        } else if (m_username.length <= 5) {
            numerror = 4;
        } else if (m_usuario.length >= 1) {
            numerror = 5;
        } else if (m_email.length === 0) {
            numerror = 6;
        } else if (m_correo.length >= 1) {
            numerror = 7;
        }else if (m_password1.length === 0) {
            numerror = 8;
        } else if (m_password1.length <= 7) {
            numerror = 9;
        } else if (m_password2.length === 0) {
            numerror = 10;
        } else if (m_password1 !== m_password2) {
            numerror = 11;
            // } else if (m_password1 !== m_password2) {
            //     numerror = 9;
        } else {
            numerror = 0;
        }
    }

    const sendData = async (e) => {
        e.preventDefault();
        setEstado(1)
        try {
            console.log("send data");
            const response = await axios.post("http://localhost/proy/registro.php", {
                fname: fname,
                lname: lname,
                username: m_username,
                email: email,
                password1: password1,
                password2: password2
            });
            console.log(response);
            //console.log(response.data);
            // Puedes mostrar un mensaje de éxito o realizar otras acciones después de la inserción.
        } catch (error) {
            setEstado(2)
            console.log("send data error");
            //console.error(error);
            // Manejar errores aquí
        } finally {
            const response = await axios.post("http://localhost/proy/checklogin.php", {
            username: m_username,
            password: password1
            });

            r_vusuarios = response.data
                if (r_vusuarios.length >= 1) {
                   setEstado(3)
                    setTimeout(() => {
                        return navigate('/iniciarsesion')
                    }, 2000);
                } else {
                        setEstado(4)
                        setTimeout(() => {
                            setEstado(0)
                        }, 2000);
                    }
            // m_usuario = response.data
            // if (m_usuario.length >= 1) {
            //     // console.log(username, m_usuario[0].rol)
            //     Registro(username, m_usuario[0].rol)
            //     setEstado(3)
            //     setTimeout(() => {
            //         return navigate('/')
            //     }, 2000);
            // } else {
            //     setEstado(4)
            //     setTimeout(() => {
            //         setEstado(0)
            //     }, 2000);
            // }
            
        }
    };

    const sendUsername = async () => {
        // e.preventDefault();
        try {
            // console.log("send data");
            // console.log(m_username)
            // numerror = 0;
            const response = await axios.post("http://localhost/proy/checkusername.php", {
                username: m_username,
            });
            m_usuario = response.data
            setUsuario(m_usuario);
            // console.log(m_usuario.length);
            if ( m_usuario.length >= 1 ) {
                numerror = 6;              
            }   
            validaError();
                 
            //   console.log(m_usuario.length);
            // Puedes mostrar un mensaje de éxito o realizar otras acciones después de la inserción.
        } catch (error) {
            //   console.log("send data error");
            //console.error(error);
            // Manejar errores aquí
        }
    };

    const sendEmail = async () => {
      // e.preventDefault();
      try {
          // console.log("send data");
          // console.log(m_username)
          // numerror = 0;
          const response = await axios.post("http://localhost/proy/checkemail.php", {
              email: m_email,
          });
          m_correo = response.data
          setUsuario(m_correo);
          // console.log(m_usuario.length);
          if ( m_correo.length >= 1 ) {
              numerror = 7;              
          }   
          validaError();
               
          //   console.log(m_usuario.length);
          // Puedes mostrar un mensaje de éxito o realizar otras acciones después de la inserción.
      } catch (error) {
          //   console.log("send data error");
          //console.error(error);
          // Manejar errores aquí
      }
  };

  async function sendMail() {
    try {
        const response = await axios.post("http://localhost/proy/sendmail.php",{
            email: email,
            fname: fname
        });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}


    return (

        <form onSubmit={sendData} className="row g-3 needs-validation" noValidate>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>

                <p>{msg !== "" ? <span className="success">{msg} </span> : <span className="error">{error} </span>}</p>

                <div className="col-md-4">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="fname" value={fname} onChange={(e) => handleInputChange(e, "fname")}
                        className="form-control" id="validationCustom01" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Apellido</label>
                    <input type="text" name="lname" value={lname} onChange={(e) => handleInputChange(e, "lname")}
                        className="form-control" id="validationCustom02" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Nombre de usuario</label>
                    <input type="text" name="username" value={username} onChange={(e) => handleInputChange(e, "username")} // onBlur={checkUsername}
                        className="form-control" id="validationCustom03" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <div className="input-group has-validation">
                        <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e, "email")} //onBlur={checkEmail}
                            className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                    </div>

                </div>
                <div className="col-md-4">
                    <label className="form-label">Contrasena</label>
                    <input type="password" name="password1" value={password1} onChange={(e) => handleInputChange(e, "password1")} //onBlur={checkPassword}
                        className="form-control" id="validationCustom04" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Confirmar Contrasena</label>
                    <input type="password" name="password2" value={password2} onChange={(e) => handleInputChange(e, "password2")}
                        className="form-control" id="validationCustom05" required />
                </div>

                <div>

                    {/* <div>Num Error: {numerror}</div> */}

                    {/* <div>{m_usuario.length}</div> */}

                    {numerror === 1 ? (
                        <p>Ingrese su Nombre</p>
                    ) : numerror === 2 ? (
                        <p>Ingrese su apellido</p>
                    ) : numerror === 3 ? (
                        <p>Ingrese su Usuario</p>
                    ) : numerror === 4 ? (
                        <p>El usuario debe ser mayor a 5 caracteres</p>
                    ) : numerror === 4 ? (
                    <p>El usuario debe ser mayor a 5 caracteres</p>
                    ) : numerror === 5 ? (
                        <p>Usuario no Disponible</p>
                    ) : numerror === 6 ? (
                        <p>Ingrese Email</p>
                    ) : numerror === 7 ? (
                        <p>Email no disponible</p>
                    ) : numerror === 8 ? (
                      <p>Ingrese Ingrese Contrasena</p>
                    ): numerror === 9 ? (
                        <p>La longitud de la Contrasena debe ser mayor a 8 caracteres</p>
                    ) : numerror === 10 ? (
                        <p>Ingrese el Confirmar Contrasena</p>
                    ) : numerror === 11 ? (
                        <p>Las contrasenas no coinciden</p>
                    ) : numerror === 0 ? (
                        <div className="col-12">
                            {estado === 0 ? (
                            <button className="btn btn-primary" type="submit" onClick={() => sendMail()}>  Registrarme </button>    
                            ) : estado === 1 ? (
                                <div>
                                    <div className="spinner-border" role="status">
                                    </div>
                                    <span>  Registrando...</span>
                                </div>
                            ) : estado === 2 ? (<p>Error al Registrar</p>
                            ) : estado === 3 ? (
                                <div>
                                    <span>Registro Exitoso, Redirigiendo..</span>
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>

                            ) : (<div>
                                <span>Error al registrar, espere..</span>
                                <div className="spinner-border" role="status">
                                </div>
                            </div>
                            )
                            }                
                        </div>
                    ) : ( <p></p> )
                    }

                </div>


        
            </div>

        </form>
        //<Link to= "/home"></Link>

    )
}

export default Registro