
$("#createPost").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "php/post/create_post.php",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        cache: false,
        success: function (data) {
            if (data == 'invalid')
                alert('Invalid file!');
            else
                alert(data);
        },
        error: function (e) {
            alert("Failed to create post!");
        }
    });
});
