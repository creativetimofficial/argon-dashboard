<?php
include "db.php";

session_start();

function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST['uname']) && isset($_POST['password']) && isset($_POST['email'])) {

    $uname = validate($_POST['uname']);
    $pass = validate($_POST['password']);
    $email = validate($_POST['email']);

    if (empty($uname)) {
        header("Location: ../register.php?error=User Name is required");
        exit();
    }else if(empty($pass)){
        header("Location: ../register.php?error=Password is required");
        exit();
    }else if(empty($email)){
        header("Location: ../register.php?error=Email is required");
        exit();
    }else{
        $sql = "SELECT * FROM users WHERE username=? ";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $uname);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
            header("Location: ../register.php?error=The username is taken, try another");
            exit();
        }else {
            $pass = md5($pass);
            $sql2 = "INSERT INTO users(username, password, email) VALUES(?, ?, ?)";
            $stmt2 = mysqli_prepare($conn, $sql2);
            mysqli_stmt_bind_param($stmt2, "sss", $uname, $pass, $email);
            $result2 = mysqli_stmt_execute($stmt2);
            if ($result2) {
                header("Location: ../login.php?success=Your account has been created successfully");
                exit();
            }else {
                header("Location: ../register.php?error=unknown error occurred");
                exit();
            }
        }
    }

}else{
    header("Location: ../register.php");
    exit();
}
