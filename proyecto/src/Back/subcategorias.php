<?php

include "conexion.php";
header ("Content-Type: application/json");

// $query = "SELECT * FROM subcategorias";

$query =    "SELECT subcategorias.id_subcategoria     AS id_subcategoria,
                    subcategorias.nombre_subcategoria AS nombre_subcategoria,
                    subcategorias.activo              AS activo,
                    subcategorias.id_categoria        AS id_categoria,
                    categorias.nombre_categoria       AS nombre_categoria
FROM subcategorias 
INNER JOIN categorias ON subcategorias.id_categoria = categorias.id_categoria";

$result = mysqli_query ($conexion , $query);

// sleep(3);

$subcategorias = array();
while($row = mysqli_fetch_assoc($result)) {
    $subcategorias[] = $row;
}
echo json_encode($subcategorias);

?>
