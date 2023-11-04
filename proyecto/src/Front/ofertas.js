import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

var l_diaini = new Date();
var l_diafin = new Date();
var e_usuarios = [];
var r_usuarios = [];
var l_where = "";
var e2_usuarios = [];

const Ofertas = () => {

    let navigate = useNavigate();

    const [oper, setOper] = useState(0);
    const [operv1, setOperv1] = useState(0);
    const [operv2, setOperv2] = useState(0);
    
    const [l_usuarios, setL_usuarios] = useState("");
    const [porc, setPorc] = useState(1);
    const [diasv, setDiasv] = useState(1);
    const [dlog, setDlog] = useState(1);

    const [diainis, setDiainis] = useState('');
    const [diafins, setDiafins] = useState('');

    const [omodalLee, setOmodalLee] = useState(false);
    // const handleCloseEnv = () => {
    //     setomodalEnv(false)
    // };

    const [omodalElu, setomodalElu] = useState(false);
    // const handleCloseEru = () => {
    //     setomodalEnv(false)
    // };

    const [omodalEnv, setomodalEnv] = useState(false);
    // const handleCloseEnv = () => {
    //     setomodalEnv(false)
    // };
    
    const [omodalEru, setomodalEru] = useState(false);
    // const handleCloseEru = () => {
    //     setomodalEnv(false)
    // };

    useEffect(() => {
        setOper(0);
        setPorc(1);
        setDiasv(1);

        l_diaini = new Date();
        l_diafin.setDate(l_diaini.getDate() + 1);
        setDiainis(l_diaini.toLocaleDateString());
        setDiafins(l_diafin.toLocaleDateString());

        //     const l_isLoggedIn = localStorage.getItem('jcapp_logued')
        //     const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

        //     if ( l_isLoggedIn && ( l_l_rol === 5 ) ) {
        //       setOper(8)
        //       leercategorias()    
        //     } else {
        //       setomodalRed(true)
        //       setTimeout(() => {
        //         return navigate('/')
        //       }, 2000);
        //     }

    }, [])

    function change_auto() {
        setOper(1)
        r_usuarios = []
        setOperv1(0)
    }

    function change_dema() {
        setOper(0)
        r_usuarios = []
        setOperv1(0)
    }

    function validaporc(v_porc) {
        if (v_porc > 0 && v_porc < 100) {
            setPorc(v_porc)
        }
    }

    function validadiasv(v_diasv) {
        var l_v_diasv
        l_v_diasv = parseInt(v_diasv)
        if (l_v_diasv > 0 && l_v_diasv < 31) {
            setDiasv(l_v_diasv)
            l_diafin.setDate(l_diaini.getDate() + l_v_diasv);
            setDiafins(l_diafin.toLocaleDateString());
        }
    }

    function validadlog(v_dlog) {
        if (v_dlog > 0 && v_dlog < 20) {
            setDlog(v_dlog)
        }
    }

    function validarod() {

        e_usuarios = []
        e_usuarios = l_usuarios.split(",")

        //Limpiar arreglo de elementos vacios
        e2_usuarios = [];
        // console.log(e_usuarios);
        for( var j = 0; j < e_usuarios.length ; j++ ){
            if ( e_usuarios[j] ){
                e2_usuarios.push( e_usuarios[j].trim() );
          }
        }
        // console.log(e2_usuarios)

        // l_where = ""

        if ( e2_usuarios.length >= 1 ) {

            setOmodalLee(true)
            leerusuarios(e2_usuarios) 

            // var i = 0
            // for (i = 0; i < e2_usuarios.length; i++) {
            //     if ( i > 0 ) {
            //         l_where = l_where + ","
            //     }
            //     l_where = l_where + "'" + e2_usuarios[i].trim() + "'"
            // }
        } else {            
            setomodalEru(true)
            setTimeout(() => {
                setomodalEru(false)
            }, 2000);
        }

        // if (l_where) {
        //     setOmodalLee(true)
        //     leerusuarios(l_where)            
        // }        

    }

    async function leerusuarios(l_users) {
        try {
            const response = await axios.post("http://gregserver/apisP/leerusuarios.php",
            {
                l_users : l_users
            });
            r_usuarios = response.data
            // console.log(response.data)
        } catch (error) {
            // console.log(error);
            setOmodalLee(false)
        } finally {
            setOmodalLee(false)
            if ( r_usuarios.length >= 1 ) {
                setOperv1(1)
            } else {
                setomodalElu(true)
                setTimeout(() => {
                    setomodalElu(false)
                }, 2000);
            }
        }
    }  
    
    function validarau() {
      
        setOmodalLee(true)
        leerusuariospdl()

    }

    async function leerusuariospdl() {
        try {
            // console.log(dlog)
            const response = await axios.post("http://gregserver/apisP/leerusuariospdl.php",
            {
              d_login : dlog
            });
            r_usuarios = response.data
            // console.log(r_usuarios)
        } catch (error) {
            console.log(error);
        //     setomodalEnv(false)
        } finally {
            setOmodalLee(false)
            if ( r_usuarios.length >= 1 ) {
                setOperv2(1)
            } else {
                setomodalElu(true)
                setTimeout(() => {
                    setomodalElu(false)
                }, 2000);
            }
        }
    } 

    function enviar_ofertas() {   
        setomodalEnv(true)   
        // console.log(r_usuarios)
        for( var j = 0; j < r_usuarios.length ; j++ ){
            if ( r_usuarios[j].rol === '1' ){
                enviar_ofertas2(r_usuarios[j].email, r_usuarios[j].nombre_usuario, r_usuarios[j].username)                
          }
        }
        setTimeout(() => {
            setomodalEnv(false)
            return navigate('/')
        }, 2000);

    }

    async function enviar_ofertas2(s_correo, s_nombre, s_username){

        try {
            // console.log(s_correo, s_nombre)
            const response = await axios.post("http://gregserver/apisP/sendmailoferta.php",
            {
              correo : s_correo,
              nombre: s_nombre,
              porcen: porc,
              fecini: l_diaini.getFullYear() + '-' + `${(l_diaini.getMonth()+1)}`.padStart(2,'0') + '-' + `${(l_diaini.getDate()+1)}`.padStart(2,'0'),
              fecfin: l_diafin.getFullYear() + '-' + `${(l_diafin.getMonth()+1)}`.padStart(2,'0') + '-' + `${(l_diafin.getDate()+1)}`.padStart(2,'0'),
              username: s_username
            });
            console.log(response.data)

        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    function regresar_sel() {
        setOperv1(0)
        r_usuarios = []
        setOperv1(0)
    }

    return (

        <div>

            {oper === 0 ? (
                <div>
                    <hr />
                    <div className='d-flex mt-2' style={{ flexDirection: "column", alignItems: "center" }}>
                        <h1 className='mr-2'>Ofertas On-Demand</h1>
                        <button onClick={change_auto}>Cambiar a Ofertas Automáticas</button>
                    </div>
                    <hr />
                    {operv1 === 0 ? (
                        <div className='d-flex mt-4' style={{ flexDirection: "column", alignItems: "center" }} >
                            <label htmlFor="texto">Ingrese Usuarios para Oferta (Separados por coma ",")</label>
                            <textarea id="l_usuarios" name="l_usuarios" rows="3" cols="50" style={{ width: "70%" }}
                                value={l_usuarios} onChange={(e) => setL_usuarios(e.target.value)} required />
                            <br />
                            <div className="main">
                                <div className="d-flex">
                                    <p>Porcentaje de Descuento</p>
                                    <input type="number" min="1" max="99" value={porc} onChange={(e) => validaporc(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-flex mt-2">
                                <p>Días de Validez: </p>
                                <input type="number" min="1" max="30" value={diasv} onChange={(e) => validadiasv(e.target.value)} />
                                <p>Inicia el: {diainis}</p>
                                <p>Finaliza el: {diafins}</p>
                            </div>
                            <button className="mt-2" onClick={validarod}>Validar Usuarios para Ofertas</button>
                        </div>
                    ) : (
                        <div>

                            <table className="table" id="tabla">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Aplica Oferta</th>
                                </tr>
                                </thead>
                                <tbody>
                                {r_usuarios.map((dato) => (
                                    <tr key={dato.username}>
                                    <td>{dato.username}</td>
                                    <td>{dato.nombre_usuario}</td>
                                    <td>{dato.apellido_usuario}</td>
                                    <td>{dato.nombre_rol}</td>
                                    <td>{dato.email}</td>
                                    <td>
                                        {dato.rol === '1' ? (
                                            <div>Si</div>
                                        ) : (
                                            <div>No</div>
                                        )}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>                                
                            </table>
                            <button className="mt-2" onClick={enviar_ofertas}>Enviar Ofertas</button>
                            <button className="mt-2" onClick={regresar_sel}>Regresar a Selección</button>
                        </div>
                    )}
                </div>
            ) : oper === 1 ? (    
                <div>
                    <hr />
                    <div className='d-flex mt-2' style={{ flexDirection: "column", alignItems: "center" }}>
                        <h1 className='mr-2'>Ofertas Automáticas</h1>
                        <button onClick={change_dema}>Cambiar a Ofertas On-Demand</button>
                    </div>
                    <hr />
                    {operv2 === 0 ? (
                        <div className='d-flex mt-4' style={{ flexDirection: "column", alignItems: "center" }} >
                            <br />
                            <div className="main">
                                <div className="d-flex">
                                    <p>Porcentaje de Descuento (1 a 99)</p>
                                    <input type="number" min="1" max="99" value={porc} onChange={(e) => validaporc(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-flex mt-2">
                                <p>Días de Validez (1 a 30 días): </p>
                                <input type="number" min="1" max="30" value={diasv} onChange={(e) => validadiasv(e.target.value)} />
                                <p>Inicia el: {diainis}</p>
                                <p>Finaliza el: {diafins}</p>
                            </div>
                            <div className="main">
                                <div className="d-flex">
                                    <p>Días de Login Consecutivo para Aplicar a la Oferta (1 a 20)</p>
                                    <input type="number" min="1" max="20" value={dlog} onChange={(e) => validadlog(e.target.value)} />
                                </div>
                            </div>
                            <button className="mt-2" onClick={validarau}>Leer usuarios validos para la Oferta</button>
                        </div>                        
                    ) : (
                        <div>

                            <table className="table" id="tabla">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Aplica Oferta</th>
                                </tr>
                                </thead>
                                <tbody>
                                {r_usuarios.map((dato) => (
                                    <tr key={dato.username}>
                                    <td>{dato.username}</td>
                                    <td>{dato.nombre_usuario}</td>
                                    <td>{dato.apellido_usuario}</td>
                                    <td>{dato.nombre_rol}</td>
                                    <td>{dato.email}</td>
                                    <td>
                                        {dato.rol === '1' ? (
                                            <div>Si</div>
                                        ) : (
                                            <div>No</div>
                                        )}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>                                
                            </table>
                            <button className="mt-2" onClick={enviar_ofertas}>Enviar Ofertas</button>
                            <button className="mt-2" onClick={regresar_sel}>Regresar a Selección</button>
                        </div>
                    )}
                </div>
            ) : (<p></p>)}

            {/* ***Ventana Modal para Mensaje*** */}
            <Modal open={omodalElu} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <div>
                        <span>No se encontraron usuarios....</span>
                        <div className="spinner-border" role="status" />
                    </div>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}
            {/* ***Ventana Modal para Mensaje*** */}
            <Modal open={omodalLee} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <div>
                        <span>Leyendo Usuarios....</span>
                        <div className="spinner-border" role="status" />
                    </div>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}
            {/* ***Ventana Modal para Mensaje*** */}
            <Modal open={omodalEnv} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <div>
                        <span>Grabando Ofertas....</span>
                        <br/>
                        <span>Enviando Correos....</span>
                        <div className="spinner-border" role="status" />
                    </div>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}
            {/* ***Ventana Modal para Mensaje*** */}
            <Modal open={omodalEru} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <div>
                        <span>Debe indicar los Usuarios en la casilla correspondiente</span>
                        <div className="spinner-border" role="status" />
                    </div>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}

        </div>

    );
}

export default Ofertas;
