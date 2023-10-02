import React from 'react'

import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const APublicados = () => {


    useEffect(() => { articulos()}, [])

  const [data, setData] = useState ([]);

  async function articulos() {

    const info = await axios.get("http://gregserver/apisP/articulos.php")

    setData(info.data);
    
  }

  return (
<div>

    <h3>Aqui se mostrarán todos los articulos publicados</h3>

    <div>

    {data.map(function(articulos) {
    return (
      <div>
        <div>{articulos.titulo_articulo}</div>
        <div>{articulos.contenido_articulo}</div>
        <div>{articulos.fecha_publicacion}</div>
     </div>
)
})}

    </div>
</div>

    );
};

export default APublicados