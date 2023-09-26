import React from 'react'

const CArticulo = () => {
  return (
    <div>
      <label htmlFor="titulo">Ingrese el nombre del articulo</label>
      <input type="text" id="titulo" name="titulo" />

      <br></br>

      <label htmlFor="categorias">Seleccione una categoria</label>
      <select id="categoria" name="categoria">
        <option value="deporte">Deportes</option>
        <option value="tecnologia">Tecnologia</option>
        <option value="comida">Comida</option>
      </select>

      <br></br>

      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label htmlFor="texto">Ingrese el texto del articulo</label>
        <textarea id="story" name="story" rows="10" cols="33" style={{width: "50%"}}/>
        
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
      </div>
      {/* <input type="text" id="texto" name="texto"/> */}

    </div>
  )
}

export default CArticulo
