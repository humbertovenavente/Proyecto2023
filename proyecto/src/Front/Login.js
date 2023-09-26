import React from 'react'

export const Login = () => {
/*
    const color = {
        backgroundColor: 'blue', color: 'white',
    };
*/
    return (

<div className="login" >
<body class="bg-info d-flex justify-content-center
                align-items-center vh-100">
      <div class="bg-white p-5 rounded-5 text-secondary" style={{width:'27rem'}} >
        <div>
            <div class= "d-flex justify-content-center">
                <img src= "proyecto/src/img/persona.png"
                alt="login-icon"
                style={{height:'7rem'}}
            
                />

            </div>

                  
        <form id="form_login">
           
            <div>
                <h1 class= "text-center fs-1">Login</h1>
                <br></br>
           

                <div class= "input-group">
                <div class= "input-group-text bg-info">
                    <img 
                    src='proyecto/src/img/arrow-up-circle.svg'
                    style={{height:'1rem'}}/>
            
                    </div>
                <input class="form-control" type="text" id="txtusuario"  placeholder='Usuario'  required/>
                </div>
            </div>
            
            <div class= "input-group mt-1">
                <div class= "input-group-text bg-info">
                    <img 
                    src='proyecto/src/img/arrow-up-circle.svg'
                    style={{height:'1rem'}}/>
                    </div>
                   
                <input class="form-control" type="password" id="txtcontraseña"  placeholder='Contraseña'  required/>
            
           
            </div>
            

         
            <div class= "d-flex justify-content-around">
                <div class= "d-flex align-items-center gap-1">
                    <input type="checkbox"/>
                    <div styles="font-size: 0.9rem"> Remember me</div>
                    
                </div>
                <div> 
               <a href="#" class= "text-decoration-none text-info fw-semibold fst-italic"> Forgot password?</a>
               </div>
            </div>
           

        
            <br></br>
            <div class="btn btn-info text-white w-100 mt-3">
            <input type="submit"  className="btn btn-info text-white w-100" value="Entrar"/>
            </div>
            <div styles="font-size: 0.9rem"  class= "d-flex align-items-center gap-1 mt-3"> 
                Dont you have an account?

                <a href="#" class= "text-decoration-none text-info fw-semibold fst-italic"> Create an account</a>
            </div>
            </form>
            </div>
            </div>
            </body>
            
        
        </div>
        

        
        
    )
}







