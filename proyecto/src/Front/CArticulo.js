import React, { useState } from 'react';

const CArticulo = ({ onArticleSubmit }) => {
   //Esto lo vamos a usar para que esta funcion se va a llamar cuadndo los datos se envien al controlador

   //ahora 
   const [titulo, setTitulo] = useState('');
   const [categoria, setCategoria] = useState('');
   const [subCategoria, setSubCategoria] = useState('');
   const [contenido, setContenido] = useState('');
   const [imagen, setImagen] = useState(null);

   //aca el title, category y aja son variables que van a almacenar los datos relacionados con el articulo y se van creando valores iniciales o null en imagen
   //el set title y aja son funicones que se usa para actualizar los valores de las variables  osea re*rendiriza el componente con el nuevo estado

   const handleSubmit = (hola) => {
    hola.preventDefault();
    //esta funcion se ejecuta a la hora de envair los datos y la segunda linea evitar que e envien predetemrinadamente
    //por lo que ayuda a que haya logica en el envio de los datos

    const newArticle = {
      titulo,
      categoria,
      subCategoria,
      contenido,
      imagen,
    };
//creamos este objeto en donde se tiene los datos del articulo en la que el usuario ingrese los datos al controlador que es onArticleSubmit
//ahora bien, onArticleSubmit sera la funcion que va a pasar como propiedad en CArticulo
//
onArticleSubmit(newArticle); //Al llamar el objeto newarticle, va a enviar los datos al controlador para procearlos
setTitulo('');
setCategoria('');
setSubCategoria('');
setContenido('');
setImagen(null);
};

  return (
    <div>
      <h3>En esta pestaña usted podra crear un articulo</h3>
      <form onSubmit={handleSubmit}>
      <br></br>
      <label htmlFor="titulo" >Ingrese el nombre del articulo</label>

   
  
      <input type="text" id="titulo"  name="titulo" value={titulo} /// className='form-control'
            onChange={(e) => setTitulo(e.target.value)}
            required/>
          
      
      <br></br>
<div> 
      <label htmlFor="categoria">Seleccione una categoria</label>
      <select id="categoria" name="categoria" value={categoria} onChange={(hola) => setCategoria(hola.target.value)} // className="form-select"
            required>

        <option value="">Seleccione una categoria</option>
        <option value="Deporte">Deportes</option>
        <option value="Tec">Tecnologia</option>
        <option value="Comida">Comida</option>
      </select>
      </div>

      <br></br>

      {categoria && (
        <div> 
        <label htmlFor="subcategoria" >Subcategoria</label>
        <select id="subcategoria" name="subcategoria"   value={subCategoria} // className="form-select" 
                onChange={(hola) => setSubCategoria(hola.target.value)}
                required>
  
          <option value="">Seleccione una subcategoria</option>
          {categoria === 'Deporte' && (
            <>
            <option value="futbol">Futbol</option>
           <option value="baloncesto">Baloncesto</option>
           <option value="volley">Volley</option>
            </>
            )}
            {categoria === 'Tec' && (
            <>
            <option value="nanotecnologia">Nanotecnologia</option>
                    <option value="medicina">Medicina</option>
                    <option value="nuevas tendencias">Nuevas tendencias</option>
            </>)}
            {categoria ==='Comida'&& (
            <>
            <option value="platos fuertes">Platos fuertes</option>
                    <option value="postres">Postres</option>
                    <option value="aperitivos">Aperitivos</option>
            </>)}
          
  
           
        </select>
        </div>
        

    )}
              
      <br></br>

      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label htmlFor="texto">Ingrese el texto del articulo en el cuadro de abajo</label>
        <textarea id="story" name="story" rows="10" cols="33" style={{width: "50%"}}  value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required/>
        
        <br></br>
        <label htmlFor="texto">Ingrese una imagen (si gusta) </label>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"   onChange={(hola) => setImagen(hola.target.files[0])}/>
       
      </div>
      {/* <input type="text" id="texto" name="texto"/> */}

      <br></br>
      <button type="submit" className="btn btn-primary">Publicar Articulo</button>
 </form>
    </div>
  );
};

export default CArticulo
