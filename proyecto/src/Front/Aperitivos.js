import React from 'react'

const Volley = ({ articles }) => { // Verificar si hay al menos un artículo en el arreglo
  return (
    <div>
      <h3>Bienvenidos al Aperitivos, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>
     

      <div className="card-container">
        
      {articles.filter(article => article.subcategory === 'Medicina').map((article, index) => (/** index se usa en los mpa, este representa un indice dentro del array que se esta correindo */

          <div key={index} className="card" >
          <div className="card-footer">
            <img src={article.image} className="card-img-top" alt={article.titulo} /> 
                
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">Description: {article.content}</p>
              <p className="card-text">Category: {article.category}</p>
              <p className="card-text">Subcategory: {article.subcategory}</p>
              </div>
              <div className="card-footer">
             
              <a href={"/articulo/${index}"} className="btn btn-primary">
                Entrar al artículo
              </a>
              
            </div>
          </div>
        ))}

       
      </div>



    </div>
  );
  }



export default Volley

