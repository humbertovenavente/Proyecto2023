<?php


include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data['usuario'];    
    $nusuario = $data['nusuario'];    
    $srusuario = $data['srusuario'];

    // echo '$categoria';

    $sql = "UPDATE usuario SET rol='$srusuario', activo='$nusuario' where username='$usuario'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
