import React, { useState, useEffect } from 'react';
import axios from 'axios';

var a_subcategoria = '';
var em_subcategoria = '';
var em_id_subcategoria = '';
var em_st_subcategoria = '';
var r_subcategorias = [];
var r_categorias = [];
var m_categoriaAct = ""

const SubCategoria = () => {

    const [datos, setDatos] = useState([]);
    const [datos2, setDatos2] = useState([]);
    const [oper, setOper] = useState(0);
    const [categoriaAct, setCategoriaAct] = useState('');
    const [e_subcategoria, sete_subcategoria] = useState('');
    const [e_id_subcategoria, sete_id_subcategoria] = useState('');
    const [e_st_subcategoria, sete_st_subcategoria] = useState('');

    useEffect(() => {
        setOper(0);
        leersubcategorias()
        leercategorias()
    }, [])

    async function leersubcategorias() {
        const response = await axios.get("http://gregserver/apisP/subcategorias.php")
        r_subcategorias = response.data
        if (r_subcategorias.length >= 1) {
            setDatos(r_subcategorias);
        }
    }

    async function leercategorias() {
        const response = await axios.get("http://gregserver/apisP/categorias.php")
        r_categorias = response.data
        if (r_categorias.length >= 1) {
            setDatos2(r_categorias);
        }
    }

    const agregarCategoria = () => {
        setOper(1);
    };

    const guardarSubCategoria = async (e) => {
        e.preventDefault();

        if (a_subcategoria === "") {
            alert("El Nombre de Sub-Categoría es Obligatorio");
        } else if (categoriaAct === "") {
            alert("Categoría obligatoria, Seleccione una");
            // setOper(7)
            // setTimeout(() => {
            //     setOper(1)
            // }, 2000);
        } else {

            setOper(9);
            try {
                console.log(a_subcategoria + categoriaAct)
                const response = await axios.post("http://gregserver/apisP/crearsubcategoria.php", {
                    subcategoria: a_subcategoria,
                    id_categoria: categoriaAct
                });

            } catch (error) {
                console.log("send data error");
            } finally {

                const response = await axios.get("http://gregserver/apisP/subcategorias.php")
                r_subcategorias = response.data
                if (r_subcategorias.length >= 1) {
                    setDatos(r_subcategorias);
                }
                a_subcategoria = ""
                m_categoriaAct = ""
                setCategoriaAct(m_categoriaAct)
                setOper(0);
            }

        }

    };

      const actualizarSubCategoria = async (e) => {
        e.preventDefault();
        setOper(9);
        try {
            // console.log(em_id_subcategoria)
            // console.log(em_subcategoria)
            // console.log(em_st_subcategoria)
            // console.log(m_categoriaAct)
          const response = await axios.post("http://gregserver/apisP/actualizasubcategoria.php", {
            subcategoria: em_id_subcategoria,
            nsubcategoria: em_subcategoria,
            ssubcategoria: em_st_subcategoria,
            idcategoria: m_categoriaAct
          });
    //       // console.log(response)

        } catch (error) {
          console.log("send data error");
        } finally {

          const response = await axios.get("http://gregserver/apisP/subcategorias.php")
          r_subcategorias = response.data
          if (r_subcategorias.length >= 1) {
            setDatos(r_subcategorias);
          }
          a_subcategoria = ""
          m_categoriaAct = ""
          setCategoriaAct(m_categoriaAct)
          setOper(0);
        }
      };

    const editarSubcategoria = (id) => {
        setOper(2)
        var i = 0
        var found = false;
        for (i = 0; i < r_subcategorias.length && !found; i++) {
            if (r_subcategorias[i].id_subcategoria === id) {
                found = true;
                break;
            }
        }
        em_id_subcategoria = r_subcategorias[i].id_subcategoria
        sete_id_subcategoria(em_id_subcategoria)
        em_subcategoria = r_subcategorias[i].nombre_subcategoria
        sete_subcategoria(em_subcategoria)
        em_st_subcategoria = r_subcategorias[i].activo
        sete_st_subcategoria(em_st_subcategoria)
        m_categoriaAct = r_subcategorias[i].id_categoria
        setCategoriaAct(m_categoriaAct)
    };

      function cambiaActivo() {
        if (em_st_subcategoria === 'X') {
          em_st_subcategoria = ''
        } else {
          em_st_subcategoria = 'X'
        }
        sete_st_subcategoria(em_st_subcategoria)
      }

    function regresar() {
        em_id_subcategoria = ''
        sete_id_subcategoria(em_id_subcategoria)
        em_subcategoria = ''
        sete_subcategoria(em_subcategoria)
        em_st_subcategoria = ''
        sete_st_subcategoria(em_st_subcategoria)
        setOper(0);
    }

    function regresar_a() {
        a_subcategoria = ''
        setOper(0);
    }

    const handleInputChange = (e, type) => {
        const valor = e.target.value;
        switch (type) {
            case "a_subcategoria":
                a_subcategoria = valor
                break;
            case "e_subcategoria":
                em_subcategoria = valor
                sete_subcategoria(em_subcategoria)
                break;
            case "e_id_subcategoria":
                em_id_subcategoria = valor
                sete_subcategoria(em_id_subcategoria)
                break;
            default:
        }
    }

    function selCategoria(cat) {
        m_categoriaAct = cat
        setCategoriaAct(m_categoriaAct)
    }

    return (

        <div>
            {oper === 0 ? (
                <div>
                    <table className="table" id="tabla">
                        <thead>
                            <tr>
                                <th className=''>ID</th>
                                <th>Sub-Categoría</th>
                                <th>Activo</th>
                                <th>Categoría</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((dato) => (
                                <tr key={dato.id_subcategoria}>
                                    <td className=''>{dato.id_subcategoria}</td>
                                    <td>{dato.nombre_subcategoria}</td>
                                    <td>{dato.activo}</td>
                                    <td>{dato.nombre_categoria}</td>
                                    <td><button id='but' onClick={() => editarSubcategoria(dato.id_subcategoria)}>Editar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={agregarCategoria}>Agregar Sub-Categoria</button>
                </div>
            ) : oper === 1 ? (
                <div>
                    <label>Agregar</label>
                    <label className="form-label">Sub-Categoría</label>
                    <input type="text" onChange={(e) => handleInputChange(e, "a_subcategoria")} id="a_subcategoria" placeholder='Sub-Categoría' />
                    <select id="categoria" name="categoria" value={categoriaAct} onChange={(cat) => (selCategoria(cat.target.value))} required>
                        <option value="" key={""}>Seleccione una categoria</option>
                        {datos2.map((dato2) => (
                            <option value={dato2.id_categoria} key={dato2.id_categoria}>{dato2.nombre_categoria}</option>
                        ))}
                    </select>
                    <button onClick={guardarSubCategoria}>Guardar</button>
                    <button onClick={regresar_a}>Regresar</button>
                </div>
            ) : oper === 2 ? (
                <div>
                    <label>Edición de Sub-Categoría</label>
                    <br /><br />
                    <input type="text" onChange={(e) => handleInputChange(e, "e_id_subcategoria")} id="e_id_subcategoria" value={e_id_subcategoria} className='oculto' />
                    <label className="form-label">Sub-Categoría</label>
                    <input type="text" onChange={(e) => handleInputChange(e, "e_subcategoria")} value={e_subcategoria} id="e_subcategoria" placeholder='Sub-Categoría' />

                    <select id="categoria" name="categoria" value={categoriaAct} onChange={(cat) => (selCategoria(cat.target.value))} required> 
                        {datos2.map((dato2) => (
                            <option value={dato2.id_categoria} key={dato2.id_categoria}>{dato2.nombre_categoria}</option>
                        ))} 
                    </select>

                    <label className="form-label">Activo</label>
                    <input type="text" onChange={(e) => handleInputChange(e, "e_st_subcategoria")} id="e_st_subcategoria" value={e_st_subcategoria} />
                    <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
                    <br /><br />
                    <button onClick={actualizarSubCategoria}>Grabar Datos</button>
                    <button onClick={regresar}>Regresar</button>
                </div>
            ) : oper === 8 ? (
                <div>
                    {/* <span>Leyendo Categorias, espere..</span>
                    <div className="spinner-border" role="status" /> */}
                </div>
            ) : oper === 9 ? (
                <div>
                    <span>Actualizando Sub-Categoria, espere..</span>
                    <div className="spinner-border" role="status" />
                </div>
            ) : (<p></p>)}

        </div>
    );
}

export default SubCategoria;