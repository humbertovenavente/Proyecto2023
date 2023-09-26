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
      <div class="bg-white p-5 rounded-5 text-secondary" style={{width:'27rem'}}  >
        <div>
            <div class= "d-flex justify-content-center">
                <img src= "https://th.bing.com/th/id/R.e4f5f40d133018514c664efeb90a8ff9?rik=c6EIpQd4ztpYMw&riu=http%3a%2f%2fwww.easyloanscur.com%2fimages%2flogin-icon.png&ehk=51PAUVKiVvN9WJTyNB9jE%2bYipg232zsMoHxoxnmf%2fIg%3d&risl=&pid=ImgRaw&r=0"
                alt="login-icon"
                style={{height:'7rem'}}
            
                />

            </div>

                  
        <form id="form_login">
           
            <div>
                <h1 class= "text-center fs-1 mt-3">Login</h1>
                <br></br>
           

                <div class= "input-group mt-3">
                <div class= "input-group-text bg-info">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828461.png"
                    style={{height:'1rem'}}/>
            
                    </div>
                <input class="form-control" type="text" id="txtusuario"  placeholder='Usuario'  required/>
                </div>
            </div>
            
            <div class= "input-group mt-1">
                <div class= "input-group-text bg-info">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
                    style={{height:'1rem'}}/>
                    </div>
                   
                <input class="form-control" type="password" id="txtcontraseña"  placeholder='Contraseña'  required/>
            
           
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







