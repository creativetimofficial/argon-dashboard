<?php
function log_activity($user_id, $action, $details){
    include "db.php";
    $sql = "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "iss", $user_id, $action, $details);
    mysqli_stmt_execute($stmt);
}
