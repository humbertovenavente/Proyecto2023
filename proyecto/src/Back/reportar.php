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

        $id_articulo = $data ['id_articulo'];
        $nodo_padre = $data ['nodo_padre'];
        $nodo = $data ['nodo'];
        $nivel = $data ['nivel'];
        $reporte = $data ['reporte'];
        $username = $data ['username'];

        $sql = "INSERT INTO reportes (id_articulo, nodo_padre, nodo, nivel, reporte, username) VALUES ('$id_articulo', '$nodo_padre', '$nodo', '$nivel', '$reporte', '$username')";

        // echo $sql;
        
        if ($conexion->query($sql) === TRUE) {
            echo "Registro insertado exitosamente";

            $sql2 = "CALL act_num_reportes( $id_articulo, '$nodo_padre', '$nodo', $nivel, '$reporte', '$username' );";
            if ($conexion->query($sql2) === TRUE) {
                echo "Actualización de Num. de Reportes Exitoso";
            } else {
                echo "Error al Actualizar Num. de Reportes:" . $conexion->error;
            }                

        } else {
            echo "Error al insertar el registro: " . $conexion->error;
        }

    }

?>
