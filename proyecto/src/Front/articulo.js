import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import { useAuth } from './AuthContext';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

var r_article = [];
var r_comentarios = [];
var r_comentarios2 = [];
var response;

const Articulo = () => {

    const { isLoggedIn, l_user } = useAuth();
    const [article, setArticle] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [oper, setOper] = useState(0);
    const [oper_c, setOper_c] = useState(0);
    const [oper_r, setOper_r] = useState(0);

    // *** Manejo de Ventana Modal ***
    const [comment, setComment] = useState('');
    const [omodalComentar, setomodalComentar] = useState(false);
    const handleOpenComentar = () => setomodalComentar(true);
    const handleCloseComentar = () => {
        setomodalComentar(false)
        setComment('')
        setOper_c(0)
        setOper_r(0)
    };
    //Responder
    const [respuesta, setRespuesta] = useState('');
    const [omodalResponder, setomodalResponder] = useState(false);
    const [rniv, setRniv] = useState(0);
    const [rnodo_padre, setRnodo_padre] = useState('');
    const [rnodo, setRnodo] = useState('');
    const handleCloseResponder = () => {
        setomodalResponder(false)
        setRespuesta('')
        setOper_c(0)
    };
    //Reportar
    const [reporte, setReporte] = useState('');
    const [omodalReportar, setomodalReportar] = useState(false);
    const [rpniv, setRPniv] = useState(0);
    const [rpnodo_padre, setRPnodo_padre] = useState('');
    const [rpnodo, setRPnodo] = useState('');
    const handleCloseReportar = () => {
        setomodalReportar(false)
        setReporte('')
        setOper_c(0)
    };
    // *** Manejo de Ventana Modal ***

    let { idarticulo } = useParams()

    useEffect(() => {
        setOper(0)
        setOper_c(0)
        // setRol(l_rol)
        // console.log(l_rol)
        leerarticulo(idarticulo)
        // console.log(article)
    }, [])

    async function leerarticulo(id_art) {

        try {
            // const response = await axios.post("http://gregserver/apisP/leerdetarticulo.php", {
            response = await axios.post("http://gregserver/apisP/leerdetarticulo.php", {
                id_art: id_art
            })            

        } catch (error) {
            console.log(error)
        } finally {


        console.log(response.data.articulo)
        console.log(response.data.comentarios)


        r_article = response.data.articulo
        if (r_article.length >= 1) {
            setArticle(r_article[0]);
            setOper(1)
        }

        r_comentarios = response.data.comentarios

        r_comentarios2 = [];
        if (r_comentarios.length >= 1) {

            r_comentarios2 = r_comentarios.map(item => {
                return {
                    comentario: item.comentario,
                    id_articulo: item.id_articulo,
                    id_comentario: item.id_comentario,
                    nodo: item.nodo,
                    nodo_padre: item.nodo_padre,
                    nivel: item.nivel,
                    username: item.username,
                    tabu: ''
                }
            });

            r_comentarios2.map(function (dato) {
                var tabc = parseInt(dato.nivel)
                for (var i = 1; i < tabc; i++) {
                    dato.tabu = dato.tabu + '____'
                }
            }
            )

              setComentarios(r_comentarios2);
        }
    }

    }

    const grabarComentario = async (e) => {
        e.preventDefault();

        setOper_c(9)
        try {

            const response = await axios.post("http://gregserver/apisP/comentar.php", {
                v_articulo: idarticulo,
                v_nodopadre: '0',
                v_nodo: '0',
                v_nivel: '0',
                v_comentario: comment,
                v_username: l_user
            });

        } catch (error) {
            console.log(error);
        } finally {

            const response = await axios.post("http://gregserver/apisP/leerdetarticulo.php", {
                id_art: idarticulo
            })

            r_comentarios = response.data.comentarios
            r_comentarios2 = [];

            if (r_comentarios.length >= 1) {

                r_comentarios2 = [];
                r_comentarios2 = r_comentarios.map(item => {
                    return {
                        comentario: item.comentario,
                        id_articulo: item.id_articulo,
                        id_comentario: item.id_comentario,
                        nodo: item.nodo,
                        nodo_padre: item.nodo_padre,
                        nivel: item.nivel,
                        username: item.username,
                        tabu: ''
                    }
                });

                r_comentarios2.map(function (dato) {
                    var tabc = parseInt(dato.nivel)
                    for (var i = 1; i < tabc; i++) {
                        dato.tabu = dato.tabu + '____'
                    }
                }
                )

                setComentarios(r_comentarios2);
            }
            setOper_c(0)

        }
        setComment('');
        handleCloseComentar();
    };

    const grabarRespuesta = async (e) => {
        e.preventDefault();

        // setOper_c(2)
        try {

            const response = await axios.post("http://gregserver/apisP/comentar.php", {
            v_articulo   : idarticulo,
            v_nodopadre  : rnodo_padre,
            v_nodo       : rnodo,
            v_nivel      : rniv,
            v_comentario : respuesta,
            v_username   : l_user
            });

            // console.log(response.data)

        } catch (error) {
           console.log("Error Grabando Respuesta");
        } finally {

            const response = await axios.post("http://gregserver/apisP/leerdetarticulo.php", {
                id_art: idarticulo
            })

            r_comentarios = response.data.comentarios
            r_comentarios2 = [];

            if (r_comentarios.length >= 1) {

                r_comentarios2 = [];
                r_comentarios2 = r_comentarios.map(item => {
                    return {
                        comentario: item.comentario,
                        id_articulo: item.id_articulo,
                        id_comentario: item.id_comentario,
                        nodo: item.nodo,
                        nodo_padre: item.nodo_padre,
                        nivel: item.nivel,
                        username: item.username,
                        tabu: ''
                    }
                });

                r_comentarios2.map(function (dato) {
                    var tabc = parseInt(dato.nivel)
                    for (var i = 1; i < tabc; i++) {
                        dato.tabu = dato.tabu + '____'
                    }
                }
                )

                setComentarios(r_comentarios2);  
            }  
            setOper_c(0)

        }
        setRespuesta('');
        handleCloseResponder();
    };

    const grabarReporte = async (e) => {
        e.preventDefault();

        setOper_r(1)
        try {

            // console.log(idarticulo, rpnodo_padre, rpnodo, rpniv, reporte, l_user)

            response = await axios.post("http://gregserver/apisP/reportar.php", {
            id_articulo : idarticulo,
            nodo_padre  : rpnodo_padre,
            nodo        : rpnodo,
            nivel       : rpniv,
            reporte     : reporte,
            username    : l_user
            });

        } catch (error) {
           console.log("Error Grabando Respuesta");
        } finally {
            setOper_r(0)
        }
        setReporte('');
        handleCloseReportar();
    };

    const respComentario = (dniv, dnodo_padre, dnodo) => {
        setOper_c(2)
        setomodalResponder(true)
        setRniv(dniv);
        setRnodo_padre(dnodo_padre);
        setRnodo(dnodo);
    };

    const reporComentario = (dniv, dnodo_padre, dnodo) => {
        setOper_c(2)
        setomodalReportar(true)
        setRPniv(dniv);
        setRPnodo_padre(dnodo_padre);
        setRPnodo(dnodo);
    };

    // return (
    //     <div>
    //         <h1>Test</h1>
    //     </div>
    // )

    return (

        <div>
            {oper === 0 ? (
                <div>
                    <span>Leyendo artículo y comentarios....</span>
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Detalle del Artículo</h3>
                    <p>ID del Artículo: <b>{idarticulo}</b></p>

                    {/* <button onClick={regresar_a}>Regresar a la Lista</button> */}
                    <h1 className="text-center">{article.titulo_articulo}</h1>
                    <div className="d-flex justify-content-center align-items-center">
                        <section className="container">
                            <div className="row">
                                <div className="col-md-4 d-flex">
                                    <div className="bg-primary p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> {/* Cuadro azul */}
                                        <p className="text-center fs-4">{article.contenido_articulo}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="bg-success p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> {/* Cuadro verde */}
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg"
                                            alt="Pelota de fútbol"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="bg-warning p-3 w-100 d-flex flex-column"> {/* Cuadro amarillo */}
                                        <label className='fs-5 fw-bold'>Categoría</label>
                                        <p className='fw-bold' style={{ marginLeft: "1em" }}>{article.nombre_categoria}</p>
                                        <label className='fs-5 fw-bold'>SubCategoría</label>
                                        <p className='fw-bold' style={{ marginLeft: "1em" }}>{article.nombre_subcategoria}</p>
                                        <label className='fs-5 fw-bold'>Fecha Publicación</label>
                                        <p className='fw-bold' style={{ marginLeft: "1em" }}>{article.fecha_publicacion}</p>
                                    </div>
                                </div>
                            </div>

                        </section>

                    </div>

                    <div>
                        <h3>Comentarios</h3>
                        {comentarios.map((dato) => (
                            <div className='d-flex' key={dato.id_comentario}>
                                <p>{dato.tabu} </p>
                                <p>{dato.nodo} - </p>
                                <p className='oculto'>{dato.nivel} - </p>
                                <p className='oculto'>{dato.nodo_padre} - </p>
                                <p><b>&nbsp; {dato.username}&nbsp;--&nbsp;</b></p>
                                <p>{dato.comentario}&nbsp;&nbsp;&nbsp;&nbsp;</p>

                                {isLoggedIn ? (
                                    <div className='d-flex'>
                                        <Button id='but' className='fs-0.3' onClick={() => respComentario(dato.nivel, dato.nodo_padre, dato.nodo)}><b>Responder</b></Button>
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <Button id='but' className='fs-0.3' onClick={() => reporComentario(dato.nivel, dato.nodo_padre, dato.nodo)}><b>Reportar</b></Button>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        {isLoggedIn ? (

                            <div>
                                {oper_c === 0 ? (
                                    <div>
                                        <hr />
                                        {/* <Button id='but_com' onClick={() => setOper_c(1)}><b>Comentar</b></Button> */}
                                        <Button id='but_com' onClick={handleOpenComentar}><b>Comentar</b></Button>
                                    </div>
                                    // ) : oper_c === 1 ? (
                                    //     <div className="row">
                                    //         <hr />
                                    //         <div className="d-flex">
                                    //             <input className="form-control" type="text" id="comments " placeholder='Ingrese Comentario' onChange={(e) => setComment(e.target.value)} required />
                                    //             <button id='but_com' onClick={comentar}>Enviar</button>
                                    //             <button id='but_com' onClick={() => setOper_c(0)}>Cancelar</button>
                                    //         </div>
                                    //     </div>
                                    ) : oper_c === 2 ? (
                                        <p></p>
                                    //     <div className="d-flex">
                                    //         <input className="form-control" type="text" id="comments " placeholder='Ingrese Respuesta' onChange={(e) => setRespuesta(e.target.value)} required />
                                    //         <button id='but_com' onClick={responder}>Responder</button>
                                    //         <button id='but_com' onClick={() => setOper_c(0)}>Cancelar</button>
                                    //     </div>
                                ) : (
                                    <div>
                                        <span>Grabando Comentarios, espere..</span>
                                        <div className="spinner-border" role="status" />
                                    </div>
                                )}

                            </div>

                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            )}

            {/* ***Ventana Modal para Comentar*** */}
            <Modal open={omodalComentar} onClose={handleCloseComentar} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <TextField id="comments" label='Comentario' minRows={1} value={comment} onChange={(e) => setComment(e.target.value)} fullWidth />
                    <Button onClick={grabarComentario}>Guardar</Button>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Comentar*** */}

            {/* ***Ventana Modal para Responder*** */}
            <Modal open={omodalResponder} onClose={handleCloseResponder} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    <label>Respuesta al Comentario: {rnodo}</label>
                    <p></p>
                    <TextField id="respuesta" label='Respuesta' minRows={1} value={respuesta} onChange={(e) => setRespuesta(e.target.value)} fullWidth />
                    <Button onClick={grabarRespuesta}>Enviar Respuesta</Button>
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}

                {/* ***Ventana Modal para Reportar*** */}
                <Modal open={omodalReportar} onClose={handleCloseReportar} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
                    {oper_r === 0 ? (
                        <div>
                            <label>Motivo del Reporte: {rnodo}</label>
                            <p></p>
                            <TextField id="reporte" label='Reporte' minRows={1} value={reporte} onChange={(e) => setReporte(e.target.value)} fullWidth />
                            <Button onClick={grabarReporte}>Enviar Reporte</Button>
                        </div>
                    ) : (
                        <div>
                            <span>Grabando Reporte, espere..</span>
                            <div className="spinner-border" role="status" />                            
                        </div>
                    )}
                </Box>
            </Modal>
            {/* ***Ventana Modal para Responder*** */}

        </div>
    )
}

export default Articulo