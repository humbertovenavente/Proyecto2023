import React, { createContext, useContext, useState , useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';


const AuthContext = createContext();

var response;
var m_usuario = [];

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [l_user, setl_user] = useState("");
  const [l_rol, setl_rol] = useState(0);
  const [n_rol, setn_rol] = useState("Visitante");
  const [username, setUsuario] = useState("");
  var ln_rol = ''

  // let navigate = useNavigate();
  useEffect(() => {
    const l_username = localStorage.getItem('jcapp_username')
    if(l_username){
      sendUsername(l_username)
    }
  }, [])

  

  const sendUsername = async (l_username) => {
    try {
        response = await axios.post("http://localhost/proy/checkusername.php", {
            username: l_username,
        });
        m_usuario = response.data
        setUsuario(m_usuario);
        if ( m_usuario.length >= 1 ) {
            login(l_username, parseInt(m_usuario[0].rol))      
        }                
    } catch (error) {
        // Manejar errores aquí
    }
}; 

  const login = ( username, rol ) => {
    setIsLoggedIn( true );
    setl_user( username );
    // console.log(typeof(rol))
    setl_rol( rol )
    if ( rol === 0 ) {
      ln_rol = 'Visitante'
    } else if ( rol === 1 ) {
      ln_rol = ''
    } else if ( rol === 2 ) {
      ln_rol = 'Premium'
    } else if ( rol === 3 ) {
      ln_rol = 'Autor'
    } else if ( rol === 4 ) {
      ln_rol =  'Moderador'
    } else if ( rol === 5 ) {
      ln_rol = 'Administrador'
    } else {
      ln_rol = 'Visitante'
    }
    // console.log(ln_rol)
    setn_rol( ln_rol )

    localStorage.setItem('jcapp_username', username)
    localStorage.setItem('jcapp_l_rol', rol)
    localStorage.setItem('jcapp_logued', 'X')
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setl_user("");
    setl_rol( 0 )
    setn_rol( 'Visitante' )
    // return navigate('/')

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, l_user, login, logout, l_rol, n_rol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};



