import React, { useState, useEffect} from 'react';
import './plantilla.css';
import { useParams , useNavigate} from "react-router-dom"
import axios from 'axios';
import { useAuth } from './AuthContext';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

var r_article = [];
var response;

const VerMisArts = () => {

    let navigate = useNavigate();

    const [omodalPubli, setomodalPubli] = useState(false);
    const [omodalRecha, setomodalRecha] = useState(false);

    const { isLoggedIn, l_user } = useAuth();
    const [article, setArticle] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [oper, setOper] = useState(0);
    const [oper_c, setOper_c] = useState(0);
    const [oper_r, setOper_r] = useState(0); 
    

    let { idarticulo } = useParams()

    useEffect(() => {
        // console.log(idarticulo);
        setOper(0)
        setOper_c(0)
        leerarticulo(idarticulo)
    }, [])

    async function leerarticulo(id_art) {

        try {
            console.log(idarticulo);
            response = await axios.post("http://gregserver/apisP/leermisarticulos.php", {
            id_art: id_art
        })

        } catch (error) {
            console.log(error);
        } finally {
            console.log(response.data);
            r_article = response.data
            // console.log(r_article)
            if (r_article.length >= 1) {
                setArticle(r_article[0]);
            }
            setOper(1)
        }
    }


    return (

        <div>
            {oper === 0 ? (
                <div>
                    <span>Leyendo artículo</span>
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            ) : (

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
                    

                </div>

                
            )}



        </div>

        
    )
}
export default VerMisArts

