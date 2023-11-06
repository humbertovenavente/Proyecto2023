import React, { useState, useEffect } from 'react';
import './plantilla.css';
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

    const { isLoggedIn, l_user , l_rol} = useAuth();
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
        // console.log(idarticulo);
        setOper(0)
        setOper_c(0)
        leerarticulo(idarticulo)
    }, [])

    async function leerarticulo(id_art) {

        const response = await axios.post("http://localhost/proy/leerdetarticulo.php", {
            id_art: id_art
        })

        r_article = response.data.articulo
        // console.log(r_article)
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
                    // console.log(dato.tabu)
                }
            }
            )

            setComentarios(r_comentarios2);
        }

    }

    const grabarComentario = async (e) => {
        e.preventDefault();

        setOper_c(9)
        try {

            const response = await axios.post("http://localhost/proy/comentar.php", {
                v_articulo: idarticulo,
                v_nodopadre: '0',
                v_nodo: '0',
                v_nivel: '0',
                v_comentario: comment,
                v_username: l_user
            });

        } catch (error) {
            console.log("Error Grabando Comentario");
        } finally {

            const response = await axios.post("http://localhost/proy/leerdetarticuloscv.php", {
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

        try {

            const response = await axios.post("http://localhost/proy/comentar.php", {
                v_articulo: idarticulo,
                v_nodopadre: rnodo_padre,
                v_nodo: rnodo,
                v_nivel: rniv,
                v_comentario: respuesta,
                v_username: l_user
            });

        } catch (error) {
            console.log("Error Grabando Respuesta");
        } finally {

            const response = await axios.post("http://localhost/proy/leerdetarticuloscv.php", {
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

            response = await axios.post("http://localhost/proy/reportar.php", {
                id_articulo: idarticulo,
                nodo_padre: rpnodo_padre,
                nodo: rpnodo,
                nivel: rpniv,
                reporte: reporte,
                username: l_user
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
                    
                { ( ( l_rol === 0 || l_rol === 1 ) && parseInt(article.tipo_articulo) === 1 ) ?
                    <div>No puedes ver articulo Premium, suscribete...</div> 
                :
                <div id="general">

                    {article.plantilla === '1' ?
                        <div id="plantilla_1">
                            <div id="carouselExampleIndicators" className="carousel slide bg-light">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={article.imagen1} alt="..." className='mx-auto d-block' style={{ align: "center", height: "15rem" }} />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={article.imagen2} alt="..." className='mx-auto d-block' style={{ alignItems: "center", height: "15rem" }} />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={article.imagen3} alt="..." className='mx-auto d-block' style={{ alignItems: "center", height: "15rem" }} />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <h2 className="text-center m-5">{article.titulo_articulo}</h2>
                            <p><label className='fs-5 fw-bold'>Categoría: {article.nombre_categoria}</label></p>
                            <p><label className='fs-5 fw-bold'>SubCategoría: {article.nombre_subcategoria}</label></p>
                            <p><label className='fs-5 fw-bold'>Fecha Publicación: {article.fecha_publicacion}</label></p>
                            <div className="row us mb-4">
                                <div className="col-12 col-md-6">
                                    <p className="custom-font"> {article.contenido_articulo} </p>
                                </div>
                                <div className="col-12 col-md-6">
                                    <p className="custom-font"> {article.contenido_articulo2} </p>
                                </div>
                                <div className="col-12 col-md-6 mt-4 mt-md-0">
                                    <img className="img-fluid mb-4" src={article.imagen4} alt="Artículo" />
                                </div>
                                <div className="col-12 col-md-6 mt-4 mt-md-0">
                                    <img className="img-fluid mb-4" src={article.imagen5} alt="Artículo" />
                                </div>
                            </div>
                            <div className="row us mt-4">
                                <div className="col-12">
                                    <p className="custom-font"> {article.contenido_articulo3} </p>
                                </div>
                            </div>
                        </div>
                        : article.plantilla === '2' ?
                            <div id="plantilla_2">
                                <div id="carouselExampleIndicators" className="carousel slide mb-5 mt-4">
                                    <div id="carouselExampleIndicators" className="carousel slide">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={article.imagen1} alt="..." className='mx-auto d-block' style={{ align: "center", height: "15rem" }} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={article.imagen2} alt="..." className='mx-auto d-block' style={{ align: "center", height: "15rem" }} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={article.imagen3} alt="..." className='mx-auto d-block' style={{ align: "center", height: "15rem" }} />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <h1 className="text-center mb-5">{article.titulo_articulo}</h1>
                                <div className="row mb-5">
                                    <div className="col-md-8">
                                        <p className="lead">{article.contenido_articulo}</p>
                                        <header>
                                            <blockquote className="blockquote text-center">
                                                <p>{article.cita_relevante}</p>
                                            </blockquote>
                                        </header>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded mb-3" src={article.imagen4} alt="Imagen asociada al artículo" />
                                        <figcaption className="text-muted">Descripción de la imagen.</figcaption>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <img className="img-fluid rounded mb-3" src={article.imagen5} alt="Imagen 2 del artículo" />
                                        <figcaption className="text-muted">Descripción de la segunda imagen.</figcaption>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="lead">{article.contenido_articulo2}</p>
                                    </div>
                                </div>
                                <p className="lead"> {article.contenido_articulo3} </p>

                            </div>
                            :
                            <div>
                                {/* <p>Plantilla 3</p> */}
                                <h3 className="text-center my-4">Artículo de Revista</h3>

                                <img src={article.imagen1} className="d-block" alt="Imagen 1" style={{ align: "center", height: "15rem" }}/>
                                <p style={{ fontSize: "0.8rem" }}><b>{article.imagen1_desc}</b></p>

                                <section className="article-content mt-5">
                                    <h2 className="text-center mb-4">{article.titulo_articulo}</h2>

                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <img className="img-fluid" src={article.imagen2} alt="Imagen artículo 1" />
                                            <p style={{ fontSize: "0.8rem" }}><b>{article.imagen2_desc}</b></p>
                                            <img className="img-fluid" src={article.imagen3} alt="Imagen artículo 2" />
                                            <p style={{ fontSize: "0.8rem" }}><b>{article.imagen3_desc}</b></p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{article.contenido_articulo}</p>
                                            <p className='mt-2'>{article.contenido_articulo2}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>{article.contenido_articulo3}</p>                                        
                                        </div>
                                        <div className="col-md-6">
                                            <img className="img-fluid" src={article.imagen4} alt="Imagen artículo 4" />
                                            <p style={{ fontSize: "0.8rem" }}><b>{article.imagen4_desc}</b></p>
                                            <img className="img-fluid" src={article.imagen5} alt="Imagen artículo 5" />
                                            <p style={{ fontSize: "0.8rem" }}><b>{article.imagen5_desc}</b></p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                    }

                    <div id="bloque_comentarios">
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
                                ) : oper_c === 2 ? (
                                    <p></p>
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
}
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

