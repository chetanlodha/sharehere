<?php
session_start();
require_once '../php/conn.php';

if (mysqli_connect_error()) {
    die("<script>console.log('There is a problem with mysql connection')</script>");
}
if (isset($_SESSION['sess_id'])) {
    $data = array();
    $sess_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
    $result = mysqli_query($link, "SELECT * FROM `friend_requests` where `receiver_id` = '$sess_id'");
    //$row = $result -> fetch_all();
    while ($row = mysqli_fetch_assoc($result)) {
        $sender_id = $row['sender_id'];
        $sql = "SELECT `name` , `profile_picture` , `id` FROM `users` WHERE `id` = '$sender_id'";
        $user_fetch = mysqli_query($link, $sql);
        $user = $user_fetch->fetch_assoc();
        // print_r($user);
        array_push($data, $user);
    }

    echo json_encode($data);
} else {
    echo "error";
}
?>