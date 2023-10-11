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

const Registro = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [usuario, setUsuario] = useState([]);
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
        try {
            console.log("send data");
            const response = await axios.post("http://gregserver/apisP/registro.php", {
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
            console.log("send data error");
            //console.error(error);
            // Manejar errores aquí
        }
    };

    const sendUsername = async () => {
        // e.preventDefault();
        try {
            // console.log("send data");
            // console.log(m_username)
            // numerror = 0;
            const response = await axios.post("http://gregserver/apisP/checkusername.php", {
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
          const response = await axios.post("http://gregserver/apisP/checkemail.php", {
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

    // const sendUsername = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log("send data");
    //         const response = await axios.post("http://localhost/proy/checkusername.php", {
    //             username: username,
    //         });
    //         console.log(response);
    //         //console.log(response.data);
    //         // Puedes mostrar un mensaje de éxito o realizar otras acciones después de la inserción.
    //     } catch (error) {
    //         console.log("send data error");
    //         //console.error(error);
    //         // Manejar errores aquí
    //     }
    // };

    // function checkEmail() {
    //     var url = "http://localhost/proy/checkemail.php";
    //     var headers = { "Accept": "application/json", "Content-Type": "application/json" };
    //     var Data = { email: email }
    //     fetch(url, {
    //         method: "POST", headers: headers, body: JSON.stringify(Data)
    //     }).then((response) => response.json())
    //         .then((response) => {
    //             setError(response[0].result);
    //         }).catch((err) => {
    //             setError(err);
    //             console.log(err);
    //         });
    // }

    // function checkPassword() {
    //     if (password1.length < 8) {
    //         setError("El password es menor que 8 caracteres");
    //     }
    // }

    return (

        <form onSubmit={sendData} className="row g-3 needs-validation" noValidate>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>

                <p>{msg !== "" ? <span className="success">{msg} </span> : <span className="error">{error} </span>}</p>

                <div className="col-md-4">
                    <label className="form-label">First name</label>
                    <input type="text" name="fname" value={fname} onChange={(e) => handleInputChange(e, "fname")}
                        className="form-control" id="validationCustom01" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Last name</label>
                    <input type="text" name="lname" value={lname} onChange={(e) => handleInputChange(e, "lname")}
                        className="form-control" id="validationCustom02" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Username</label>
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
                    <label className="form-label">Password</label>
                    <input type="password" name="password1" value={password1} onChange={(e) => handleInputChange(e, "password1")} //onBlur={checkPassword}
                        className="form-control" id="validationCustom04" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={(e) => handleInputChange(e, "password2")}
                        className="form-control" id="validationCustom05" required />
                </div>

                <div>

                    <div>Num Error: {numerror}</div>

                    <div>{m_usuario.length}</div>

                    {numerror === 1 ? (
                        <p>Ingrese First Name</p>
                    ) : numerror === 2 ? (
                        <p>Ingrese Last Name</p>
                    ) : numerror === 3 ? (
                        <p>Ingrese User Name</p>
                    ) : numerror === 4 ? (
                        <p>User Name debe ser mayor a 5 caracteres</p>
                    ) : numerror === 4 ? (
                    <p>User Name debe ser mayor a 5 caracteres</p>
                    ) : numerror === 5 ? (
                        <p>User Name no Disponible</p>
                    ) : numerror === 6 ? (
                        <p>Ingrese Email</p>
                    ) : numerror === 7 ? (
                        <p>Email no disponible</p>
                    ) : numerror === 8 ? (
                      <p>Ingrese Ingrese Password</p>
                    ): numerror === 9 ? (
                        <p>La longitud del Password debe ser mayor a 8 caracteres</p>
                    ) : numerror === 10 ? (
                        <p>Ingrese Confirm Password</p>
                    ) : numerror === 11 ? (
                        <p>Los Password no coinciden</p>
                    ) : numerror === 0 ? (
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">  Registrarme </button>                    
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