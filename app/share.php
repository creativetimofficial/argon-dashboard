<?php
include "php/db.php";
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['username'])) {
    if(isset($_GET['file_id'])){
        $file_id = $_GET['file_id'];
        $sql = "SELECT * FROM files WHERE id = $file_id AND user_id = ".$_SESSION['id'];
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0){
            $file = mysqli_fetch_assoc($result);
        }else{
            header("Location: dashboard.php?error=File not found");
            exit();
        }
    }else{
        header("Location: dashboard.php");
        exit();
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Share File</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <div class="container">
        <form action="php/generate_link.php" method="post">
            <h2>Share File: <?php echo $file['file_name']; ?></h2>
            <input type="hidden" name="file_id" value="<?php echo $file['id']; ?>">
            <label>Password (optional)</label>
            <input type="password" name="password" placeholder="Password">
            <label>Expiration Time (optional)</label>
            <input type="datetime-local" name="expires_at">
            <button type="submit">Generate Link</button>
        </form>
    </div>

    <div class="container">
        <h2>Shared Links</h2>
        <table>
            <thead>
                <tr>
                    <th>Link</th>
                    <th>Password</th>
                    <th>Expires At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT * FROM shared_links WHERE file_id = $file_id";
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                ?>
                <tr>
                    <td><a href="download_shared.php?token=<?php echo $row['link_token']; ?>">download_shared.php?token=<?php echo $row['link_token']; ?></a></td>
                    <td><?php echo $row['password'] ? 'Yes' : 'No'; ?></td>
                    <td><?php echo $row['expires_at']; ?></td>
                    <td>
                        <a href="php/delete_link.php?link_id=<?php echo $row['id']; ?>">Delete</a>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</body>
</html>
<?php
}else{
    header("Location: login.php");
    exit();
}
?>
