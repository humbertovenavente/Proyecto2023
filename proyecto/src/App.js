import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Router} from "react-router-dom";

import { Login } from './Front/Login';
import Barra from './Front/Barra';
import CArticulo from './Front/CArticulo';
import Home from './Front/Home';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
    <Barra/>
      <Routes>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/iniciar sesion' element = {<Login/>}/>
        <Route path = '/articulos' element = {<CArticulo/>}/>
        
      </Routes>
    </BrowserRouter>


    


    </div>
  );
}

export default App;
