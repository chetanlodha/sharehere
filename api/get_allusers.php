<?php
session_start();
require_once '../php/conn.php';

if (mysqli_connect_error()) {
    die("<script>console.log('There is a problem with mysql connection')</script>");
}
if (isset($_SESSION['sess_id']) && isset($_POST['keyword'])) {
    $data = array();
    $friends = array();
    $users = array();
    $notifications = array();
    $sess_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
    $keyword = mysqli_real_escape_string($link, $_POST['keyword']);
    // $keyword = "nancy";

    $result = mysqli_query($link, "SELECT `name` , `profile_picture`, `id` FROM `users` WHERE (`id` != '$sess_id') && (`name` like '%$keyword%')");
    // print_r();
    $friendresult = mysqli_query($link, "SELECT * FROM `friends` WHERE (`user_id` = '$sess_id' OR `friend_id` = '$sess_id')");

    if ($result) {
        $i = 0;
        // $row = mysqli_fetch_assoc($result);
        while ($row = mysqli_fetch_assoc($result)) {
            //print_r($row);
            //  echo json_encode($row);
            // array_push($users[$i],$row);
            $users[$i]['id'] = $row['id'];
            $users[$i]['name'] = $row['name'];
            $users[$i]['profile_picture'] = $row['profile_picture'];

            $notification = mysqli_query($link, "SELECT `receiver_id` FROM `friend_requests` where `sender_id` = '$sess_id' ");
            while ($row1 = $notification->fetch_array(MYSQLI_ASSOC)) {
                array_push($notifications, $row1['receiver_id']);
            }
            if (in_array($row['id'], $notifications)) {
                $users[$i]['isAlreadySent'] = true;
            } else {
                $users[$i]['isAlreadySent'] = false;
            }

            $i++;
        }
        while ($row = $friendresult->fetch_array(MYSQLI_ASSOC)) {
            if ($row['user_id'] == $sess_id) {
                array_push($friends, $row['friend_id']);
            } else {
                array_push($friends, $row['user_id']);
            }

        }
    } else {
        $data['status'] = 301;
        $data['error'] = 'No User';
    }
    $data['friends'] = $friends;
    $data['user'] = $users;
    echo json_encode($data);
} else {
    echo "error";
}
?>