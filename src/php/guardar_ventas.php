<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$productos = json_encode($data['productos'], JSON_UNESCAPED_UNICODE);
$total = $data['total'];
$total_mayorista = $data['total_mayorista'];

$stmt = $conn->prepare("INSERT INTO ventas (productos, total, total_mayorista) VALUES (?, ?, ?)");
$stmt->bind_param("sdd", $productos, $total, $total_mayorista);

if ($stmt->execute()) {
  http_response_code(200);
  echo "Venta guardada";
} else {
  http_response_code(500);
  echo "Error al guardar venta";
}

$stmt->close();
$conn->close();
?>
