<?php

include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $subcategoria = $data['subcategoria'];    
    $nsubcategoria = $data['nsubcategoria'];    
    $ssubcategoria = $data['ssubcategoria'];
    $idcategoria = $data['idcategoria'];

    // echo '$categoria';

    $sql = "UPDATE subcategorias SET nombre_subcategoria='$nsubcategoria', activo='$ssubcategoria', id_categoria='$idcategoria'
     where id_subcategoria='$subcategoria'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
