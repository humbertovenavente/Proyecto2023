import React from 'react'
import { Link } from 'react-router-dom'

const Barra = () => {
  return (
    
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">

      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link className="nav-link" to='/home'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to = '/articulos'>Crear articulo</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorias
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='/Contacto'>Deportes</Link></li>
            <li><Link className="dropdown-item" to='/Informacion'>Tecnologia</Link></li>
            <li><Link className="dropdown-item" to='/Comida'>Comida</Link></li>
          </ul>
        </li>
        </ul>

        <a className="navbar-brand ms-auto" href="#">
        <img src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000" className="card-img-top" alt="Logo" style={{ width: '70px', height: 'auto' }}/>
        </a>

        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to='/iniciar sesion'>Iniciar sesion</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/registro'>Registro de usuario</Link>
        </li>
        </ul>

      

    </div>
  </div>
</nav>

    
  )
}

export default Barra
