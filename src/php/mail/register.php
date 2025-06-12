<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: index.php');
  exit;
}

$nombre   = trim($_POST['nombre']);
$email    = trim($_POST['email']);
$password = $_POST['password'];

if (!$nombre || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$password) {
  header('Location: index.php?error=Completa todos los campos válidos');
  exit;
}

// ¿Ya existe?
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE mail = ?");
stmt->execute([$email]);
if ($stmt->rowCount()) {
  header('Location: index.php?error=El correo ya está en uso');
  exit;
}

// Hasheamos la contraseña
$hash = password_hash($password, PASSWORD_BCRYPT);

// Insertamos
$stmt = $pdo->prepare("INSERT INTO usuarios (nombre, mail, contrasena) VALUES (?,?,?)");
$stmt->execute([$nombre, $email, $hash]);

// Envío de mail de bienvenida
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
try {
  $mail->isSMTP();
  $mail->Host       = 'smtp.tuservidor.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'usuario_smtp';
  $mail->Password   = 'password_smtp';
  $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->setFrom('no-reply@mcaromas.com', 'MC Aromas');
  $mail->addAddress($email, $nombre);
  $mail->Subject = '¡Bienvenido a MC Aromas!';
  $mail->Body    = "Hola $nombre,\n\n¡Gracias por registrarte en MC Aromas!\n\n— Equipo MC Aromas";

  $mail->send();
} catch (Exception $e) {
  error_log("Error en mail: " . $mail->ErrorInfo);
}

// Redirigimos
header('Location: index.php?success=Registro exitoso');
