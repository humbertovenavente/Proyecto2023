<?php

include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];    

    $sql = "UPDATE usuario SET rol=2, suscripcion='X' where username='$username'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro actualizado exitosamente";
    } else {
        echo "Error al actualizar el registro: " . $conexion->error;
    }
}

?>
