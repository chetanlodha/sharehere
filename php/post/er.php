<?php
session_start();
?>

<!doctype html>
<html>

<head lang="en">
  <meta charset="utf-8">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <hr>


        <form id="form" method="post" enctype="multipart/form-data">
          <div class="form-group">
            <label for="name">NAME</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" required />
          </div>
          <div class="form-group">
            <label for="email">EMAIL</label>
            <input type="text" class="form-control" id="email" name="content" placeholder="Enter email" required />
          </div>
          <input id="uploadImage" type="file" name="image[]" multiple />

          <input class="btn btn-success" type="submit" value="Upload">
        </form>



        <div id="err"></div>
        <hr>
      </div>
    </div>

</body>

</html>
<script>
  var fData;
  $(document).ready(function(e) {
    $("#form").on('submit', function(e) {
      e.preventDefault();
      fData = new FormData(this);
      // fData.append("uploadImage",$(this).children('#uploadImage').files);
      // fData.append("name",$(this).children('#name'))
      // fData.append("email",$(this).children('#email'))
      console.log(fData);
      $.ajax({
        url: "create_post.php",
        type: "POST",
        data: fData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
          //$("#preview").fadeOut();
          $("#err").fadeOut();
        },
        success: function(data) {
          if (data == 'invalid') {
            // invalid file format.
            $("#err").html("Invalid File !").fadeIn();
          } else {
            // view uploaded file.
            alert(data);
            $("#err").html(data).fadeIn();
          }
        },
        error: function(e) {
          $("#err").html(e).fadeIn();
        }
      });
    });
  });
</script>