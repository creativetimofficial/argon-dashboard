<?php
include "db.php";
session_start();

if (isset($_POST['file_id'])) {
    $file_id = $_POST['file_id'];
    $password = $_POST['password'];
    $expires_at = $_POST['expires_at'];

    $link_token = bin2hex(random_bytes(16));

    $sql = "INSERT INTO shared_links (file_id, link_token, password, expires_at) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);

    $hashed_password = !empty($password) ? md5($password) : null;
    $expiration = !empty($expires_at) ? $expires_at : null;

    mysqli_stmt_bind_param($stmt, "isss", $file_id, $link_token, $hashed_password, $expiration);

    if (mysqli_stmt_execute($stmt)) {
        header("Location: ../share.php?file_id=$file_id&success=Link generated successfully");
    } else {
        header("Location: ../share.php?file_id=$file_id&error=Error generating link");
    }
} else {
    header("Location: ../dashboard.php");
    exit();
}
