import React, { useState, useEffect, Component } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const Barra = () => {
  //const { isLoggedIn } = useAuth();
  const { isLoggedIn, l_user, logout, n_rol , l_rol , p_imagen} = useAuth();
  const [omodalLogout, setomodalLogout] = useState(false);
  let navigate = useNavigate();
  // return (
  //     <div>Test</div>
  // )

  function logout_barra() {
    logout()
    setomodalLogout(true)
        setTimeout(() => {
          setomodalLogout(false)
          return navigate('/')
        }, 2000);
    // return navigate('/')
  }

  return (
    <div>
      {isLoggedIn ? (
        <nav className="navbar navbar-expand-lg llink">
          <div className="container-fluid">
            <ul className="navbar-nav ms-auto">
            {p_imagen ?
                  <img src={"data:image/png;base64," + p_imagen} className="img-fluid" alt="imagen" style={{ width: "2rem" }} />
                :
                  <div>
                  </div>
            }
              <li className="nav-item">
                {l_user} {n_rol}
              </li>
              <li className="nav-item">
                <button onClick={logout_barra}>Logout</button>
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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
                    <Link className="nav-link active" to="/misarts">
                      Mis Articulos
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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
                    <Link className="nav-link active" to="/misarts">
                      Mis Articulos
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/comentarios">
                      Comentarios
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

                  {/* <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/articulos publicados"
                    >
                      Articulos Publicados
                    </Link>
                  </ul> */}
                  <ul className="nav-item ml-auto">
                    <Link
                      className="nav-link active"
                      to="/artxcategoria"
                    >
                      Articulos X Categoria
                    </Link>
                  </ul>
                  <li className="nav-item">
                        <Link className="nav-link" to="/buscador">
                          Buscador
                        </Link>
                      </li>
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
                    <Link className="nav-link active" to="/misarts">
                      Mis Articulos
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/ofertas">
                      Ofertas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/modAnuncios">
                      Anuncios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/comentarios">
                      Comentarios
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

      <Modal open={omodalLogout} onClose={logout_barra} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2, outline: 'none', margin: '0 auto', marginTop: '200px' }}>
          <div>
            <span>Cerrando sesion, redirigiendo...</span>
            <div className="spinner-border" role="status" />
          </div>
        </Box>
      </Modal>
    </div>
   
  );
};

export default Barra;

