<?php
require_once 'db.php';

$orden = $_GET['orden'] ?? '';
$busqueda = $_GET['busqueda'] ?? '';
$marca = $_GET['marca'] ?? '';
$categoria = $_GET['categoria'] ?? '';
$pagina = isset($_GET['pagina']) ? intval($_GET['pagina']) : 1;
$limite = isset($_GET['limite']) ? intval($_GET['limite']) : 50;
$offset = ($pagina - 1) * $limite;

$sqlBase = "FROM productos WHERE habilitado = 1";

// Búsqueda
if (!empty($busqueda)) {
    $busqueda = $conn->real_escape_string($busqueda);
    $sqlBase .= " AND (nombre LIKE '%$busqueda%' OR descripcion LIKE '%$busqueda%' OR marca LIKE '%$busqueda%' OR categoria LIKE '%$busqueda%')";
}

// Filtro por marca
if (!empty($marca)) {
    $marca = $conn->real_escape_string($marca);
    $sqlBase .= " AND marca LIKE '%$marca%'";
}

// Filtro por categoría
if (!empty($categoria)) {
    $categoria = $conn->real_escape_string($categoria);
    $sqlBase .= " AND categoria LIKE '%$categoria%'";
}

// Primero, contar el total (para el paginador)
$sqlTotal = "SELECT COUNT(*) as total " . $sqlBase;
$resultTotal = $conn->query($sqlTotal);
$rowTotal = $resultTotal->fetch_assoc();
$totalProductos = intval($rowTotal['total']);

// Ahora, traer los productos de la página actual
$sql = "SELECT id, nombre, descripcion, categoria, marca, precio, preciomayorista, imagen " . $sqlBase;

// Ordenamiento
switch ($orden) {
    case "preciomenor":
        $sql .= " ORDER BY precio ASC";
        break;
    case "preciomayor":
        $sql .= " ORDER BY precio DESC";
        break;
    case "az":
        $sql .= " ORDER BY nombre ASC";
        break;
    case "za":
        $sql .= " ORDER BY nombre DESC";
        break;
}

// Limitar los resultados
$sql .= " LIMIT $limite OFFSET $offset";

$result = $conn->query($sql);
$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

// Ahora respondemos con productos + total
header('Content-Type: application/json');
echo json_encode([
    'productos' => $productos,
    'total' => $totalProductos,
]);

$conn->close();
?>
