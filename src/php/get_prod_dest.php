<?php
require_once 'db.php'; // tu archivo de conexión

// Consulta SQL para obtener 4 productos habilitados WHERE habilitado = 1
$sql = "SELECT nombre, precio, preciomayorista, imagen FROM productos WHERE id IN (51, 198, 831, 773)";
$result = $conn->query($sql);

$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos); // devolvemos en formato JSON
$conn->close();
?>
