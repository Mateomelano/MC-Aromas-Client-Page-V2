<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: index.php');
  exit;
}

$email    = trim($_POST['email']);
$password = $_POST['password'];

if (!$email || !$password) {
  header('Location: index.php?error=Completa todos los campos');
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE mail = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['contrasena'])) {
  $_SESSION['user_id']   = $user['id'];
  $_SESSION['user_name'] = $user['nombre'];
  header('Location: dashboard.php');
} else {
  header('Location: index.php?error=Credenciales inválidas');
}
