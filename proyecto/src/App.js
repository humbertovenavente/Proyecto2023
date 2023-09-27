import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Router} from "react-router-dom";

import { Login } from './Front/Login';
import Barra from './Front/Barra';
import CArticulo from './Front/CArticulo';
import Home from './Front/Home';
import Registro from './Front/Registro';

//Import plantillas
import Plantilla1 from './Front/Plantilla1';
import Plantilla2 from './Front/Plantilla2';
import Plantilla3 from './Front/Plantilla3';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
    <Barra/>
      <Routes>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/iniciar sesion' element = {<Login/>}/>
        <Route path = '/articulos' element = {<CArticulo/>}/>
        <Route path = '/registro' element = {<Registro/>}/>
        
        
        <Route path = '/plantilla1' element = {<Plantilla1/>}/>
        <Route path = '/plantilla2' element = {<Plantilla2/>}/>
        <Route path = '/plantilla3' element = {<Plantilla3/>}/>


      </Routes>
    </BrowserRouter>


    


    </div>
  );
}

export default App;
