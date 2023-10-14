<?php

$host = "gregserver";
$user = "root";
$password = "";
$dbname = "PruebaCRUD";

$conexion = new mysqli ($host , $user , $password , $dbname);

header ("Access-Control-Allow-Origin: http://gregserver:3000");
header ("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

if ($conexion) {
    echo "si conexion";
}else {
    echo "No hubo conexion";
}

// Manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre2'];
    $email = $data['email'];
    
    $sql = "INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}


?>
