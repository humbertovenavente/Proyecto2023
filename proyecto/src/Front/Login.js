import React from 'react'

export const Login = () => {
/*
    const color = {
        backgroundColor: 'blue', color: 'white',
    };
*/
    return (

<div className="login" >
        
        <form id="form_login">
            <div>
                <h1>Login</h1>
                <br></br>
                <label>Usuario</label>
                <input type="text" id="txtusuario" style={{textAlign:"center"}} className="form-control"  required/>
            </div>
            
            <div>
                <label>Contraseña</label>
                <input type="password" id="txtcontraseña" style={{textAlign:"center"}} className="form-control"  required/>
            </div>
            <br></br>
            <input type="submit"  className="btn btn-primary" value="Entrar"/>
        </form>
        </div>
        
    )
}






