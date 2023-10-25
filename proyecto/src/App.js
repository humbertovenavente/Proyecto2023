import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Router} from "react-router-dom";
import React, { useState } from 'react';

import { Login } from './Front/Login';
import { useAuth } from './Front/AuthContext';

import Barra from './Front/Barra';
import CArticulo from './Front/CArticulo';
import Home from './Front/Home';
import Registro from './Front/Registro';
import Moderar from './Front/Moderar';
import SubCategoria from './Front/subcategoria';
import FiltroCat from './Front/FiltroCat';
import Deporte from './Front/Deporte';
import Categoria from './Front/categoria';
import ArtxCategoria from './Front/artxcategoria';
import Comida from './Front/Comida';
import Tec from './Front/Tec';
import Perfiles from './Front/Perfiles';
import Articulo from './Front/articulo';
import Anuncios from './Front/anuncios';

import Baloncesto from './Front/Baloncesto';
import Volley from './Front/Volley';
import PFutbol from './Front/PFutbol';

import Nt from './Front/Nt';
import Nanotecnologia from './Front/Nanotecnologia';
import Medicina from './Front/Medicina';

import Postres from './Front/Postres';
import Aperitivos from './Front/Aperitivos';
import Pf from './Front/Pf';
import Perfil from './Front/Perfil';

//Import plantillas
import Plantilla1 from './Front/Plantilla1';
import Plantilla2 from './Front/Plantilla2';
import Plantilla3 from './Front/Plantilla3';
import APublicados from './Front/APublicados';
import AcercaDe from './Front/acercade';

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

      {/* <header>
         <h1>Header en el APP.JS</h1> 

        { isLoggedIn ? ( 
          <div>
              <span>Usuario: {l_user} </span>
              <button onClick={logout}>Cerrar sesión</button>            
          </div>
        ) : ( 
          <div>
            <span>
              <p>Visitante</p>
            </span> 
          </div>
        )
        }

      </header> */}

    <BrowserRouter>
    
    <Barra/>

      <Routes>
        
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/iniciarsesion' element = {<Login/>}/>
        <Route path = '/articulos' element = {<CArticulo/>}/>
        <Route path = '/registro' element = {<Registro/>}/>
        <Route path = '/perfil' element = {<Perfil/>}/>
        <Route path='/categoria' element={<Categoria />} />
        <Route path='/moderar' element={<Moderar/>} />
        <Route path='/filtrocat' element={<FiltroCat/>} />
        <Route path='/subcategoria' element={<SubCategoria/>} />
        <Route path='/artxcategoria' element={<ArtxCategoria/>} />
        <Route path = '/Perfiles' element = {<Perfiles/>}/>

        <Route path='/articulo/:idarticulo' element={<Articulo />} />
        
        <Route path = '/articulos publicados' element = {<APublicados/>}/>
       
        <Route path = '/deporte' element = {<Deporte/>}/>
        <Route path = '/tec' element = {<Tec/>}/>
        <Route path = '/comida' element = {<Comida/>}/>
        
        <Route path = '/baloncesto' element = {<Baloncesto/>}/>
        <Route path = '/volley' element = {<Volley/>}/>
        <Route path = '/futbol' element = {<PFutbol/>}/>

        <Route path = '/nanotecnologia' element = {<Nanotecnologia/>}/>
        <Route path = '/medicina' element = {<Medicina/>}/>
        <Route path = '/nuevas tendencias' element = {<Nt/>}/>

        <Route path = '/platos fuertes' element = {<Pf/>}/>
        <Route path = '/postres' element = {<Postres/>}/>
        <Route path = '/aperitivos' element = {<Aperitivos/>}/>
        
        <Route path = '/plantilla1' element = {<Plantilla1/>}/>
        <Route path = '/plantilla2' element = {<Plantilla2/>}/>
        <Route path = '/plantilla3' element = {<Plantilla3/>}/>

        <Route path = '/acercade' element = {<AcercaDe/>}/>
        
      </Routes>
    </BrowserRouter>   

    <br/>
      <Anuncios />
      <br/>

    {/* <h3>Aqui va el anuncio</h3> */}
    </div>
  );
}

export default App;