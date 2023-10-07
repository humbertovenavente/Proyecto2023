import React from 'react'
import { useState, useEffect } from 'react'

const Registro = () => {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  //--------------
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(function () {
      setMsg("");
    }, 15000);
  }, [msg]);


  const handleInputChange = (e, type) => {
    switch (type) {
      case "fname":
        setError("");
        setFname(e.target.value);
        if (e.target.value === "") {
          setError("El first name esta en blanco");
        }
        break;
      case "lname":
        setError("");
        setLname(e.target.value);
        if (e.target.value === "") {
          setError("El last name esta en blanco");
        }
        break;
      case "username":
        setError("");
        setUsername(e.target.value);
        if (e.target.value === "") {
          setError("El username esta en blanco");
        }
        break;
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("El email esta en blanco");
        }
        break;
      case "password1":
        setError("");
        setPassword1(e.target.value);
        if (e.target.value === "") {
          setError("El password esta en blanco");
        }
        break;
      case "password2":
        setError("");
        setPassword2(e.target.value);
        if (e.target.value === "") {
          setError("El confirm password esta en blanco");
        }
        else if (e.target.value !== password1) {
          setError("El confirm password no es el mismo");
        }
        break;
        default: 

    }
  }

  function handleSubmit() {
    if (fname !== "" && lname !== "" && username !== "" && email !== "" && password1 !== "" && password2 !== "") {
      var url = "http://gregserver/apisP/registro.php";
      var headers = { "Accept": "application/json", "Content-Type": "application/json" };
      var Data = { fname: fname, lname: lname, username: username, email: email, password1: password2 }
      fetch(url, {
        method: "POST", headers: headers, body: JSON.stringify(Data)
      }).then((response) => response.json())
        .then((response) => {
          setMsg(response[0].result);
        }).catch((err) => {
          setError(err);
          console.log(err);
        });
      setFname("");
      setLname("");
      setUsername("");
      setEmail("");
      setPassword1("");
      setPassword2("");
    }
    else {
      setError("Todos los campos son requeridos");
    }
  }

  function checkUsername() {
    var url = "http://gregserver/apisP/checkusername.php";
    var headers = { "Accept": "application/json", "Content-Type": "application/json" };
    var Data = { username: username }
    fetch(url, {
      method: "POST", headers: headers, body: JSON.stringify(Data)
    }).then((response) => response.json())
      .then((response) => {
        setError(response[0].result);
      }).catch((err) => {
        setError(err);
        console.log(err);
      });
  }

  function checkEmail() {
    var url = "http://gregserver/apisP/checkemail.php";
    var headers = { "Accept": "application/json", "Content-Type": "application/json" };
    var Data = {email: email }
    fetch(url, {
      method: "POST", headers: headers, body: JSON.stringify(Data)
    }).then((response) => response.json())
      .then((response) => {
        setError(response[0].result);
      }).catch((err) => {
        setError(err);
        console.log(err);
      });
  }

  function checkPassword() {
    if (password1.length < 8) {
      setError("El password es menor que 8 caracteres");
    }
  }

  return (

      <form class="row g-3 needs-validation" novalidate>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>


        <p>{msg !== "" ? <span className="success">{msg} </span> : <span className="error">{error} </span>}</p>

        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">First name</label>
          <input type="text" name="fname" value={fname} onChange={(e) => handleInputChange(e, "fname")}
            class="form-control" id="validationCustom01" required />
        </div>

        <div class="col-md-4">
          <label for="validationCustom02" class="form-label">Last name</label>
          <input type="text" name="lname" value={lname} onChange={(e) => handleInputChange(e, "lname")}
            class="form-control" id="validationCustom02" required />
        </div>

        <div class="col-md-4">
          <label for="validationCustom02" class="form-label">Username</label>
          <input type="text" name="username" value={username} onChange={(e) => handleInputChange(e, "username")} //onBlur={checkUsername}
            class="form-control" id="validationCustom03" required />
        </div>

        <div class="col-md-4">
          <label for="validationCustomUsername" class="form-label">Email</label>
          <div class="input-group has-validation">
            <input type="text" name="email" value={email} onChange={(e) => handleInputChange(e, "email")} //onBlur={checkEmail}
              class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
          </div>

        </div>
        <div class="col-md-4">
          <label for="validationCustom03" class="form-label">Password</label>
          <input type="password" name="password1" value={password1} onChange={(e) => handleInputChange(e, "password1")} //onBlur={checkPassword}
            class="form-control" id="validationCustom04" required />
        </div>

        <div class="col-md-4">
          <label for="validationCustom03" class="form-label">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={(e) => handleInputChange(e, "password2")}
            class="form-control" id="validationCustom05" required />
        </div>

        <div class="col-12">
          <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Registrarme</button>
        </div>
    </div>
      </form>


  )
}

export default Registro
