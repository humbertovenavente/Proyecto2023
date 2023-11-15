<?php

include "conexion.php";
header ("Content-Type: application/json");

if ($conexion) {
    echo "Conexion correcta";
}else {
    echo "No hubo conexion ";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $categoria = $data['categoria'];
    $premium = $data['premium'];

    $sql = "INSERT INTO categorias (nombre_categoria, activo , premium) VALUES ('$categoria', 'X' , '$premium')";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
