<?php
require_once 'conn.php';

if(isset($_POST['name'])){

    $data = array();  
    $from_ip = $_SERVER['REMOTE_ADDR'];
    $from_browser = $_SERVER['HTTP_USER_AGENT'];
    date_default_timezone_set("Asia/Calcutta");
    $date_now = date("r");

    $name = mysqli_real_escape_string($link, $_POST['name']) ;
    $dob = mysqli_real_escape_string($link, $_POST['dob']) ;
    $email = mysqli_real_escape_string($link, $_POST['email']) ;
    $password = mysqli_real_escape_string($link, $_POST['password']) ;
    $hashed_password = hash("sha512", $password);
    $token =bin2hex(random_bytes(15));


    $result = mysqli_query($link, "SELECT * FROM `users` WHERE `email` = '$email'");

    if (mysqli_num_rows($result) !=0 ) { 
        $data['status'] = 301;
        $data['error'] = 'This Email ID is already registered';
        echo json_encode($data);
    }else{
        $query = "INSERT INTO `users` (`name`, `email`, `password`,`date_of_birth`,`profile_picture`,`token`, `date`, `from_ip`, `from_browser`) VALUES ('$name', '$email', '$hashed_password','$dob','','$token','$date_now', '$from_ip', '$from_browser')";

        // echo $query;
        
        if($result = mysqli_query($link, $query))
        {  
            $data['status'] = 201;
            echo json_encode($data);
        }  
        else  
        {  
            $data['status'] = 601;
            $data['error'] = $link -> error;
            echo json_encode($data);
        }
    }
}


?>
