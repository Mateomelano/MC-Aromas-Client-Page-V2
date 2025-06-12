<?php
session_start();

// **1) Conexión a la base de datos**
$host = "185.211.7.154";
$db     = 'u617835785_merceria';
$user   = 'u617835785_root1';
$pass   = 'Merceriachela1';
$charset= 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// **2) Carga de PHPMailer (instala con Composer: `composer require phpmailer/phpmailer`)**
require __DIR__ . '/vendor/autoload.php';
