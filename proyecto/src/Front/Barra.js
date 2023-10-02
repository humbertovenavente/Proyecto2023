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
              <Link className="nav-link active" to='/articulos'>Crear articulo</Link>
            </li>


            <li className="nav-item dropdown">

              <a className="nav-link dropdown-toggle ml-auto" href="" data-bs-toggle="dropdown" aria-expanded="false">
                Categorias</a>

                {/aqui/}
              <ul className="dropdown-menu">

                

                
                <li><a className="dropdown-item" href=""> Deporte &raquo;</a>

                  <ul className="dropdown-menu submenu">
                    <li><a className="dropdown-item" href=""> <Link to='/Futbol'>Futbol  </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Baloncesto'>Baloncesto  </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Volley'>Volley  </Link> &raquo;</a></li>
                  </ul>

                </li>


                <li><a className="dropdown-item" href=""> Tecnologia &raquo;</a>

                  <ul className="dropdown-menu submenu">
                    <li><a className="dropdown-item" href=""> <Link to='/Nanotecnologia'>Nanotecnologia  </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Medicina'>Medicina  </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Nt'>Nuevas Tendencias </Link> &raquo;</a></li>
                  </ul>

                </li>


                <li><a className="dropdown-item" href=""> Comida &raquo;</a>

                  <ul className="dropdown-menu submenu">
                    <li><a className="dropdown-item" href=""> <Link to='/Postres'>Postres </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Aperitivos'>Aperitivos </Link> &raquo;</a></li>
                    <li><a className="dropdown-item" href=""> <Link to='/Pf'>Platos fuertes  </Link> &raquo;</a></li>
                  </ul>

                </li>

  






  </ul>

            </li>


            <ul className="nav-item ml-auto">
                <Link className="nav-link active" to='/articulos publicados'>Articulos Publicados</Link>
              </ul>



          </ul>
          <a className="navbar-brand mx-auto" href="#">
            <img src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000" className="card-img-top" alt="Logo" style={{ width: '70px', height: 'auto' }} />
          </a>



          <ul className="navbar-nav ml-auto">
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