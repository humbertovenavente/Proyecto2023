<?php


include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $id_comentario = $data['id_comentario'];    
    // $estadoAnuncio = $data['estadoAnuncio'];    

    // echo '$categoria';

    $sql = "UPDATE comentarios SET status = 1 , autocensura = '' where id_comentario = '$id_comentario'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
    
}

?>
