<?php
include "php/db.php";

if(isset($_GET['token'])){
    $token = $_GET['token'];

    $sql = "SELECT * FROM shared_links WHERE link_token='$token'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        $link = mysqli_fetch_assoc($result);

        if($link['expires_at'] && strtotime($link['expires_at']) < time()){
            die("Link has expired");
        }

        if($link['password']){
            if(isset($_POST['password'])){
                if(md5($_POST['password']) == $link['password']){
                    download_file($link['file_id'], $conn);
                }else{
                    die("Incorrect password");
                }
            }else{
                ?>
                <form method="post">
                    <label>Password</label>
                    <input type="password" name="password">
                    <button type="submit">Download</button>
                </form>
                <?php
            }
        }else{
            download_file($link['file_id'], $conn);
        }

    }else{
        die("Invalid link");
    }
}

function download_file($file_id, $conn){
    $sql = "SELECT * FROM files WHERE id=$file_id";
    $result = mysqli_query($conn, $sql);

    $file = mysqli_fetch_assoc($result);
    $filepath = 'uploads/' . $file['file_path'];

    if (file_exists($filepath)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . basename($file['file_name']));
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize('uploads/' . $file['file_path']));
        readfile('uploads/' . $file['file_path']);
        exit;
    }
}
