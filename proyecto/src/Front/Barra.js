import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Barra = () => {
  //const { isLoggedIn } = useAuth();
  const { isLoggedIn, l_user, logout, n_rol , l_rol} = useAuth();

  // return (
  //     <div>Test</div>
  // )

  return (
    <div>
      {isLoggedIn ? (
        <nav className="navbar navbar-expand-lg llink">
          <div className="container-fluid">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {l_user} {n_rol}
              </li>
              <li className="nav-item">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg llink">
          <div className="container-fluid">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item bca">{n_rol}</li>

              <li className="nav-item">
                <Link className="nav-link" to="/iniciarsesion">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    {/* <div>
        <h1>{l_rol}</h1>        
   </div> */}
      <div>
        {l_rol === 0 ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  {!isLoggedIn ? (
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/iniciarsesion">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/registro">
                          Registro de usuario
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </nav>
        ) : l_rol === 1  ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : l_rol === 2 ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : l_rol === 3 ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/articulos">
                      Crear articulo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : l_rol === 4 ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/articulos">
                      Crear articulo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/moderar">
                      Moderar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : l_rol === 5 ? (
          <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul>
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                </ul>

                <button className="navbar-brand mx-auto" href="#">
                  <img
                    src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000"
                    className="card-img-top"
                    alt="Logo"
                    style={{ width: "40px", height: "auto" }}
                  />
                </button>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/categoria">
                      Categorias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/subcategoria">
                      SubCategorias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/articulos">
                      Crear articulo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Perfiles">
                      Perfiles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/moderar">
                      Moderar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <p></p>
        )}
      </div>

      {/* <nav className="navbar navbar-expand-lg llink">
            <div className="container-fluid">

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                



                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>

                        <ul className="nav-item ml-auto">
                            <Link className="nav-link active" to='/articulos publicados'>Articulos Publicados</Link>
                        </ul>

                    </ul>

                    <button className="navbar-brand mx-auto" href="#">
                        <img src="https://img.freepik.com/vetores-premium/design-de-logotipo-elegante-g-e-h_728226-5.jpg?w=2000" className="card-img-top" alt="Logo" style={{ width: '40px', height: 'auto' }} />
                    </button>

                    <ul className="navbar-nav ml-auto">
                        { !isLoggedIn ? (

                        <ul className="navbar-nav ml-auto">  
                          <li className="nav-item">
                              <Link className="nav-link" to='/iniciarsesion'>Login</Link>
                          </li>   
                          <li className="nav-item">
                            <Link className="nav-link" to='/registro'>Registro de usuario</Link>
                          </li>
                        </ul>                    
                        ) : ( '' ) }
                        
                        <li className="nav-item">
                            <Link className="nav-link active" to='/categoria'>Categorias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/articulos'>Crear articulo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/perfil'>Perfil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/acercade'>Acerca de</Link>
                        </li>                        
                        

                    </ul>

                </div>
            </div>
        </nav> */}
    </div>
    // <div>
    //     <Link className="nav-link" to='/'>Inicio</Link>
    //     <Link className="nav-link" to='/front/registro'>Registro</Link>
    //     <Link className="nav-link" to='/front/acercade'>Acerca de</Link>
    // </div>
  );
};

export default Barra;

