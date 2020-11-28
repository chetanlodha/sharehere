<?php
session_start();
?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.gstatic.com">
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
            <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="text" name="Name" placeholder="Name" id="name" required>
          </div>
          <div class="form-group mt-3">
            <label for="email" class="d-none"></label>
            <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="email" name="Email" placeholder="Email" id="email" required>
          </div>
          <div class="form-group mt-3">
            <label for="dob" class="d-none"></label>
            <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="date" name="dob" placeholder="Date of birth" id="dob" required>
          </div>
          <div class="form-group mt-3">
            <label for="password" class="d-none"></label>
            <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="password" name="password" placeholder="Password" id="password" required>
          </div>
          <div class="form-group mt-3">
            <label for="confirm-password" class="d-none"></label>
            <input class="form-control col-sm-12 col-md-8 mx-auto px-4 py-4" type="password" name="confirm-password" placeholder="Confirm password" id="cnfm_password" required>
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

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
    crossorigin="anonymous"></script>
  <script src="js/jquery-3.4.1.min.js"></script>
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

        $("#signup").on("click", function(e){
            e.preventDefault();
            var error = "";

            if($("#name").val() == ""){
                error = error + 'name';
            }
            
           
            if(validateEmail()) { 
            }else{
                error = error + 'email';
            }
            

            if($("#password").val() == ""){
                error = error + 'confirm password';
            }

            if($("#cnfm_password").val() == ""){
                error = error + 'confirm password';
            }else{
                if($("#cnfm_password").val() != $("#password").val()){
                    error = error + 'confirm password failure';
                  alert("Password and Confirm password fields do not match");
                }
            }

          

            if(error == ""){
                
                $.ajax({
                    type:'POST',
                    url:'php/registerProcess.php',
                    dataType: "json",
                    data:{
                        name : $("#name").val(),
                        email : $("#email").val(),
                        password: $("#password").val(),
                        dob : $("#dob").val()
                    },
                    success:function(data){
                        if(data.status == 201){
                            alert ("Registration sucessful");
                            window.location = "login.php";
                            
                        }else if(data.status == 301){
                            //Email already registered
                            alert(data.error);
                            window.location = "login.php";
                        }else{
                            alert("Some error occured");
                        } 
                    }
                });
            }
        });
    </script>
</body>

</html>