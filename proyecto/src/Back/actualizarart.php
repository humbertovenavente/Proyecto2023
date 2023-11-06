<?php

include "conexion.php";
header ("Content-Type: application/json");

if ($conexion) {
//    echo "Conexion correcta";
}else {
//    echo "No hubo conexion ";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insertar un nuevo registro
    $data = json_decode(file_get_contents('php://input'), true);
    $id_art = $data['id_art'];
    $username = $data['username'];
    $titulo = $data['titulo'];
    $cita_relevante = $data['cita_relevante'];
    $contenido1 = $data['contenido1'];
    $contenido2 = $data['contenido2'];
    $contenido3 = $data['contenido3'];
    $id_subcategoria = $data['id_subcategoria'];
    $video = $data['video'];
    $tipo_articulo = $data['tipo_articulo'];
    $plantilla = $data['plantilla'];
    $imagen1 = $data['imagen1'];    
    $imagen2 = $data['imagen2'];    
    $imagen3 = $data['imagen3'];    
    $imagen4 = $data['imagen4'];    
    $imagen5 = $data['imagen5'];
    $imagen1_desc = $data['imagen1_desc'];    
    $imagen2_desc = $data['imagen2_desc'];    
    $imagen3_desc = $data['imagen3_desc'];    
    $imagen4_desc = $data['imagen4_desc'];    
    $imagen5_desc = $data['imagen5_desc'];
    

        
    //echo $fecha_registro;
    //$sql = "INSERT INTO articulos ( status, username   , titulo_articulo, cita_relevante,    contenido_articulo , ) 
               //            VALUES ( '0'   , '$username', '$titulo'      , '$cita_relevante', '$contenido1')";
                           
   $sql = "UPDATE articulos SET status = 0 , titulo_articulo='$titulo' , cita_relevante='$cita_relevante' , contenido_articulo='$contenido1' , contenido_articulo2='$contenido2' , contenido_articulo3='$contenido3' , id_subcategoria='$id_subcategoria' , video_articulo='$video' , tipo_articulo='$tipo_articulo' , plantilla='$plantilla' , imagen1='$imagen1' , imagen2='$imagen2' , imagen3='$imagen3' , imagen4='$imagen4' , imagen5='$imagen5' , imagen1_desc ='$imagen1_desc' , imagen2_desc ='$imagen2_desc' , imagen3_desc ='$imagen3_desc' , imagen4_desc ='$imagen4_desc' , imagen5_desc='$imagen5_desc' where id_articulo = '$id_art';";
   
     // $sql = "UPDATE articulos SET status = 0 , titulo_articulo='$titulo' , cita_relevante='$cita_relevante' , contenido_articulo='$contenido1' , contenido_articulo2='$contenido2' , contenido_articulo3='$contenido3' , id_subcategoria='$id_subcategoria' , video_articulo='$video' , tipo_articulo='$tipo_articulo' , plantilla='$plantilla' , imagen1='$imagen1' , imagen2='$imagen2' , imagen3='$imagen3' , imagen4='$imagen4' , imagen5='$imagen5' , imagen1_desc ='$imagen1_desc' , imagen2_desc ='$imagen2_desc' , imagen3_desc ='$imagen3_desc' , imagen4_desc ='$imagen4_desc' , imagen5_desc ='$imagen5_desc';";
        
    //echo ($sql);
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
