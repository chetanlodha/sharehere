<?php
session_start();
require_once '../php/conn.php';

if (mysqli_connect_error()) {
    die("<script>console.log('There is a problem with mysql connection')</script>");
}
if (isset($_SESSION['sess_id']) && isset($_POST['friend_id'])) {
    $data = array();
    $sess_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
    $friend_id = mysqli_real_escape_string($link, $_POST['friend_id']);
    $req_deleted = mysqli_query($link, "DELETE FROM `friend_requests` WHERE (`sender_id` = '$sess_id' AND `receiver_id` = '$friend_id') OR (`sender_id` = '$friend_id' AND `receiver_id` = '$sess_id')");
    if ($req_deleted) {
        $insert = "INSERT INTO `friends`(`user_id`, `friend_id`) VALUES('$sess_id','$friend_id')";
        if ($result = mysqli_query($link, $insert)) {
            $data['status'] = 201;
            $data['error'] = 'Request acccepted';
        } else {
            $data['status'] = 601;
            $data['error'] = $link->error;
        }
    }
    echo json_encode($data);
} else {
    echo "error";
}
?>