import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [l_user, setl_user] = useState("");
  const [l_rol, setl_rol] = useState(0);

  const login = ( username, rol ) => {
    setIsLoggedIn( true );
    setl_user( username );
    setl_rol( rol )
    // console.log(username + rol)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setl_user("");
    setl_rol( 0 )
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, l_user, login, logout, l_rol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};