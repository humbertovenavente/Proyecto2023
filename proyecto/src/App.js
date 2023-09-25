import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Router} from "react-router-dom";

import { Login } from './Front/Login';
import Barra from './Front/Barra';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
    <Barra/>
      <Routes>
        
        <Route path = '/iniciar sesion' element = {<Login/>}/>
        
      </Routes>
    </BrowserRouter>


    


    </div>
  );
}

export default App;
