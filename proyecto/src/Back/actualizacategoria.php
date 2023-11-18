<?php

include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $categoria = $data['categoria'];    
    $ncategoria = $data['ncategoria'];    
    $scategoria = $data['scategoria'];
    $prcategoria = $data['prcategoria'];
    $plantilla = $data['plantilla'];

    // echo '$categoria';

    $sql = "UPDATE categorias SET nombre_categoria='$ncategoria', activo='$scategoria' , premium = '$prcategoria' , plantilla = $plantilla where id_categoria='$categoria'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro actualizado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
