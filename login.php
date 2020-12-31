<?php
session_start();
if (isset($_SESSION['sess_id']) && isset($_SESSION['sess_user'])) {
  header("Location: index.php");
} else {
?>
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"> -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/common.css">
    <link rel="stylesheet" href="styles/authentication.css">
    <title>Sharehere | Login</title>
  </head>

  <body>
    <div class="container d-flex align-items-center justify-content-center">

      <div class="authentication d-flex flex-md-row flex-column justify-content-center align-items-center w-100">

        <img class="col-sm-12 col-md-6" src="assets/illustrations/login.svg" alt="Login illustration">

        <div class="form-container col-sm-12 col-md-6 text-center">

          <h2 class="font-weight-bold mt-4 mt-lg-0">Login</h2>
          <form name="form" method="post">
            <div class="form-group mt-5">
              <label for="email" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="email" name="Email" id="email" placeholder="Email" required>
            </div>
            <div class="form-group mt-3">
              <label for="password" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="password" name="password" id="password" placeholder="Password" required>
            </div>
            <button class="btn btn-primary mt-2" type="submit">Login</button>
          </form>
          <p class="mt-4">
            Don't have an account?
            <a href="register.php"><span class="font-weight-bold"> Create one now.</span></Link>
          </p>

        </div>
      </div>
    </div>

    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
    crossorigin="anonymous"></script> -->
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
      function validateEmail() {
        var email = $("#email").val();
        var emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (emailReg.test(email)) {
          return true;
        } else {
          return false;
        }
      }


      $('form').on('submit', function(e) {
        e.preventDefault();
        // alert('helo');
        var error = "";

        if (validateEmail()) {

        } else {
          // $("#email").css("border-color","red");
          error = error + 'email';
        }

        if ($("#password").val() == "") {
          // $("#password").css("border-color","red");
          error = error + 'password';
        } else {

        }

        if (error == "") {

          $.ajax({
            type: 'POST',
            url: 'php/loginProcess.php',
            dataType: "json",
            data: {
              email: $("#email").val(),
              password: $("#password").val()
            },
            success: function(data) {
              console.log('form');
              if (data.status == 201) {
                window.location = "index.php";
              } else if (data.status == 301) {
                alert(data.error);

              }

            }
          });
        } else {

        }
      });
    </script>
  </body>

  </html>
<?php } ?>