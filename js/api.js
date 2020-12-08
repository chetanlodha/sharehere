
$("#createPost").on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    let formData = new FormData(this);
    formData.append('action', 'create');
    $.ajax({
        url: "php/post/post.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function (data) {
            if (data == 'invalid') {
                alert('Invalid file!');
            }
            console.log(data);
            data = JSON.parse(data);
            console.log(data);
            if (!data.hasOwnProperty('post_id'))
                return
            console.log('post');
            appendPost(data, 'home');
            // $('.post:first-child').addClass('animatePost shadow-light');
            // if ($('.post:first-child').find('.media .images img').length > 0)
            //     $('.post:first-child').find('.images').lightGallery({
            //         download: false
            //     });
            setUpPostActions('homes');
            $('.post:first-child').addClass('animatePost shadow-light');
            form.children('textarea').val('');
            form.find('input').val('');
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
            if (!data[0].hasOwnProperty('post_id')) {
                $()
            }
            console.log(data);
            appendAllPosts(data, 'home');
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

const deletePost = (postId) => {
    console.log(postId);
    let data = {
        action: 'delete',
        post_id: postId
    }
    $.ajax({
        url: `php/post/post.php`,
        type: "POST",
        data: data,
        cache: false,
        success: function () {
            return;
        },
        error: function (e) {
            alert("Failed to get profile details!");
        }
    });
}

const populateProfilePage = () => {
    let url = new URL(window.location.href);
    let profileId = url.searchParams.get('profile');
    $.ajax({
        url: `php/post/profile_post.php`,
        type: "GET",
        data: { id: profileId },
        cache: false,
        success: function (data) {
            data = JSON.parse(data)[0];
            console.log(data);
            appendAllPosts(data.post, 'profile');
            populateProfileHeader(data.profile_data);
        },
        error: function (e) {
            alert("Failed to get profile details!");
        }
    });
}

const createComment = (postId, content) => {
    let data = {
        action: 'create',
        post_id: postId,
        content: content
    }
    $.ajax({
        url: "php/post/comments.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (data) {
            let commentsContainer = $(`.post[data-postid=${postId}] .latest-comments`)[0];
            data = JSON.parse(data);
            appendComment(postId, data);
            commentsContainer.scrollTo({ top: commentsContainer.scrollHeight, behavior: "smooth" })
            $(`.post[data-postid=${postId}] .latest-comments .comment:last-child`).addClass('visible');
            setUpCommentActions(postId);
        },
        error: function (e) {
            alert("Failed to create comment!");
        }
    });
}

const getComments = (postId) => {
    let data = {
        action: 'fetch',
        post_id: postId
    }
    $.ajax({
        url: "php/post/comments.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            appendAllComments(postId, data);
        },
        error: function (e) {
            alert("Failed to get comments!");
        }
    });
}

const deleteComment = (postId, dateCreated, comment) => {
    let data = {
        action: 'delete',
        post_id: postId,
        date_created: dateCreated
    }
    $.ajax({
        url: "php/post/comments.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (data) {
            console.log(data);
            comment.addClass('remove');
            setTimeout(() => {
                comment.remove();
            }, 500)
        },
        error: function (e) {
            alert(`Failed to remove comment!`);
            console.log(e);
        }
    });
}

getAllPosts();
