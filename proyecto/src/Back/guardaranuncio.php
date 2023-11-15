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
    $titulo_anuncio = $data['titulo_anuncio'];
    $detalle_anuncio = $data['detalle_anuncio'];
    $url_anuncio = $data['url_anuncio'];
    $url_imagen = $data['url_imagen'];
    

        
    //echo $fecha_registro;
    //$sql = "INSERT INTO articulos ( status, username   , titulo_articulo, cita_relevante,    contenido_articulo , ) 
               //            VALUES ( '0'   , '$username', '$titulo'      , '$cita_relevante', '$contenido1')";
                           
   $sql = "INSERT INTO anuncios ( titulo_anuncio , detalle_anuncio , activo , url_anuncio , url_imagen ) VALUES ( '$titulo_anuncio' , '$detalle_anuncio' , 'X' , '$url_anuncio' , '$url_imagen');";
        
    //echo ($sql);
    
    if ($conexion->query($sql) === TRUE) {
        echo "Registro insertado exitosamente";
    } else {
        echo "Error al insertar el registro: " . $conexion->error;
    }
}

?>
