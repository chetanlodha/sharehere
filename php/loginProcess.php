<?php

require_once 'conn.php';

if(isset($_POST['email']) && isset($_POST['password'])){

    $data = array();  
    $from_ip = $_SERVER['REMOTE_ADDR'];
    $from_browser = $_SERVER['HTTP_USER_AGENT'];
    date_default_timezone_set("Asia/Calcutta");
    $date_now = date("r");

    $email = mysqli_real_escape_string($link, $_POST['email']) ;
    $password = mysqli_real_escape_string($link, $_POST['password']) ;
    $hashed_password = hash("sha512", $password);

    $result = mysqli_query($link, "SELECT * FROM `users` WHERE `email` = '$email' AND `password` = '$hashed_password' ");
    //print_r($result);
    if (mysqli_num_rows($result) !=0 ) {
        $row=mysqli_fetch_array($result);
                session_start();
                $_SESSION['sess_user']=$email;
                $_SESSION['sess_id']=$row['id'];
                $_SESSION['user_name'] = $row['name'];
                $_SESSION['profile_picture'] = $row['profile_picture'];
                $data['status'] = 201;
                echo json_encode($data);
		     
    }else { 
        $data['status'] = 301;
        $data['error'] = 'Invalid Email or Password';
        echo json_encode($data);
    }


}



?>
