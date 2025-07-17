<?php
include "db.php";

if(isset($_GET['link_id'])){
    $id = $_GET['link_id'];

    $sql = "SELECT * FROM shared_links WHERE id=$id";
    $result = mysqli_query($conn, $sql);
    $link = mysqli_fetch_assoc($result);
    $file_id = $link['file_id'];

    $sql = "DELETE FROM shared_links WHERE id=$id";
    mysqli_query($conn, $sql);
    header("Location: ../share.php?file_id=$file_id&success=Link deleted successfully");
}
