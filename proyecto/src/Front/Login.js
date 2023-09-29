import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const navigate = useNavigate();
    const [miLogin, setMiLogin] = useState("flase");

    const [usuario, setUsuario] = useState("");
    const [contraseña, setcontraseña ] = useState("");

    function entrar(e){
        e.preventDefault();
        var txtusuario = document.getElementById("txtusuario").value;
        var txtcontraseña = document.getElementById("txtcontraseña").value;
        
        if (usuario === "jose" && contraseña === "12345"){
            navigate("/home")
            //document.getElementById("form_login").style.display = "none";
        }else{
            setMiLogin("false");
            document.getElementById("txtusuario").value = "";
            document.getElementById("txtcontraseña").value = "";
        }
    }


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
                <input class="form-control" type="text" id="txtusuario"  placeholder='Usuario' onChange={(e) => setUsuario(e.target.value)} required/>
                </div>
            </div>
            
            <div class= "input-group mt-1">
                <div class= "input-group-text bg-info">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
                    style={{height:'1rem'}}/>
                    </div>
                   
                <input class="form-control" type="password" id="txtcontraseña"  placeholder='Contraseña' onChange={(e) => setcontraseña(e.target.value)} required/>
            </div>
            <br></br>
            <div class="btn btn-info text-white w-100 mt-3">
            <input type="submit"  className="btn btn-info text-white w-100" value="Entrar" onClick={entrar}/>
            </div>
            </form>


            </div>
            </div>
            </body>
        </div>
    )
}







