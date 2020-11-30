<?php
session_start();
if (!isset($_SESSION["sess_user"])) {
  header("Location: login.php");
} else {
?>
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="styles/common.css">
    <link rel="stylesheet" href="styles/index.css">
    <link href="styles/hamburgers.min.css" rel="stylesheet">
    <title>Sharehere | Home</title>
  </head>

  <body onresize="onResize()">
    <div class="wrapper d-flex flex-md-row flex-column">

      <?php include('components/navbar.php'); ?>

      <div class="main d-flex flex-column justify-content-center w-100">

        <section class="home">
          <?php include('components/home.php') ?>
        </section>
        <section class="search">
          <?php include('components/search.php') ?>
        </section>
        <section class="profile">
          <?php include('components/profile.php') ?>
        </section>
        <section class="notifications">
          <?php include('components/notifications.php') ?>
        </section>

      </div>

      <?php include('components/chatbar.php'); ?>

    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  </body>

  <script src="./js/common.js"></script>

  </html>
<?php } ?>