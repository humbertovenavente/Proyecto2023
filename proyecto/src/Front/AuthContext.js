import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [l_user, setl_user] = useState("");
  const [l_rol, setl_rol] = useState(0);
  const [n_rol, setn_rol] = useState("Visitante");
  var ln_rol = ''

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
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setl_user("");
    setl_rol( 0 )
    setn_rol( 'Visitante' )
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



// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [l_user, setl_user] = useState("");
//   const [l_rol, setl_rol] = useState(0);

//   const login = ( username, rol ) => {
//     setIsLoggedIn( true );
//     setl_user( username );
//     setl_rol( rol )
//     // console.log(username + rol)
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setl_user("");
//     setl_rol( 0 )
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, l_user, login, logout, l_rol }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

