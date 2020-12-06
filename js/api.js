
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
            if (data == 'invalid') {
                alert('Invalid file!');
            }
            data = JSON.parse(data);
            if (!data.hasOwnProperty('post_id'))
                return
            appendPost(data, 'home');
            $('.post:first-child').addClass('animatePost shadow-light');
            if ($('.post:first-child').find('.media .images img').length > 0)
                $('.post:first-child').find('.images').lightGallery({
                    download: false
                });
        },
        error: function (e) {
            alert("Failed to create post!");
        }
    });
});

const getAllPosts = () => {
    $.ajax({
        url: `php/post/fetch_post.php`,
        type: "POST",
        cache: false,
        success: function (data) {
            data = JSON.parse(data);
            if (!data[0].hasOwnProperty('post_id'))
                return;
            console.log(data);
            appendAllPosts(data, 'home');
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

const populateProfilePage = () => {
    $.ajax({
        url: `php/post/profile_post.php`,
        type: "GET",
        data: { id: currentUser },
        cache: false,
        success: function (data) {
            data = JSON.parse(data)[0];
            console.log(data);
            appendAllPosts(data.post, 'profile');
            populateProfileHeader(data.profile_data);
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

getAllPosts();
