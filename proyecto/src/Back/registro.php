<?php




include "conexion.php";
header ("Content-Type: application/json");

// Manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $fname = $data ['fname'];
    $lname = $data ['lname'];
    $username = $data ['username'];
    $email = $data ['email'];
    $password = $data ['password1'];
    
    // echo "paso 1";
    $sqlIU = "INSERT INTO usuario (nombre_usuario, apellido_usuario, username, email, password_usuario, rol) VALUES ('$fname', '$lname', '$username', '$email', '$password', '1')";
      
    // echo "paso 2";
    
    if ($conexion->query($sqlIU) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}





?>
