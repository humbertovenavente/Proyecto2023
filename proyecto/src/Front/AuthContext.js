import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'

const AuthContext = createContext();
var response;
var m_usuario = [];
var l_username = "";
var r_anuncios = [];

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [l_user, setl_user] = useState("");
  const [l_rol, setl_rol] = useState(0);
  const [n_rol, setn_rol] = useState("Visitante");
  const [username, setUsuario] = useState("");
  const [p_imagen, setP_imagen] = useState(null);
  const [p_anuncios, setP_anuncios] = useState([]);
  var ln_rol = ''

  useEffect(() => {
    l_username = localStorage.getItem('jcapp_username')
    if (l_username) {
      sendUsername(l_username)
      getImagenes()
      ref_anuncios()
    }
  }, [])

  const sendUsername = async (l_username) => {
    try {
      response = await axios.post("http://localhost/proy/checkusername.php", {
        username: l_username,
      });
      m_usuario = response.data
      setUsuario(m_usuario);
      if (m_usuario.length >= 1) {
        login(l_username, parseInt(m_usuario[0].rol))
      }
    } catch (error) {
      // Manejar errores aquí
    }
  };

  async function getImagenes() {
    const res = await axios.get('http://localhost/proy/imagenes.php?username=' + l_username);
    if (res.data.length > 0) {
      setP_imagen(res.data[0].imagen)
    }
  }

  const login = (username, rol) => {
    setIsLoggedIn(true);
    setl_user(username);
    setl_rol(rol)
    if (rol === 0) {
      ln_rol = 'Visitante'
    } else if (rol === 1) {
      ln_rol = 'Usuario'
    } else if (rol === 2) {
      ln_rol = 'Premium'
    } else if (rol === 3) {
      ln_rol = 'Autor'
    } else if (rol === 4) {
      ln_rol = 'Moderador'
    } else if (rol === 5) {
      ln_rol = 'Administrador'
    } else {
      ln_rol = 'Visitante'
    }
    setn_rol(ln_rol)

    localStorage.setItem('jcapp_username', username)
    localStorage.setItem('jcapp_l_rol', rol)
    localStorage.setItem('jcapp_logued', 'X')

  };

  const logout = () => {
    setIsLoggedIn(false);
    setl_user("");
    setl_rol(0)
    setn_rol('Visitante')
    setP_imagen(null)
    localStorage.clear()
  };

  const del_imagen = () => {
    setP_imagen(null)
  };

  const ref_imagen = () => {
    getImagenes()
  };

  const ref_anuncios = () => {
    getAnuncios()
  };

  async function getAnuncios() {
    try {
      response = await axios.get("http://localhost/proy/leeranuncios.php")
    } catch (error) {
      console.log(error)
    } finally {
      r_anuncios = response.data
      if (r_anuncios.length >= 1) {
        setP_anuncios(r_anuncios);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, l_user, login, logout, l_rol, n_rol, p_imagen, del_imagen, ref_imagen, p_anuncios, ref_anuncios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};