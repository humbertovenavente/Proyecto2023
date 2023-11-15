<?php


include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $id_anuncio = $data['id_anuncio'];    
    $estadoAnuncio = $data['estadoAnuncio'];    

    // echo '$categoria';

    $sql = "UPDATE anuncios SET activo='$estadoAnuncio' where id_anuncio ='$id_anuncio'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
