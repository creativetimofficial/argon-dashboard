<?php
include "db.php";
session_start();

function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST['folder_name'])) {

    $folder_name = validate($_POST['folder_name']);

    if (empty($folder_name)) {
        header("Location: ../dashboard.php?error_folder=Folder Name is required");
        exit();
    }else{
        $sql = "SELECT * FROM folders WHERE folder_name=? AND user_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "si", $folder_name, $_SESSION['id']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
            header("Location: ../dashboard.php?error_folder=The folder name is taken, try another");
            exit();
        }else {
            $sql2 = "INSERT INTO folders(user_id, folder_name) VALUES(?, ?)";
            $stmt2 = mysqli_prepare($conn, $sql2);
            mysqli_stmt_bind_param($stmt2, "is", $_SESSION['id'], $folder_name);
            $result2 = mysqli_stmt_execute($stmt2);
            if ($result2) {
                include "log.php";
                log_activity($_SESSION['id'], "create_folder", "Created folder: $folder_name");
                header("Location: ../dashboard.php?success_folder=Folder has been created successfully");
                exit();
            }else {
                header("Location: ../dashboard.php?error_folder=unknown error occurred");
                exit();
            }
        }
    }

}else{
    header("Location: ../dashboard.php");
    exit();
}
