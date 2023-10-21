import React, { useState, useEffect } from 'react';
import axios from 'axios';

var a_usuario = '';
var em_usuario = '';
var em_id_usuario = '';
var em_st_usuario = '';
var r_usuario = [];

const Perfiles = () => {

  const [datos, setDatos] = useState([]);
  const [oper, setOper] = useState(0);
  const [e_usuario, sete_usuario] = useState('');
  const [e_id_usuario, sete_id_usuario] = useState('');
  const [e_st_usuario, sete_st_usuario] = useState('');

  useEffect(() => {
    setOper(8);
    leerusuario()
  }, [])

  async function leerusuario() {
    const response = await axios.get("http://gregserver/apisP/perfiles.php")
    r_usuario = response.data
    if (r_usuario.length >= 1) {
      setDatos(r_usuario);
    }
    setOper(0);
  }


  const actualizarUsuario = async (e) => {
    e.preventDefault();
    setOper(9);
    try {
      const response = await axios.post("http://gregserver/apisP/actualizarperfil.php", {
        usuario: em_id_usuario,
        nusuario: em_usuario,
        susuario: em_st_usuario
      });
      // console.log(response)

    } catch (error) {
      console.log("send data error");
    } finally {

      const response = await axios.get("http://gregserver/apisP/perfiles.php")
      r_usuario = response.data
      if (r_usuario.length >= 1) {
        setDatos(r_usuario);
      }
      setOper(0);
    }
  };

  const editarUsuario = (id) => {

    setOper(2)
    var i = 0
    var found = false;
    for (i = 0; i < r_usuario.length && !found; i++) {
      if (r_usuario[i].id_usuario === id) {
        found = true;
        break;
      }
    }
    em_id_usuario = r_usuario[i].id_usuario
    sete_id_usuario(em_id_usuario)
    em_usuario = r_usuario[i].nombre_usuario
    sete_usuario(em_usuario)
    em_st_usuario = r_usuario[i].activo
    sete_st_usuario(em_st_usuario)
  };

  function cambiaActivo() {
    if (em_st_usuario === 'X') {
      em_st_usuario = ''
    } else {
      em_st_usuario = 'X'
    }
    sete_st_usuario(em_st_usuario)
  }

  function regresar() {
    em_id_usuario = ''
    sete_id_usuario(em_id_usuario)
    em_usuario = ''
    sete_usuario(em_usuario)
    em_st_usuario = ''
    sete_st_usuario(em_st_usuario)
    setOper(0);
  }


  const handleInputChange = (e, type) => {
    const valor = e.target.value;
    switch (type) {
      case "a_usuario":
        a_usuario = valor
        break;
      case "e_usuario":
        em_usuario = valor
        sete_usuario(em_usuario)
        break;
      case "e_id_usuario":
        em_id_usuario = valor
        sete_usuario(em_id_usuario)
        break;
      default:
    }
  }


  return (
<div>
      {oper === 0 ? (
        <div>
          <table className="table" id="tabla">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Suscripcion</th>
                <th>Rol</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.username}>
                  <td>{dato.nombre_usuario}</td>
                  <td>{dato.apellido_usuario}</td>
                  {/* <td>{dato.suscripcion}</td> */}
                  <td>{dato.rol}</td>
                  <td><button id='but' onClick={() => editarUsuario(dato.username)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>

                   
        </div>
      
      ) : oper === 2 ? (
        <div>
          <label>Edición de Usuario</label>
          <br/><br/>
          <input type="text" onChange={(e) => handleInputChange(e, "e_id_usuario")} id="e_id_usuario" value={e_id_usuario} />
          <label className="form-label">Categoría</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_usuario")} value={e_usuario} id="e_usuario" placeholder='Usuario' />
          <label className="form-label">Activo</label>
          <input type="text" onChange={(e) => handleInputChange(e, "e_st_usuario")} id="e_st_usuario" value={e_st_usuario} />
          <button onClick={cambiaActivo}>Cambiar Activo Inactivo</button>
          <br/><br/>
          <button onClick={actualizarUsuario}>Grabar Datos</button>
          <button onClick={regresar}>Regresar</button>
        </div>
      ) : oper === 8 ? (
        <div>
          <span>Leyendo Categorias, espere..</span>
          <div className="spinner-border" role="status" />
        </div>
      ) : oper === 9 ? (
        <div>
          <span>Actualizando Categoria, espere..</span>
          <div className="spinner-border" role="status" />
        </div>
      ) : (<p></p>)}

    </div>


    );
};

export default Perfiles