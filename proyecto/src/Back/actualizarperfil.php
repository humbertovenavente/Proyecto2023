<?php


include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data['username'];    
    $nombre_usuario = $data['nombre'];    
    $apellido_usuario = $data['apellido'];

    // echo '$categoria';

    $sql = "UPDATE usuario SET nombre_usuario='$nombre_usuario', apellido_usuario='$apellido_usuario' where username='$usuario'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
