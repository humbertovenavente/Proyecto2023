import React, { useState, useEffect } from 'react';
import axios from 'axios';

var r_articles = [];
var r_categorias = [];
// var sel_articles = [];
var m_categoriaAct = ""

const ArtxCategoria = () => {

    const [articles, setArticles] = useState([]);
    // const [s_articles, setS_articles] = useState([]);
    const [oper, setOper] = useState(0);
    const [suboper, setsubOper] = useState(0);
    const [categoriaAct, setCategoriaAct] = useState([]);
    // const [datos, setDatos] = useState([]);

    useEffect(() => {
        r_articles = []
        leercategorias()
        setOper(0)
        setsubOper(0)
    }, [])

    async function leercategorias() {
        try {
            const response = await axios.get("http://gregserver/apisP/categorias.php")
            r_categorias = response.data
            // console.log(r_categorias)
            if (r_categorias.length >= 1) {
                setCategoriaAct(r_categorias);
            }
        } catch (error) {
            console.log("send data error");
        } finally {
            setOper(1)
        }

    }

    // const verDetalle = (id) => {
    //     // console.log(id)
    //     setOper(1)
    //     var i = 0
    //     var found = false;
    //     sel_articles = []
    //     for (i = 0; i < r_articles.length && !found; i++) {
    //         if (r_articles[i].id_articulo === id) {
    //             found = true;
    //             break;
    //         }
    //     }
    //     sel_articles[0] = r_articles[i]
    //     setS_articles(sel_articles)
    // };

    // function regresar_a() {
    //     setOper(0);
    // }

    function selCategoria(cat) {
        m_categoriaAct = cat
        setCategoriaAct(m_categoriaAct)
        setsubOper(1)
        setArticles([]);
        leerarticulosxcat(m_categoriaAct)
    }

    async function leerarticulosxcat(id_cat) {
        try {
            // console.log(id_cat)
            const response = await axios.post("http://gregserver/apisP/artxcategoria.php", {
                id_cat: id_cat
            })
            // console.log(response.data)
            r_articles = response.data
            if (r_articles.length >= 1) {
                setArticles(r_articles);
            }            
        } catch (error) {
            console.log(error);
        } finally {
            setsubOper(2)
        }

    }

    return (
        <div>
            <h1>Artículos x Categoría</h1>

            {oper === 0 ? (
                <div>
                    <span>Leyendo Categorias, espere..</span>
                    <div className="spinner-border" role="status" />
                </div>
            ) : oper === 1 ? (
                <div>
                    <select id="categoria" name="categoria" value={m_categoriaAct} onChange={e => (selCategoria(e.target.value))}>
                        <option value="" key={""}>Seleccione una categoria</option>
                        {r_categorias.map((dato) => (
                            <option value={dato.id_categoria} key={dato.id_categoria}>{dato.nombre_categoria}</option>
                        ))}
                    </select>

                    {suboper === 0 ? (
                        <p>Seleccione Categoría para Mostrar Artículos...</p>
                    ) : suboper === 1 ? (
                        <div>
                            <span>Leyendo Artículos.....</span>
                        <div className="spinner-border" role="status" />
                    </div>
                    ) : suboper === 2 ? (
                        <div className="card-container" style={{ display: "flex", columnGap: "2.5rem", rowGap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                            {articles.map((article, index) => (
                                <div key={index} className="card" style={{ minWidth: "15rem", width: "30%" }}>
                                    <div className="card-footer">
                                        <img src={article.image} className="card-img-top" alt={article.title} />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{article.titulo_articulo}</h5>
                                        <p className="card-text oculto">{article.id_articulo}</p>
                                        <p className="card-text">Description: {article.contenido_articulo}</p>
                                        <p className="card-text">Category: {article.nombre_categoria}</p>
                                        <p className="card-text">Subcategory: {article.nombre_subcategoria}</p>
                                    </div>
                                    <div className="card-footer mx-auto">
                                        {/* <button id='but' onClick={() => verDetalle(article.id_articulo)}>Ver Detalle</button> */}
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <p></p>
                    )}

                </div>

            ) : (
                <p></p>
            )
            }

            {/* {oper === 0 ? (

                <div>
                    <h3 style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>10 Últimos Artículos</h3>

                    <div className="card-container" style={{ display: "flex", columnGap: "2.5rem", rowGap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>

                        {articles.map((article, index) => (

                            <div key={index} className="card" style={{ minWidth: "15rem", width: "30%" }}>
                                <div className="card-footer">
                                    <img src={article.image} className="card-img-top" alt={article.title} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{article.titulo_articulo}</h5>
                                    <p className="card-text oculto">{article.id_articulo}</p>
                                    <p className="card-text">Description: {article.contenido_articulo}</p>
                                    <p className="card-text">Category: {article.nombre_categoria}</p>
                                    <p className="card-text">Subcategory: {article.nombre_subcategoria}</p>
                                </div>
                                <div className="card-footer mx-auto">
                                    <button id='but' onClick={() => verDetalle(article.id_articulo)}>Ver Detalle</button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            ) : oper === 1 ? (

                <div>
                    <button onClick={regresar_a}>Regresar a la Lista</button>

                    <div className="d-flex justify-content-center align-items-center">

                        {s_articles.map((sarticle, index2) => (

                            <div key={index2} className="bg-white p-4">
                                <h1 className="text-center">{ sarticle.titulo_articulo }</h1>
                                <section className="container">
                                    <div className="row">
                                        <div className="col-md-4 d-flex">
                                            <div className="bg-primary p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> 
                                                <p className="text-center fs-4">{ sarticle.contenido_articulo }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div className="bg-success p-3 w-100 d-flex flex-column align-items-center justify-content-center text-white"> 
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/previews/009/784/979/non_2x/soccer-ball-icon-isolated-on-white-background-free-vector.jpg"
                                                    alt="Pelota de fútbol"
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 d-flex">
                                            <div className="bg-warning p-3 w-100 d-flex flex-column"> 
                                                <label className='fs-5 fw-bold'>Categoría</label>
                                                <p className='fw-bold' style={{ marginLeft: "1em" }}>{ sarticle.nombre_categoria }</p>                                                
                                                <label className='fs-5 fw-bold'>SubCategoría</label>
                                                <p className='fw-bold' style={{ marginLeft: "1em" }}>{ sarticle.nombre_subcategoria }</p>                                                
                                                <label className='fs-5 fw-bold'>Fecha Publicación</label>
                                                <p className='fw-bold' style={{ marginLeft: "1em" }}>{ sarticle.fecha_publicacion }</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (

                <p></p>

            )} */}
        </div>
    );

}

export default ArtxCategoria;