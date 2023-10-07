import React from 'react';
import './deporte.css'; 

const Deporte = ({ articles }) => {
  return (
    <div>
      {/* Título */}
      <h4 className="mb-4">Bienvenidos al Deporte</h4>

      {/* 3 tarjetas fijas */}
      <div className='card-container'>
        {/* Card 1 */}
        <div className="card">
          {/* Aquí va el contenido de tu tarjeta 1 */}
        </div>
        {/* Card 2 */}
        <div className="card">
          {/* Aquí va el contenido de tu tarjeta 2 */}
        </div>
        {/* Card 3 */}
        <div className="card">
          {/* Aquí va el contenido de tu tarjeta 3 */}
        </div>
      </div>

      {/* Texto indicativo */}
      <p>En esta parte se mostrarán los artículos que hayan sido publicados recientemente.</p>

      {/* Tarjetas dinámicas */}
      <div className='card-container'>
        {articles.filter(article => article.category === 'Deporte').map((article, index) => (
          <div key={index} className="card">
            <div className="face front"> 
              <h3>{article.title}</h3>
              <img src={article.image} alt="" />
            </div>
            <div className="face back"> 
              <h3>{article.title}</h3>
              <p>Description: {article.content}</p>
              <p><strong>Category:</strong> {article.category}</p>
              <p><strong>Subcategory:</strong> {article.subcategory}</p>
              <div className="link">
                <a href={`/articulo/${index}`}>Entrar al artículo</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deporte;
