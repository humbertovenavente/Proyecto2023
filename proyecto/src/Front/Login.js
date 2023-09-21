import React from 'react'

export const Login = () => {
    return (

<div className="container" >
        
        <form id="form_login">
            <div>
                <h1 >LOGIN</h1>
                <label htmlFor="txtusu"><strong>Usuario </strong></label>
                <input type="text" id="txtusu" style={{textAlign:"center"}} className="form-control"  required/>
            </div>
            <div>
                <label htmlFor="txtpas"><strong>Contraseña</strong></label>
                <input type="password" id="txtpas" style={{textAlign:"center"}} className="form-control"  required/>
            </div><br/>
            <input type="submit"  className="btn btn-primary" value="Login"/>
        </form>
        </div>
        
    )
}






