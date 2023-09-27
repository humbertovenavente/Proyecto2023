import React from 'react'

const Registro = () => {
  return (

    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
      
      <form class="row g-3 needs-validation" novalidate>
  <div class="col-md-4">
    <label for="validationCustom01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationCustom01" required/>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustom02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationCustom02"  required/>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustomUsername" class="form-label">Email</label>
    <div class="input-group has-validation">
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
      <div class="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustom03" class="form-label">Password</label>
    <input type="password" class="form-control" id="validationCustom03" required/>
    <div class="invalid-feedback">
      Please provide a valid password.
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationCustom03" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="validationCustom03" required/>
    <div class="invalid-feedback">
      Please provide a valid password.
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Registrarme</button>
  </div>
</form>


    </div>
  )
}

export default Registro
