<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $link = mysqli_connect("localhost", "root", "", "sharehere");
  if (mysqli_connect_error()){
      echo "<script>console.log('connection not established')</script>";
      die("<script>console.log('There is a problem with mysql connection')</script>");
  }

?>
   