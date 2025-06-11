<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

include 'db.php';

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
