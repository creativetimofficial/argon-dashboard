<?php
include "db.php";

if(isset($_GET['file_id'])){
    $id = $_GET['file_id'];

    $sql = "SELECT * FROM files WHERE id=$id";
    $result = mysqli_query($conn, $sql);

    $file = mysqli_fetch_assoc($result);
    $filepath = '../uploads/' . $file['file_path'];

    if (file_exists($filepath)) {
        unlink($filepath);
        $sql = "DELETE FROM files WHERE id=$id";
        mysqli_query($conn, $sql);
        include "log.php";
        log_activity($_SESSION['id'], "delete", "Deleted file: ".$file['file_name']);
        header("Location: ../dashboard.php?success=File deleted successfully");
    } else {
        header("Location: ../dashboard.php?error=File not found");
    }
}
