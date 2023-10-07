import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ articles }) => {
  // Verificamos si articles es un arreglo antes de usar métodos de arreglo
  if (!Array.isArray(articles)) {
    return <p>La propiedad "articles" no es un arreglo.</p>;
  }

  // Revertimos el arreglo y tomamos los últimos 10 artículos
  const lastTenArticles = [...articles].reverse().slice(0, 10);

  return (
    <div>
      <h3>Bienvenidos al Home, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>

      <div className="card-container">
        {lastTenArticles.map((article, index) => (
          <div key={index} className="card">
            <div className="card-footer">
              <img src={article.image} className="card-img-top" alt={article.title} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">Descripción: {article.content}</p>
              <p className="card-text">Categoría: {article.category}</p>
              <p className="card-text">Subcategoría: {article.subcategory}</p>
            </div>
            <div className="card-footer">
              {/* Corregimos la interpolación de la URL */}
              <a href={`/articulo/${index}`} className="btn btn-primary">
                Entrar al artículo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Agregamos PropTypes para verificar que articles sea un arreglo
Home.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default Home;