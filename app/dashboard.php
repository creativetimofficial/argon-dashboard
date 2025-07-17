<?php
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['username'])) {

?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <h1>Hello, <?php echo $_SESSION['username']; ?></h1>
    <a href="php/logout.php">Logout</a>

    <div class="container">
        <form action="php/upload.php" method="post" enctype="multipart/form-data">
            <h2>Upload File</h2>
            <?php if (isset($_GET['error'])) { ?>
                <p class="error"><?php echo $_GET['error']; ?></p>
            <?php } ?>
            <?php if (isset($_GET['success'])) { ?>
                <p class="success"><?php echo $_GET['success']; ?></p>
            <?php } ?>
            <input type="file" name="file">
            <button type="submit" name="submit">UPLOAD</button>
        </form>
    </div>

    <div class="container">
        <form action="php/create_folder.php" method="post">
            <h2>Create Folder</h2>
            <?php if (isset($_GET['error_folder'])) { ?>
                <p class="error"><?php echo $_GET['error_folder']; ?></p>
            <?php } ?>
            <?php if (isset($_GET['success_folder'])) { ?>
                <p class="success"><?php echo $_GET['success_folder']; ?></p>
            <?php } ?>
            <input type="text" name="folder_name" placeholder="Folder Name">
            <button type="submit" name="submit">Create</button>
        </form>
    </div>

    <div class="container">
        <h2>Files</h2>
        <form action="" method="get">
            <input type="text" name="search" placeholder="Search for files">
            <button type="submit">Search</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th>File Type</th>
                    <th>Upload Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                include "php/db.php";
                $search = "";
                if(isset($_GET['search'])){
                    $search = $_GET['search'];
                    $sql = "SELECT * FROM files WHERE user_id = '".$_SESSION['id']."' AND file_name LIKE '%$search%'";
                }else{
                    $sql = "SELECT * FROM files WHERE user_id = '".$_SESSION['id']."'";
                }
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                ?>
                <tr>
                    <td><?php echo $row['file_name']; ?></td>
                    <td><?php echo $row['file_size']; ?></td>
                    <td><?php echo $row['file_type']; ?></td>
                    <td><?php echo $row['upload_date']; ?></td>
                    <td>
                        <a href="php/download.php?file_id=<?php echo $row['id']; ?>">Download</a>
                        <a href="php/delete.php?file_id=<?php echo $row['id']; ?>">Delete</a>
                        <a href="php/share.php?file_id=<?php echo $row['id']; ?>">Share</a>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <div class="container">
        <h2>Folders</h2>
        <table>
            <thead>
                <tr>
                    <th>Folder Name</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT * FROM folders WHERE user_id = '".$_SESSION['id']."'";
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                ?>
                <tr>
                    <td><?php echo $row['folder_name']; ?></td>
                    <td><?php echo $row['created_at']; ?></td>
                    <td>
                        <a href="php/delete_folder.php?folder_id=<?php echo $row['id']; ?>">Delete</a>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <div class="container">
        <h2>Activity Logs</h2>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT activity_logs.*, users.username FROM activity_logs JOIN users ON activity_logs.user_id = users.id WHERE user_id = '".$_SESSION['id']."' ORDER BY activity_logs.created_at DESC";
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                ?>
                <tr>
                    <td><?php echo $row['username']; ?></td>
                    <td><?php echo $row['action']; ?></td>
                    <td><?php echo $row['details']; ?></td>
                    <td><?php echo $row['created_at']; ?></td>
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
