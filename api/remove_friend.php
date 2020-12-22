<?php
session_start();
require_once '../php/conn.php';

if (mysqli_connect_error()) {
    die("<script>console.log('There is a problem with mysql connection')</script>");
}
if (isset($_POST['friend_id'])) {
    $data = array();
    $sess_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
    $friend_id = mysqli_real_escape_string($link, $_POST['friend_id']);
    $result = mysqli_query($link, "DELETE FROM `friends` WHERE (`user_id` = '$sess_id' AND `friend_id` = '$friend_id') OR (`user_id` = '$friend_id' AND `friend_id` = '$sess_id')");
    // echo $result;
    if ($result) {
        $data['status'] = 201;
        $data['error'] = 'Removed';
    } else {
        $data['status'] = 301;
        $data['error'] = 'No deleted Error';
    }
    echo json_encode($data);
} else {
    echo "error";
}
?>