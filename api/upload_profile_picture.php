<?php
session_start();
require_once '../php/conn.php';
//print_r($_FILES["file"]["tmp_name"]);

if(isset($_FILES["file"]["tmp_name"])){
    $data = array();
    $data_image = array();
    $imgfile=$_FILES["file"]["name"]; 
    $extension = substr($imgfile,strlen($imgfile)-4,strlen($imgfile));
    //rename the image file
    $imgnewfile=md5($imgfile).$extension;
    // Code for move image into directory
   
    move_uploaded_file($_FILES["file"]["tmp_name"],"../php/post/post/uploads/".$imgnewfile);
    // Query for insertion data into database
    $sess_id = $_SESSION['sess_id'];
   
    $result = mysqli_query($link, "UPDATE `users` SET `profile_picture` = '$imgnewfile' WHERE  `id` = '$sess_id' ");
    //print_r($result);
    if ($result) {
        $data['error'] = 'Updated';
        $data['status'] = 201;
        $data['image'] = $imgnewfile;
    }else { 
        $data['status'] = 301;
        $data['error'] = 'error';
    }
    echo json_encode($data);
}else{
    echo "error";

}


?>