<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

$host = "localhost"; 
$user = "root";
$password = "mateo";
$dbname = "mc_aromas"; 

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión']));
}

$sql = "SELECT url FROM banners";
$result = $conn->query($sql);

$banners = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $banners[] = $row['url'];
    }
}

$conn->close();

echo json_encode($banners);
?>
