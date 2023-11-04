import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";
import { useAuth } from './AuthContext';

var r_categorias = [];
var m_categoriaAct = "";
var t_subcategorias = [];
var r_subcategorias = [];

const tipoArticulo = [
  {id_tipo_articulo : 0, n_tipo_articulo : 'Gratis'},    
  {id_tipo_articulo : 1, n_tipo_articulo : 'Premium'},
];

const plantillas = [
  {id_plantilla : 1, n_plantilla : 'Plantilla 1'},    
  {id_plantilla : 2, n_plantilla : 'Plantilla 2'},
  {id_plantilla : 3, n_plantilla : 'Plantilla 3'},
  ];

const EditarArt = () => {
    
    let navigate = useNavigate();
  const { l_user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [cita_rel, setCita_rel] = useState("");
  const [contenido1, setContenido1] = useState("");
  const [contenido2, setContenido2] = useState("");
  const [contenido3, setContenido3] = useState("");
  const [video, setVideo] = useState("");
  const [tipo_articulo, setTipo_articulo] = useState(0);
  const [plantilla, setPlantilla] = useState(1);
  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");
  const [imagen4, setImagen4] = useState("");
  const [imagen5, setImagen5] = useState("");
  const [imagen1_desc, setImagen1_desc] = useState("");
  const [imagen2_desc, setImagen2_desc] = useState("");
  const [imagen3_desc, setImagen3_desc] = useState("");
  const [imagen4_desc, setImagen4_desc] = useState("");
  const [imagen5_desc, setImagen5_desc] = useState("");

  const [categoriaAct, setCategoriaAct] = useState("");
  const [subCategoriaAct, setSubCategoriaAct] = useState("");
  const [a_categoria, setCategoria] = useState([]);
  const [a_subcategoria, setSubCategoria] = useState([]);

  

  function changeTipoArticulo(e) {
    setTipo_articulo(e.target.value)
    // console.log(e.target.value)
}
    function changePlantillas(e) {
      setPlantilla(e.target.value)
      // console.log(e.target.value)
  }

  // const [tituloAct, setTituloAct] = useState(""); //arreglo con dos itmes, titulo es current state y el sengod es lo que ayuda a actualizar el estado
  // const [contenidoAct, setContenidoAct] = useState("");
  // const [imagenAct, setImagenAct] = useState(null);
  // const [informacionGuardadaAct, setInformacionGuardadaAct] = useState(null);
  // const [titulo, setTitulo] = useState("");

  const [omodalRed, setomodalRed] = useState(false);
  const [omodalPubli, setomodalPubli] = useState(false);
  const handleCloseRed = () => {
    setomodalRed(false)
  };

  const l_isLoggedIn = localStorage.getItem('jcapp_logued')
  const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

  useEffect(() => {
    if (l_isLoggedIn && (l_l_rol === 3 || l_l_rol || 4 && l_l_rol || 5)) {
      // r_articles = []
      leercat_subcat()
    } else {
      setomodalRed(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);
    }
  }, [])

  async function leercat_subcat() {
    try {
      const response = await axios.get("http://gregserver/apisP/leercat_subcat.php")
      r_categorias = response.data.categorias
      if (r_categorias.length >= 1) {
        setCategoria(r_categorias);
      }
      t_subcategorias = response.data.subcategorias

    } catch (error) {
      console.log("send data error");
    } finally {

    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("post1");
      const response = await axios.post("http://gregserver/apisP/guardarart.php",
        {
          username: l_user,
          titulo: titulo,
          cita_relevante: cita_rel,
          contenido1: contenido1,
          contenido2: contenido2,
          contenido3: contenido3,
          id_subcategoria: subCategoriaAct,
          video: video,
          tipo_articulo: tipo_articulo,
          plantilla: plantilla,
          imagen1: imagen1,
          imagen2: imagen2,
          imagen3: imagen3,
          imagen4: imagen4,
          imagen5: imagen5,
          imagen1_desc: imagen1_desc,
          imagen2_desc: imagen2_desc,
          imagen3_desc: imagen3_desc,
          imagen4_desc: imagen4_desc,
          imagen5_desc: imagen5_desc
        }
      );
      console.log(response.data);
      // console.log("post1");
    } catch (error) {
      console.log(error);
    } finally {
      setomodalPubli(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);

    }
  };

  // $id_subcategoria = $data['id_subcategoria'];
  // $tipo_articulo = $data['tipo_articulo'];
  // $plantilla = $data['plantilla'];
  // $imagen1 = $data['imagen1'];    
  // $imagen2 = $data['imagen2'];    
  // $imagen3 = $data['imagen3'];    
  // $imagen4 = $data['imagen4'];    
  // $imagen5 = $data['imagen5'];
  // $imagen1_desc = $data['imagen1_desc'];    
  // $imagen2_desc = $data['imagen2_desc'];    
  // $imagen3_desc = $data['imagen3_desc'];    
  // $imagen4_desc = $data['imagen4_desc'];    
  // $imagen5_desc = $data['imagen5_desc'];

  function selCategoria(cat) {
    m_categoriaAct = cat
    setCategoriaAct(m_categoriaAct)
    r_subcategorias = []
    setSubCategoriaAct([])
    var i = 0
    for (i = 0; i < t_subcategorias.length; i++) {
      if (t_subcategorias[i].id_categoria === cat) {
        // console.log(t_subcategorias[i])
        r_subcategorias.push(t_subcategorias[i])
      }
    }
    setSubCategoria(r_subcategorias)
  }
  
    
  

    return(
        <div>
      <h3 className="mt-3">Creación de Artículos</h3>
      <form onSubmit={handleFormSubmit}>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese el titulo del articulo</label>
          <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Cita Relevante</label>
          <input type="text" id="cita_rel" name="cita_rel" value={cita_rel} onChange={(e) => setCita_rel(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="categoria">Seleccione una categoria</label>
          <select id="categoria" name="categoria" value={categoriaAct} onChange={e => (selCategoria(e.target.value))} required >
            <option value="" key={""}>Seleccione una categoria</option>
            {a_categoria.map((dato) => (<option value={dato.id_categoria} key={dato.id_categoria}>{dato.nombre_categoria}</option>))}
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="subcategoria">Subcategoria</label>
          <select id="subcategoria" name="subcategoria" value={subCategoriaAct} onChange={(e) => setSubCategoriaAct(e.target.value)} required >
            <option value="">Seleccione una subcategoria</option>
            {a_subcategoria.map((dato) => (<option value={dato.id_subcategoria} key={dato.id_subcategoria}>{dato.nombre_subcategoria}</option>))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
          <label htmlFor="texto">Ingrese el Contenido Parte 1</label>
          <textarea id="conten1" name="conten1" rows="10" cols="33" style={{ width: "50%" }} value={contenido1} onChange={(e) => setContenido1(e.target.value)} required />
          <label htmlFor="texto">Ingrese el Contenido Parte 2</label>
          <textarea id="conten2" name="conten2" rows="10" cols="33" style={{ width: "50%" }} value={contenido2} onChange={(e) => setContenido2(e.target.value)} required />
          <label htmlFor="texto">Ingrese el Contenido Parte 3</label>
          <textarea id="conten3" name="conten3" rows="10" cols="33" style={{ width: "50%" }} value={contenido3} onChange={(e) => setContenido3(e.target.value)} required />

          {/* <label htmlFor="texto">Ingrese una imagen (si gusta) </label>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(hola) => setImagenAct(hola.target.files[0])} /> */}
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese URL del video</label>
          <input type="text" id="video" name="video" value={video} onChange={(e) => setVideo(e.target.value)} className="w-50" required />
        </div>

        {/* <div className="mt-2">
          <label htmlFor="titulo">Ingrese el tipo de articulo</label>
          <input type="text" id="tipo_articulo" name="tipo_articulo" value={tipo_articulo} onChange={(e) => setTipo_articulo(e.target.value)} className="w-50" required />
        </div> */}
        <label htmlFor="titulo">Ingrese el tipo de articulo</label>
          <select id="tipo" name="tipo" value={tipo_articulo} onChange={(e) => changeTipoArticulo(e)} required> 
                                {tipoArticulo.map((dato) => (
                                    <option value={dato.id_tipo_articulo} key={dato.id_tipo_articulo}>{dato.n_tipo_articulo}</option>
                                ))} 
          </select>

        <br></br>

        {/* <div className="mt-2">
          <label htmlFor="titulo">Ingrese que plantilla quiere usar</label>
          <input type="text" id="plantilla" name="plantilla" value={plantilla} onChange={(e) => setPlantilla(e.target.value)} className="w-50" required />
        </div> */}
        <label htmlFor="titulo">Ingrese que plantilla quiere utilizar</label>
          <select id="plantilla" name="plantilla" value={plantilla} onChange={(e) => changePlantillas(e)} required> 
                                {plantillas.map((dato) => (
                                    <option value={dato.id_plantilla} key={dato.id_plantilla}>{dato.n_plantilla}</option>
                                ))} 
          </select>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la Primera imagen</label>
          <input type="text" id="imagen1" name="imagen1" value={imagen1} onChange={(e) => setImagen1(e.target.value)} className="w-50" required />
        </div>
        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la descripcion de la Primera imagen</label>
          <input type="text" id="imagen1_desc" name="imagen1_desc" value={imagen1_desc} onChange={(e) => setImagen1_desc(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la Segunda imagen</label>
          <input type="text" id="imagen2" name="imagen2" value={imagen2} onChange={(e) => setImagen2(e.target.value)} className="w-50" required />
        </div>
        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la descripcion de la Segunda imagen</label>
          <input type="text" id="imagen2_desc" name="imagen2_desc" value={imagen2_desc} onChange={(e) => setImagen2_desc(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la Tercera imagen</label>
          <input type="text" id="imagen3" name="imagen3" value={imagen3} onChange={(e) => setImagen3(e.target.value)} className="w-50" required />
        </div>
        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la descripcion de la Tercera imagen</label>
          <input type="text" id="imagen3_desc" name="imagen3_desc" value={imagen3_desc} onChange={(e) => setImagen3_desc(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la Cuarta imagen</label>
          <input type="text" id="imagen4" name="imagen4" value={imagen4} onChange={(e) => setImagen4(e.target.value)} className="w-50" required />
        </div>
        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la descripcion de la Cuarta imagen</label>
          <input type="text" id="imagen4_desc" name="imagen4_desc" value={imagen4_desc} onChange={(e) => setImagen4_desc(e.target.value)} className="w-50" required />
        </div>

        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la URL de la Quinta imagen</label>
          <input type="text" id="imagen5" name="imagen5" value={imagen5} onChange={(e) => setImagen5(e.target.value)} className="w-50" required />
        </div>
        <div className="mt-2">
          <label htmlFor="titulo">Ingrese la descripcion de la Quinta imagen</label>
          <input type="text" id="imagen5_desc" name="imagen5_desc" value={imagen5_desc} onChange={(e) => setImagen5_desc(e.target.value)} className="w-50" required />
        </div>
        



        <button type="submit" className="btn btn-primary">Publicar Articulo</button>
      </form>

      <Modal open={omodalPubli} onClose={handleFormSubmit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Publicacion Exitosa, redirigiendo al home</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>

      {/* **Ventana Modal para Mensaje** */}
      <Modal open={omodalRed} onClose={handleCloseRed} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>No tienes autorizacion, redirigiendo al home</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>
      {/* **Ventana Modal para Responder** */}

    </div>
    );

}
export default EditarArt;