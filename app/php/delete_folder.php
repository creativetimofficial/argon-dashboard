<?php
include "db.php";

if(isset($_GET['folder_id'])){
    $id = $_GET['folder_id'];

    $sql_select = "SELECT * FROM folders WHERE id=$id";
    $result = mysqli_query($conn, $sql_select);
    $folder = mysqli_fetch_assoc($result);

    $sql = "DELETE FROM folders WHERE id=$id";
    mysqli_query($conn, $sql);
    include "log.php";
    session_start();
    log_activity($_SESSION['id'], "delete_folder", "Deleted folder: ".$folder['folder_name']);
    header("Location: ../dashboard.php?success_folder=Folder deleted successfully");
}
