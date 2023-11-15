import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

var r_articles = [];
var r_categorias = [];
var m_categoriaAct = "";
var response = ''
var lee_categoria = 0;
var sel_articles = [];

var l_l_rol;
var r_categorias2 = [];

const Buscador = () => {


    let navigate = useNavigate();
    const [s_articles, setS_articles] = useState([]);

    l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

    const [articles, setArticles] = useState([]);
    const [oper, setOper] = useState(0);
    const [categoriaAct, setCategoriaAct] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');   
    const [fecha, setFecha] = useState('');  

    useEffect(() => {
        lee_categoria = 0;
        setCategoriaAct('');
        m_categoriaAct = "";
    }, [])

    useEffect(() => {
        if (lee_categoria === 0) {
            setOper(0)
            // console.log('paso')
            leercategorias()
        }

        const getData = setTimeout(() => {
            // console.log(categoriaAct)
            buscar_articulos(categoriaAct, titulo, autor, fecha)
        }, 750)

        return () => clearTimeout(getData)

        // r_articles = []

    }, [titulo, autor, categoriaAct,fecha])

    async function leercategorias() {
        try {
            r_categorias = [];
            r_categorias2 = [];
            response = await axios.get("http://localhost/proy/categorias.php")
            
        } catch (error) {
            console.log(error);
        } finally {
            setOper(1)
            r_categorias = response.data

            if (r_categorias.length >= 1) {
                // console.log(l_l_rol)
                if (l_l_rol === 0 || l_l_rol === 1 || isNaN(l_l_rol) ) {
                    r_categorias2 = r_categorias.filter(x => x.premium != 'X')
                } else {
                    r_categorias2 = r_categorias
                }                

                // setCategoriaAct(r_categorias2);
            }
            // console.log(r_categorias)
            lee_categoria = 1;
        }
    }

    function selCategoria(cat) {
        m_categoriaAct = cat
        setCategoriaAct(m_categoriaAct)
    }

    async function buscar_articulos(v_categoriaAct, v_titulo, v_autor, v_fecha) {
        try {
            r_articles = []
            // console.log(v_fecha);
            // console.log(v_fecha.getFullYear() + '-' + `${(v_fecha.getMonth()+1)}`.padStart(2,'0') + '-' + `${(v_fecha.getDate()+1)}`.padStart(2,'0'),);
            response = await axios.post("http://localhost/proy/buscadorarticulos.php", {
                id_cat: v_categoriaAct,
                id_titulo: v_titulo,
                id_autor: v_autor,
                id_fecha: v_fecha
            })
            r_articles = response.data
            // if (r_articles.length >= 1) {
                setArticles(r_articles);
            // }
        } catch (error) {
            console.log(response);
            // console.log(error);
        } finally {
            console.log(response.data)
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

    return (
        <div>
            <h1>Buscador</h1>

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

                    <label htmlFor="titulo" >Autor</label>
                    <input type="text" id="autor" name="autor" value={autor} onChange={(e) => setAutor(e.target.value)} />

                    <label htmlFor="titulo" >Texto en Titulo o Contenido</label>
                    <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                    <label htmlFor="fecha" >Fecha de Publicación</label>
                    <input type="date" id="fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />

                    <div>

                        <hr />
                        <h3 style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>Resultados de Búsqueda</h3>

                        <div className="card-container" style={{ display: "flex", columnGap: "2.5rem", rowGap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                            {r_articles.map((article, index) => (
                                <div key={index} className="card" style={{ minWidth: "15rem", width: "30%" }}>
                                    <div className="card-footer text-center" style={{ height: "2.5rem" }}>

                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{article.titulo_articulo}</h5>
                                        <p className="card-text oculto">{article.id_articulo}</p>
                                        <p className="card-text">Category: {article.nombre_categoria}</p>
                                        <p className="card-text">Subcategory: {article.nombre_subcategoria}</p>
                                        <p className="card-text">Autor: {article.username}</p>
                                        <p className="card-text">Fecha Publicación: {article.fecha_publicacion}</p>
                                        <p className="card-text">Description: {article.contenido_articulo.substring(0,50)}...</p>
                                    </div>
                                    <div className="card-footer mx-auto">
                                        <button id='but' onClick={() => verDetalle(article.id_articulo)}>Ver Detalle</button>
                                        {article.tipo_articulo === '1' &&
                                                <div style={{ height: "1.2rem" , backgroundColor:"green"}}>* Articulo premium *</div>}
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            ) : (
                <p></p>
            )
            }
        </div>
    );

}

export default Buscador;
