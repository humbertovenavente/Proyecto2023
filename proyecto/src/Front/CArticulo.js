import React from 'react'

const CArticulo = () => {
  return (
    <div>
      <h3>En esta pestaña usted podra crear un articulo</h3>
      <br></br>
      <label htmlFor="titulo" >Ingrese el nombre del articulo</label>
      <input type="text" id="titulo" class="form-control" name="titulo" />

      <br></br>

      <label htmlFor="categorias">Seleccione una categoria</label>
      <select id="categoria" name="categoria">
        <option value="deporte">Deportes</option>
        <option value="tecnologia">Tecnologia</option>
        <option value="comida">Comida</option>
      </select>

      <br></br>

      <label htmlFor="subcategorias">Seleccione una Subcategoria</label>
      <select id="subcategoria" name="subcategoria">
        <option value="deporte">Internacional</option>
        <option value="tecnologia">Local</option>
      </select>

            
      <br></br>

      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label htmlFor="texto">Ingrese el texto del articulo en el cuadro de abajo</label>
        <textarea id="story" name="story" rows="10" cols="33" style={{width: "50%"}}/>
        
        <br></br>
        <label htmlFor="texto">Ingrese una imagen (si gusta) </label>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
       
      </div>
      {/* <input type="text" id="texto" name="texto"/> */}

      <br></br>
      <input type="submit" value="Publicar articulo" />


    </div>
  )
}

export default CArticulo
