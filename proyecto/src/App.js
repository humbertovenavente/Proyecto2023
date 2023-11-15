import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React, { useState } from 'react';

import { Login } from './Front/Login';
import { useAuth } from './Front/AuthContext';

import Barra from './Front/Barra';
import CArticulo from './Front/CArticulo';
import Home from './Front/Home';
import Registro from './Front/Registro';
import Moderar from './Front/Moderar';
import SubCategoria from './Front/subcategoria';
import Categoria from './Front/categoria';
import ArtxCategoria from './Front/artxcategoria';
import Perfiles from './Front/Perfiles';
import Articulo from './Front/articulo';
import Anuncios from './Front/anuncios';
import Ofertas from './Front/ofertas';
import MisArticulos from './Front/misarts';
import ArticuloModerar from './Front/articulosmoderar';
import VerMisArts from './Front/vermisarts';
import EditarArt from './Front/editarart';
import ModAnuncios from './Front/modAnuncios';
import Comentarios from './Front/comentarios';
import Buscador from './Front/buscador';

import Perfil from './Front/Perfil';

//Import plantillas
import Plantilla1 from './Front/Plantilla1';
import Plantilla2 from './Front/Plantilla2';
import Plantilla3 from './Front/Plantilla3';
import APublicados from './Front/APublicados';
import AcercaDe from './Front/acercade';
import Footer from './Front/footer';
import PreguntasFrecuentes from './Front/preguntasfrecuentes';

function App() {

  // const [username, setUsername] = useState("");
  //const { isLoggedIn, l_user, logout } = useAuth();

  const [articles, setArticles] = useState([]); // Estado para almacenar los artículos

  const handleArticleSubmit = (newArticle) => {
    // Agregar el nuevo artículo a la lista de artículos
    setArticles([...articles, newArticle]);
  };

  return (
    <div className="container">


      <BrowserRouter>

        <Barra />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/iniciarsesion' element={<Login />} />
          <Route path='/articulos' element={<CArticulo />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/categoria' element={<Categoria />} />
          <Route path='/moderar' element={<Moderar />} />
          <Route path='/ofertas' element={<Ofertas />} />
          <Route path='/misarts' element={<MisArticulos />} />

          <Route path='/modAnuncios' element={<ModAnuncios />} />


          <Route path='/subcategoria' element={<SubCategoria />} />
          <Route path='/artxcategoria' element={<ArtxCategoria />} />
          <Route path='/Perfiles' element={<Perfiles />} />
          <Route path='/comentarios' element={<Comentarios />} />
          <Route path='/buscador' element={<Buscador />} />

          <Route path='/articulo/:idarticulo' element={<Articulo />} />
          <Route path='/articulosmoderar/:idarticulo' element={<ArticuloModerar />} />
          <Route path='/vermisarts/:idarticulo' element={<VerMisArts />} />
          <Route path='/editarart/:idarticulo' element={<EditarArt />} />

          <Route path='/articulos publicados' element={<APublicados />} />


          <Route path='/plantilla1' element={<Plantilla1 />} />
          <Route path='/plantilla2' element={<Plantilla2 />} />
          <Route path='/plantilla3' element={<Plantilla3 />} />

          <Route path='/acercade' element={<AcercaDe />} />
          <Route path='/preguntasfrecuentes' element={<PreguntasFrecuentes />} />

        </Routes>


        <br />
        <Anuncios />
        <br />

        <br />
        <Footer />
        <br />
      </BrowserRouter>

    </div>
  );
}

export default App;