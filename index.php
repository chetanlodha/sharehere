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

      <nav>
        <div class="navbar flex-column justify-content-between align-items-center h-100 pt-3">
          <div class="d-flex align-items-center order-1">
            <h3 class="nav-header font-weight-bold">Sharehere</h3>
            <img class="profile-icon ml-3 d-md-none" src="./assets/user/profileImage.jpeg" id="toggleLogoutContainer" alt="User profile" />
          </div>
          <ul class="nav-items d-flex flex-md-column mb-0 order-3 order-md-2">
            <a href="#">
              <li class="nav-item rounded mt-2 active">
                <img src="assets/icons/nav-home.svg" alt="Home" />
                <span class="d-none d-md-block ml-3">Home</span>
              </li>
            </a>
            <a href="search.html">
              <li class="nav-item rounded mt-2">
                <img src="assets/icons/nav-search.svg" alt="Search" />
                <span class="d-none d-md-block ml-3">Search</span>
              </li>
            </a>
            <a href="notifications.html">
              <li class="nav-item rounded mt-2">
                <img src="assets/icons/nav-notification.svg" alt="Notifications" />
                <span class="d-none d-md-block ml-3">Notifications</span>
              </li>
            </a>
            <a href="profile.html">
              <li class="nav-item rounded mt-2">
                <img src="assets/icons/nav-profile.svg" alt="Profile" />
                <span class="d-none d-md-block ml-3">Profile</span>
              </li>
            </a>
          </ul>
          <div class="logoutContainer visible d-flex flex-row justify-content-center mt-4 mb-3 mb-md-3 mt-md-0 order-2 order-md-2">
            <img class="profile-icon d-none d-md-block" src="assets/user/profileImage.jpeg" alt="User profile" />
            <div class="ml-2 d-flex flex-row flex-md-column justify-content-center">
              <div>
                <h5 class="mb-0 font-weight-bold"><?php echo $_SESSION['user_name'] ?></h5>
                <span><small><?php echo $_SESSION['sess_user'] ?></small></span>
              </div>
              <a href="logout.php">
                <button class="btn btn-sm btn-light ml-3 ml-md-0 mt-md-2">Logout</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div class="main d-flex justify-content-center align-items-center">
        <h2>asdasd</h2>
      </div>

    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  </body>

  <script src="./js/common.js"></script>

  </html>
<?php } ?>