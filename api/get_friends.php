<?php
// $mysqli = new mysqli("localhost", "root", "", "sharehere");

// if ($mysqli -> connect_errno) {
//   echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
//   exit();
// }
require_once '../php/conn.php';
if (mysqli_connect_error()) {
    die("<script>console.log('There is a problem with mysql connection')</script>");
}

if (isset($_POST['user_id'])) {
    $allData = array();
    $sess_id = mysqli_real_escape_string($link, $_POST['user_id']);
    //  $sess_id = 1;
    $sql = "SELECT * FROM `friends` WHERE `user_id` = '$sess_id' OR `friend_id` = '$sess_id'";
    $result = mysqli_query($link, $sql);
    $row_count =  $result->num_rows;

    // Associative array
    $data = $result->fetch_all();
    // print_r($data);
    $data_user = array();

    foreach ($data as $row) {
        if ($row[1] == $sess_id) {
            $friend = $row[2];
            $get_user = "SELECT * FROM `users` WHERE `id` = '$friend'";
            $result =  mysqli_query($link, $get_user);
            array_push($data_user, $result->fetch_assoc());
        } else {
            $friend = $row[1];
            $get_user = "SELECT * FROM `users` WHERE `id` = '$friend'";
            $result =  mysqli_query($link, $get_user);
            array_push($data_user, $result->fetch_assoc());
        }
    }
    $allData[0] = $row_count;
    $allData[1] = $data_user;
    $allData[2] = 201;
    echo json_encode($allData);
} else {
    echo "error";
}
?>