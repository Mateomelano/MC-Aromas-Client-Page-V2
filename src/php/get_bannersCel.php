<?php
include 'db.php';

$result = $conn->query("SELECT url FROM bannersCel");
$banners = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $banners[] = $row['url'];
    }
}

header('Content-Type: application/json');
echo json_encode($banners);
