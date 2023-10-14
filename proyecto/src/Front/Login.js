import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

var response;
var m_usuario = [];

export const Login = () => {

    let navigate = useNavigate();

    const [username, setUsuario] = useState("");
    const [password, setcontraseña] = useState("");
    const [estado, setEstado] = useState(0);
    const { login } = useAuth();


    const entrar = async (e) => {
        e.preventDefault();
        setEstado(1)
        try {
            response = await axios.post("http://gregserver/apisP/checklogin.php", {
                username: username,
                password: password
            });
        } catch (error) {
            setEstado(2)
        } finally {
            m_usuario = response.data
            if (m_usuario.length >= 1) {
                // console.log(username, m_usuario[0].rol)
                login(username, parseInt(m_usuario[0].rol))
                setEstado(3)
                setTimeout(() => {
                    return navigate('/')
                }, 2000);
            } else {
                setEstado(4)
                setTimeout(() => {
                    setEstado(0)
                }, 2000);
            }
        }
    };

    return (
        <div className="bg-info d-flex justify-content-center align-items-center vh-100">
            <div className="login" >

                <div className="bg-white p-5 rounded-5 text-secondary" style={{ width: '35rem' }}  >
                    <div>
                        <div className="d-flex justify-content-center">
                            <img src="https://th.bing.com/th/id/R.e4f5f40d133018514c664efeb90a8ff9?rik=c6EIpQd4ztpYMw&riu=http%3a%2f%2fwww.easyloanscur.com%2fimages%2flogin-icon.png&ehk=51PAUVKiVvN9WJTyNB9jE%2bYipg232zsMoHxoxnmf%2fIg%3d&risl=&pid=ImgRaw&r=0"
                                alt="login-icon" style={{ height: '4rem' }} />
                            <h1 className="text-center fs-1 mt-3">Login</h1>
                        </div>

                        <form id="form_login">
                            <div>
                                <br />

                                <div className="input-group mt-3">
                                    <div className="input-group-text bg-info">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828461.png"
                                            alt="login-icon" style={{ height: '1rem' }} />
                                    </div>
                                    <input className="form-control" type="text" id="username" placeholder='Usuario' onChange={(e) => setUsuario(e.target.value)} required />
                                </div>
                            </div>

                            <div className="input-group mt-1">
                                <div className="input-group-text bg-info">
                                    <img src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
                                        alt="login-icon" style={{ height: '1rem' }} />
                                </div>

                                <input className="form-control" type="password" id="password" placeholder='Contraseña' onChange={(e) => setcontraseña(e.target.value)} required />
                            </div>
                            <br></br>
                            <div className="btn btn-info text-white w-100 mt-3">

                                {estado === 0 ? (
                                    <input type="submit" className="btn btn-info text-white w-100" value="Entrar" onClick={entrar} />
                                ) : estado === 1 ? (
                                    <div>
                                        <div className="spinner-border" role="status">
                                        </div>
                                        <span>  Logueando...</span>
                                    </div>
                                ) : estado === 2 ? (<p>Error al Validar Usuario</p>
                                ) : estado === 3 ? (
                                    <div>
                                        <span>Login Exitoso, Redirigiendo..</span>
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div>

                                ) : (<div>
                                    <span>Usuario o Contraseña Incorrecto, espere..</span>
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>
                                )
                                }

                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

