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
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"> -->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"> -->
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="styles/notyf.min.css">
    <link rel="stylesheet" href="styles/common.css">
    <link rel="stylesheet" href="styles/authentication.css">
    <title>Sharehere | Register</title>
  </head>

  <body>
    <div class="container d-flex align-items-center justify-content-center">
      <div class="authentication d-flex flex-md-row flex-column justify-content-center align-items-center w-100">

        <img class="col-sm-12 col-md-6" src="assets/illustrations/register.svg" alt="Login illustration">

        <div class="col-sm-12 col-md-6 text-center">
          <h2 class="font-weight-bold mt-4 mt-lg-0">Register</h2>
          <form method="post">
            <div class="form-group mt-5">
              <label for="name" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="text" name="name" placeholder="Name" id="name" required>
            </div>
            <div class="form-group mt-3">
              <label for="email" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="email" name="email" placeholder="Email" id="email" required>
            </div>
            <div class="form-group mt-3">
              <label for="dob" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="date" name="dob" placeholder="Date of birth" id="dob" required>
            </div>
            <div class="form-group mt-3">
              <label for="state" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="text" name="state" placeholder="State" id="state" required>
            </div>
            <div class="form-group mt-3">
              <label for="city" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="text" name="city" placeholder="City" id="city" required>
            </div>
            <div class="form-group mt-3">
              <label for="password" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="password" name="password" placeholder="Password (at least 6 characters)" id="password" required>
            </div>
            <div class="form-group mt-3">
              <label for="confirm-password" class="d-none"></label>
              <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="password" name="confirm-password" placeholder="Confirm password" id="cnfm_password" onkeyup="matchPassword(this)" required>
            </div>
            <button class="btn btn-primary mt-2" type="submit" id="signup">Register</button>
          </form>
          <p class="mt-4">
            Already have an account?
            <a href="login.php"><span class="font-weight-bold"> Login now.</span></Link>
          </p>
        </div>

      </div>
    </div>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script> -->
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
    crossorigin="anonymous"></script> -->
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/notyf.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
      const notyf = new Notyf({
        duration: 5000,
        position: {
          x: 'right',
          y: 'top',
        },
        ripple: true,
        dismissible: true,
        icon: false
      })

      const matchPassword = (ref) => {
        if ($(ref).val() != $('#password').val())
          $(ref).addClass('error');
        else
          $(ref).removeClass('error');
      }

      $("#signup").on("click", function(e) {
        e.preventDefault();
        let error = "<ul>";
        var d = new Date();
        var n = d.getFullYear();

        if ($("#name").val() == "")
          error += '<li>Name cannot be empty</li>';
        if ($("#email").val() == "")
          error += '<li>Email cannot be empty</li>';
        if ($("#dob").val() == "")
          error += '<li>Date of birth cannot be empty</li>';
        else if ($("#dob").val().split('-')[0] > 2008) {
          error = "<li>User's age must be atleast 13 to use our product</li>";
          notyf.error(error)
          return
        }
        if ($("#state").val() == "")
          error += '<li>State cannot be empty</li>';
        if ($("#city").val() == "")
          error += '<li>City cannot be empty</li>';
        if ($("#password").val() == "")
          error += '<li>Password cannot be empty</li>';
        if ($("#cnfm_password").val() == "")
          error += '<li>Confirm password cannot be empty</li>';
        if ($('#cnfm_password').hasClass('error'))
          error += '<li>Password and confirm password must be same</li>';
        else if ($('#cnfm_password').val().length < 6)
          error += '<li>Password must be atleast 6 characters long</li>';

        error += "</ul>"

        if (error != "<ul></ul>") {
          notyf.error(error)
          return;
        }

        let form = $(this).parents('form')[0];
        let formData = new FormData(form);

        $.ajax({
          type: 'POST',
          url: 'php/registerProcess.php',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data) {
            data = JSON.parse(data);
            if (data.status == 201) {
              notyf.success("Registration sucessful. Redirecting to login");
              setTimeout(() => window.location = "login.php", 2000)
            } else
              notyf.error(data.error);
          },
          error: (data) => notyf.error(data)
        });
      });
    </script>
  </body>

  </html>
<?php } ?>