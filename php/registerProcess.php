<?php
require_once 'conn.php';

if(isset($_POST)){

    $data = array();  
    $from_ip = $_SERVER['REMOTE_ADDR'];
    $from_browser = $_SERVER['HTTP_USER_AGENT'];
    date_default_timezone_set("Asia/Calcutta");
    $date_now = date("r");
    // print_r($_POST);
    // die();
    $name = mysqli_real_escape_string($link, $_POST['name']) ;
    $dob = mysqli_real_escape_string($link, $_POST['dob']) ;
    $email = mysqli_real_escape_string($link, $_POST['email']) ;
    $password = mysqli_real_escape_string($link, $_POST['password']) ;
    $state = mysqli_real_escape_string($link, $_POST['state']) ;
    $city = mysqli_real_escape_string($link, $_POST['city']) ;
   

    $hashed_password = hash("sha512", $password);
    $token =bin2hex(random_bytes(15));
    $testEmail = preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email);
    if(!$testEmail){
        $data['error'] = 'Invalid Email'; 
        $data['status']  = 501;
    }else{
        $result = mysqli_query($link, "SELECT * FROM `users` WHERE `email` = '$email'");

        if (mysqli_num_rows($result) !=0 ) { 
            $data['status'] = 301;
            $data['error'] = 'This Email ID is already registered';
         
        }else{
            $query = "INSERT INTO `users` (`name`, `email`, `password`,`state`,`city`,`profile_picture`,`date_of_birth`,`token`, `date`, `from_ip`, `from_browser`) 
            VALUES ('$name', '$email', '$hashed_password','$state','$city','','$dob','$token','$date_now', '$from_ip', '$from_browser')";
            if($result = mysqli_query($link, $query))
            {  
                $data['status'] = 201;
              
            }  
            else  
            {  
                $data['status'] = 601;
                $data['error'] = $link -> error;
              
            }
        }
       
    }
    echo json_encode($data);
 }
 ?>
