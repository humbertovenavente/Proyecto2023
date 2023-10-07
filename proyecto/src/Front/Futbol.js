import React from 'react';
import './Card.css'; // Importa el archivo CSS

const Futbol = ({ articles }) => {
  return (
    <div>
      <h3>Bienvenidos al Futbol, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>

      <div className="card-container">
        {articles.filter(article => article.subcategory === 'Futbol').map((article, index) => (
          <div key={index} className="card card-fixed-height">
            <div className="card-footer">
              <img src={article.image} className="card-img-top" alt={article.title} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">Description: {article.content}</p>
              <p className="card-text"><span className="font-weight-bold">Category:</span> {article.category}</p>
              <p className="card-text"><span className="font-weight-bold">Subcategory:</span> {article.subcategory}</p>
            </div>
            <div className="card-footer ">
              <a href={`/articulo/${index}`} className="btn btn-primary btn-block">Entrar al artículo</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Futbol;
