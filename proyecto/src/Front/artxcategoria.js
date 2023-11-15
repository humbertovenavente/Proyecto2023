import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

var r_articles = [];
var r_categorias = [];
var r_categorias2 = [];
// var sel_articles = [];
var m_categoriaAct = ""
var sel_articles = [];
var l_l_rol;

const ArtxCategoria = () => {


    let navigate = useNavigate();
    const [s_articles, setS_articles] = useState([]);
    const [articles, setArticles] = useState([]);
    // const [s_articles, setS_articles] = useState([]);
    const [oper, setOper] = useState(0);
    const [suboper, setsubOper] = useState(0);
    const [categoriaAct, setCategoriaAct] = useState([]);
    // const [datos, setDatos] = useState([]);

    l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

    useEffect(() => {
        r_articles = []
        leercategorias()
        m_categoriaAct = ""
        setOper(0)
        setsubOper(0)
    }, [])

    async function leercategorias() {
        try {
            r_categorias = [];
            r_categorias2 = [];
            const response = await axios.get("http://localhost/proy/categorias.php")
            r_categorias = response.data
            // console.log(r_categorias)
            if (r_categorias.length >= 1) {
                console.log(l_l_rol)
                if (l_l_rol === 0 || l_l_rol === 1 || isNaN(l_l_rol) ) {
                    r_categorias2 = r_categorias.filter(x => x.premium != 'X')
                } else {
                    r_categorias2 = r_categorias
                }                

                setCategoriaAct(r_categorias2);
            }
        } catch (error) {
            console.log("send data error");
        } finally {
            setOper(1)
        }

    }

    const verDetalle = (id) => {
      // console.log(id)
      setOper(1);
      var i = 0;
      var found = false;
      sel_articles = [];
      for (i = 0; i < r_articles.length && !found; i++) {
        if (r_articles[i].id_articulo === id) {
          found = true;
          break;
        }
      }
      sel_articles[0] = r_articles[i];
      setS_articles(sel_articles);

      return navigate(`/articulo/${sel_articles[0].id_articulo}`)
    };
  
    function regresar_a() {
      setOper(0);
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
            const response = await axios.post("http://localhost/proy/artxcategoria.php", {
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
                        {r_categorias2.map((dato) => (                
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
                                        <button id='but' onClick={() => verDetalle(article.id_articulo)}>Ver Detalle</button>
                                        {article.tipo_articulo === '1' &&
                                            <div style={{ height: "1.2rem" , backgroundColor:"green"}}>* Articulo premium *</div>}
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

            
        </div>
    );

}

export default ArtxCategoria;