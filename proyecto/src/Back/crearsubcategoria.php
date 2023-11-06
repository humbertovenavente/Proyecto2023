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
    $subcategoria = $data['subcategoria'];
    $id_categoria = $data['id_categoria'];

    $sql = "INSERT INTO subcategorias (nombre_subcategoria, id_categoria, activo) VALUES ('$subcategoria', '$id_categoria', 'X')";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
