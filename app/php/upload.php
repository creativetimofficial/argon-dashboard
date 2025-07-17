<?php
include "db.php";
session_start();

if (isset($_POST['submit']) && isset($_FILES['file'])) {

    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $tmp_name = $_FILES['file']['tmp_name'];
    $error = $_FILES['file']['error'];

    if ($error === 0) {
        if ($file_size > 125000000) {
            $em = "Sorry, your file is too large.";
            header("Location: ../dashboard.php?error=$em");
        }else {
            $file_ex = pathinfo($file_name, PATHINFO_EXTENSION);
            $file_ex_lc = strtolower($file_ex);

            $allowed_exs = array("jpg", "jpeg", "png", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "zip", "rar");

            if (in_array($file_ex_lc, $allowed_exs)) {
                $new_file_name = uniqid("FILE-", true).'.'.$file_ex_lc;
                $file_upload_path = '../uploads/'.$new_file_name;
                move_uploaded_file($tmp_name, $file_upload_path);

                // Insert into Database
                $sql = "INSERT INTO files(user_id, file_name, file_path, file_size, file_type)
                        VALUES(?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "issss", $_SESSION['id'], $file_name, $new_file_name, $file_size, $file_ex_lc);
                mysqli_stmt_execute($stmt);

                include "log.php";
                log_activity($_SESSION['id'], "upload", "Uploaded file: $file_name");
                header("Location: ../dashboard.php?success=Your file has been uploaded successfully");
            }else {
                $em = "You can't upload files of this type";
                header("Location: ../dashboard.php?error=$em");
            }
        }
    }else {
        $em = "unknown error occurred!";
        header("Location: ../dashboard.php?error=$em");
    }

}else{
    header("Location: ../dashboard.php");
}
