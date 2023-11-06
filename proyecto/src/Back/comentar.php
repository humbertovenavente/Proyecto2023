<?php

    include "conexion.php";

    header ("Content-Type: application/json");

    if ($conexion) {
        echo "Conexion correcta";
    }else {
        echo "No hubo conexion ";
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $v_articulo = $data ['v_articulo'];  
        $v_nodopadre = $data ['v_nodopadre'];  
        $v_nodo = $data ['v_nodo'];  
        $v_nivel = $data ['v_nivel'];  
        $v_comentario = $data ['v_comentario'];  
        $v_username = $data ['v_username'];  

        $sql = "CALL insertComment( $v_articulo, '$v_nodopadre', '$v_nodo', $v_nivel, '$v_comentario', '$v_username' );"; 
        
        if ($conexion->query($sql) === TRUE) {
            echo "Registro insertado exitosamente";
        } else {
            echo "Error al insertar el registro: " . $conexion->error;
        }

    }

?>
