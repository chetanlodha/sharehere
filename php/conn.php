<?php

  $link = mysqli_connect("localhost", "root", "", "Sharehere");

 if (mysqli_connect_error()){
     echo "<script>console.log('connection not established')</script>";
     die("<script>console.log('There is a problem with mysql connection')</script>");
 }

?>
   