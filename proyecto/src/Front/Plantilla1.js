import React from 'react';


const Plantilla1 = ({ articles }) => {
  return (
    <div>
      <h3>Bienvenidos al Platilla1, en esta parte se mostrarán los artículos que hayan sido publicados recientemente</h3>

      <div className="card-container">
        {articles.filter(article => article.subcategory === 'Plantilla1').map((article, index) => (
          <div key={index} className="card card-fixed-height">
            <div className="card-footer">
              <img src={article.image} className="card-img-top" alt={article.title} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">Description: {article.content1}</p>
              <p className="card-text"><span className="font-weight-bold">Category:</span> {article.content1}</p>
              <p className="card-text"><span className="font-weight-bold">Subcategory:</span> {article.content2}</p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}


export default Plantilla1;
