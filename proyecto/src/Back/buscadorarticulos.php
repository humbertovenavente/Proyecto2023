<?php

    include "conexion.php";

header ("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");
    

$data = file_get_contents("php://input");
$data = json_decode($data, true);

    $id_cat    = $data['id_cat'];
    $id_titulo = $data['id_titulo'];
    $id_autor = $data['id_autor'];
    $id_fecha = $data['id_fecha'];

    $query = "SELECT * from top_articulos";

    $tienewhere = 0;

    if ( (!empty($id_cat)) || (!empty($id_titulo)) || (!empty($id_autor)) || (!empty($id_fecha)) ) {
        $query = $query . " where";
    }

    if (!empty($id_cat)) {
        $query = $query . " id_categoria = " . $id_cat;
        $tienewhere = 1;
    }

    if (!empty($id_autor)) {
        if ($tienewhere == 1) {
            $query = $query . " and";
        }
        $query = $query ." username like '%" . $id_autor . "%'";
        $tienewhere = 1;
    }

    if (!empty($id_titulo)) {
        if ($tienewhere == 1) {
            $query = $query . " and";
        }
        $query = $query ." ( titulo_articulo like '%" . $id_titulo . "%' or contenido_articulo like '%" . $id_titulo . "%' )";
        $tienewhere = 1;
    }

    if (!empty($id_fecha)) {
        if ($tienewhere == 1) {
            $query = $query . " and";
        }
        $id_fecha2 = strtotime($id_fecha);
        $id_fecha3 = date('Y-m-d',$id_fecha2);
        $query = $query ." fecha_publicacion = '" . $id_fecha . "'";
    }

    $query = $query . ";";

    $result = mysqli_query ($conexion , $query);

    $articles = array();
    while($row = mysqli_fetch_assoc($result)) {
        $articles[] = $row;
    }
    echo json_encode($articles);
?>
