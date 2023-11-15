<?php

    include "conexion.php";

    header ("Content-Type: application/json");

    $data = file_get_contents("php://input");
    $data = json_decode($data, true);
    $id_cat = $data ['id_cat'];

    // echo $id_cat
    // sleep(3);

    $query =    "SELECT articulos.id_articulo             AS id_articulo,
                        articulos.titulo_articulo         AS titulo_articulo,
                        articulos.contenido_articulo      AS contenido_articulo,
                        articulos.fecha_publicacion       AS fecha_publicacion,
                        articulos.tipo_articulo           AS tipo_articulo,
                        subcategorias.id_subcategoria     AS id_subcategoria,
                        subcategorias.nombre_subcategoria AS nombre_subcategoria,
                        categorias.id_categoria           AS id_categoria,
                        categorias.nombre_categoria       AS nombre_categoria
                FROM articulos 
                INNER JOIN subcategorias ON articulos.id_subcategoria  = subcategorias.id_subcategoria
                INNER JOIN categorias    ON subcategorias.id_categoria = categorias.id_categoria
                WHERE articulos.status = 1 AND categorias.id_categoria = '$id_cat'
                ORDER BY articulos.id_articulo DESC";

    // echo  $query; 

    // $result = $query     

    $result = mysqli_query ($conexion , $query);

    $articles = array();
    while($row = mysqli_fetch_assoc($result)) {
        $articles[] = $row;
    }

    echo json_encode($articles);
?>
