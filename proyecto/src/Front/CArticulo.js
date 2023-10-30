import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



import axios from "axios";

const CArticulo = () => {
  //const navigate = useNavigate();

  
  let navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  //const [subcategory, setSubcategory] = useState('');
  //const [content, setContent] = useState('');
  //const [image, setImage] = useState(null);

  //const [template, setTemplate] = useState('');
  //const [content1, setContent1] = useState('');
  //const [content2, setContent2] = useState('');
  //const [content3, setContent3] = useState('');
  //const [image1, setImage1] = useState(null);

  const [omodalRed, setomodalRed] = useState(false);
  const handleCloseRed = () => {
  setomodalRed(false)
  };

  const l_isLoggedIn = localStorage.getItem('jcapp_logued')
  const l_l_rol = parseInt(localStorage.getItem('jcapp_l_rol'))

  useEffect(() => {
    //setOper(8);
    if (l_isLoggedIn && (l_l_rol === 3 || l_l_rol || 4 && l_l_rol || 5)) {   
      // setOper(8)
      // leersubcategorias()
      // leercategorias()    
    } else {
      setomodalRed(true)
      setTimeout(() => {
        return navigate('/')
      }, 2000);
    }

  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("post1");
      const response = await axios.post(
        "http://gregserver/apisP/guardarart.php",
        {
          titulo: titulo,
          contenido: contenido,
        }
      );
      console.log("post1");
      //console.log(response.data);
      // Puedes mostrar un mensaje de éxito o realizar otras acciones después de la inserción.
    } catch (error) {
      console.log("post2");
      //console.error(error);
      // Manejar errores aquí
    }
  };

  const [tituloAct, setTituloAct] = useState(""); //arreglo con dos itmes, titulo es current state y el sengod es lo que ayuda a actualizar el estado
  const [categoriaAct, setCategoriaAct] = useState("");
  const [subCategoriaAct, setSubCategoriaAct] = useState("");
  const [contenidoAct, setContenidoAct] = useState("");
  const [imagenAct, setImagenAct] = useState(null);
  const [informacionGuardadaAct, setInformacionGuardadaAct] = useState(null);

  //useState se usa para declarar los estados dentros del componente

  const handleSubmit = (e) => {
    e.preventDefault();

    //const imageUrl = image ? URL.createObjectURL(image) : null;

    const newArticle = {
      //Crea un objeto llamado newArticle que contiene los datos del artículo
      tituloAct,
      categoriaAct,
      subCategoriaAct,
      contenidoAct,
      imagenAct,
      //imagenAct: imageUrl,

      //template,
      //content1,
      //content2,
      //content3,
      //image1,
    };
    setInformacionGuardadaAct(newArticle); //almacena los datos del objeto en el estado informacion gaurdada

    console.log("Datos enviados:", newArticle);

    let archivoJS;

    

    //creamos este objeto en donde se tiene los datos del articulo en la que el usuario ingrese los datos al controlador que es onArticleSubmit
    //ahora bien, onArticleSubmit sera la funcion que va a pasar como propiedad en CArticulo
    //

    // Limpia el estado después de enviar los datos
    setTituloAct("");
    setCategoriaAct("");
    setSubCategoriaAct("");
    setContenidoAct("");
    setImagenAct(null);

    navigate("/home");
  };

  return (
    <div>
      <h3>En esta pestaña usted podra crear un articulo</h3>
      <form onSubmit={handleFormSubmit}>
        <br></br>
        <label htmlFor="titulo">Ingrese el nombre del articulo</label>

        <input
          type="text"
          id="titulo"
          name="titulo"
          value={titulo} /// className='form-control'
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <br></br>
        <div>
          <label htmlFor="categoria">Seleccione una categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={categoriaAct}
            onChange={(hola) => setCategoriaAct(hola.target.value)} // className="form-select"
            required
          >
            <option value="">Seleccione una categoria</option>
            <option value="Deporte">Deporte</option>
            <option value="Tec">Tecnologia</option>
            <option value="Comida">Comida</option>
          </select>
        </div>

        <br></br>

        {categoriaAct && (
          <div>
            <label htmlFor="subcategoria">Subcategoria</label>
            <select
              id="subcategoria"
              name="subcategoria"
              value={subCategoriaAct} // className="form-select"
              onChange={(hola) => setSubCategoriaAct(hola.target.value)}
              required
            >
              <option value="">Seleccione una subcategoria</option>
              {categoriaAct === "Deporte" && (
                <>
                  <option value="futbol">Futbol</option>
                  <option value="baloncesto">Baloncesto</option>
                  <option value="volley">Volley</option>
                </>
              )}
              {categoriaAct === "Tec" && (
                <>
                  <option value="nanotecnologia">Nanotecnologia</option>
                  <option value="medicina">Medicina</option>
                  <option value="nuevas tendencias">Nuevas tendencias</option>
                </>
              )}
              {categoriaAct === "Comida" && (
                <>
                  <option value="platos fuertes">Platos fuertes</option>
                  <option value="postres">Postres</option>
                  <option value="aperitivos">Aperitivos</option>
                </>
              )}
            </select>
          </div>
        )}

        <br></br>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="texto">
            Ingrese el texto del articulo en el cuadro de abajo
          </label>
          <textarea
            id="story"
            name="story"
            rows="10"
            cols="33"
            style={{ width: "50%" }}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />

          <br></br>
          <label htmlFor="texto">Ingrese una imagen (si gusta) </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(hola) => setImagenAct(hola.target.files[0])}
          />
        </div>
        {/* <input type="text" id="texto" name="texto"/> */}

        <br></br>
        <button type="submit" className="btn btn-primary">
          Publicar Articulo
        </button>
      </form>

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
};

export default CArticulo;
