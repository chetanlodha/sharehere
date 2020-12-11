
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
    // $sess_id = 1;
    // $friend_id = 5;
    $result = mysqli_query($link, "SELECT * FROM `friends` WHERE (`user_id` = '$sess_id' AND `friend_id` = '$friend_id')
     AND (`user_id` = '$friend_id' AND 'friend_id' = '$sess_id')");
    $row = $result->fetch_row();
    if ($row > 0) {
        $data['error'] = 'Already a friend';
        $data['status'] = 501;
    } else {

        $sql = "SELECT * FROM `friend_requests` WHERE (`sender_id` = '$sess_id' AND `receiver_id` = '$friend_id') OR (`sender_id` =  '$friend_id' AND `receiver_id` = '$sess_id')";
        $result_req = mysqli_query($link, $sql);

        $row_req = mysqli_num_rows($result_req);
        //    $row = mysqli_fetch_all($result_req);
        //    print_r($row);
        // while($row = mysqli_fetch_assoc($result_req)){      
        // }
        if ($row_req > 0) {
            $data['status'] = 301;
            $data['error'] = 'Request alreqdy sent';
        } else {
            $insert = "INSERT INTO `friend_requests`(`sender_id`, `receiver_id`) VALUES('$sess_id','$friend_id')";
            if ($result = mysqli_query($link, $insert)) {
                $data['status'] = 201;
                $data['error'] = 'Request sent';
            } else {
                $data['status'] = 601;
                $data['error'] = $link->error;
            }
        }
    }
    echo json_encode($data);
}
?>