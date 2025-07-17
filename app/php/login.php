<?php
include "db.php";

session_start();

function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST['uname']) && isset($_POST['password'])) {

    $uname = validate($_POST['uname']);
    $pass = validate($_POST['password']);

    if (empty($uname)) {
        header("Location: ../login.php?error=User Name is required");
        exit();
    }else if(empty($pass)){
        header("Location: ../login.php?error=Password is required");
        exit();
    }else{
        $pass = md5($pass);
        $sql = "SELECT * FROM users WHERE username=? AND password=?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $uname, $pass);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION['username'] = $row['username'];
            $_SESSION['name'] = $row['name'];
            $_SESSION['id'] = $row['id'];
            header("Location: ../dashboard.php");
            exit();
        }else{
            header("Location: ../login.php?error=Incorect User name or password");
            exit();
        }
    }

}else{
    header("Location: ../login.php");
    exit();
}
