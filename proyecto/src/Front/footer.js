import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
    

return(

<div className="card text-center">
  <div className="card-header">
    <ul className="nav nav-pills card-header-pills">
      <li className="nav-item">
        <a className="nav-link active" href="/acercade">Acerca de</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/preguntasfrecuentes">Preguntas frecuentes</a>
      </li>
      {/* <li className="nav-item"><Link className="nav-link active" to="/articulos">Preguntas Frecuentes</Link></li> */}
    </ul>
  </div>
  <div className="card-body">
    <h5 className="card-title">Sujeto a derechos de autor</h5>
    <p className="card-text">Comparte tus historias, unete a nosotros y crea los mejores articulos</p>
    
  </div>
</div>

);
}

export default Footer;