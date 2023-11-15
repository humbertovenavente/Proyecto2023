<?php


include "conexion.php";
header ("Content-Type: application/json");

// sleep(5);
echo "llego";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $id_comentario = $data['id_comentario']; 
    $e_id_art = $data['e_id_art'];  
    $e_nod_pad = $data['e_nod_pad'];  
    $e_nodo = $data['e_nodo'];  
    $e_nivel = $data['e_nivel'];     
    
    // echo '$categoria';

    $sql = "UPDATE comentarios SET n_reportes = 0 , status = 0 , autocensura = '' where id_comentario = '$id_comentario'";
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }

    $sql2 = "DELETE FROM reportes where id_articulo = $e_id_art AND nodo_padre = '$e_nod_pad' AND nodo = '$e_nodo' AND nivel = $e_nivel";
    
    if ($conexion->query($sql2) === TRUE) {
        echo "Reporte borrado exitosamente";
    } else {
        echo "Error al borrar registro: " . $conexion->error;
    }
}

?>
