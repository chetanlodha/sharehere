
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
            setUpPostActions('home');
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
            if (!data[0].hasOwnProperty('post_id'))
                return;
            console.log(data);
            $('.home .latest-posts .posts-container').empty();
            appendAllPosts(data, 'home');
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

const deletePost = (postId) => {
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
            populateProfileHeader(data.profile_data);
            $('.profile .latest-posts .posts-container').empty();
            if (data.profile_data.isFriend || profileId == currentUser) {
                populateFriendsList(data.friends);
                if (!data.post[0].hasOwnProperty('post_id'))
                    return;
                appendAllPosts(data.post, 'profile');
            }
        },
        error: function (e) {
            alert("Failed to get profile details!");
        }
    });
}

$('.profile-image-container input').on('change', function () {
    var formdata = new FormData;
    var name_img = this.files[0].name;
    var extensions = ["jpg", "png", "jpeg"];
    var img_exten = name_img.split('.').pop();
    if (extensions.indexOf(img_exten) !== -1) {
        formdata.append("file", this.files[0]);
        $.ajax({
            type: 'POST',
            url: 'api/upload_profile_picture.php',
            processData: false,
            contentType: false,
            dataType: "json",
            data: formdata,
            success: function (data) {
                if (data.status = 201) {
                    $(".logoutContainer .profile-icon").attr("src", `php/post/post/uploads/${data.image}`);
                    populateProfilePage();
                } else {
                    alert(error);
                }
            }
        });
    } else
        alert('Invalid Extension');
});

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
            let commentCounter = parseInt($(`.post[data-postid=${postId}] .toggle-comments`).text().split(' ')[0]) + 1;
            $(`.post[data-postid=${postId}] .toggle-comments`).text(`${commentCounter} comments`);
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
            comment.addClass('remove');
            let commentCounter = parseInt($(`.post[data-postid=${postId}] .toggle-comments`).text().split(' ')[0]) - 1;
            $(`.post[data-postid=${postId}] .toggle-comments`).text(`${commentCounter} comments`);
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
$('.search-container input').on('keyup', function (e) {
    $.ajax({
        url: "api/get_allusers.php",
        type: "POST",
        data: {
            keyword: $(this).val(),
        },
        cache: false,
        success: function (data) {
            data = JSON.parse(data);
            $('.search-results').empty();
            appendSearchResults(data);
            Array.from($('.result')).forEach((result, i) => {
                setTimeout(() => {
                    $(result).addClass('visible');
                }, (i + 1) * 150)
            })
            console.log(data);
        },
        error: function (e) {
            alert(`Failed to remove comment!`);
            console.log(e);
        }
    });
})

const sendFriendRequest = (friend_id) => {
    $.ajax({
        url: "api/send_req.php",
        type: "POST",
        data: {
            friend_id: friend_id,
        },
        cache: false,
        dataType: "json",
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}

const removeFriend = (friend_id) => {
    $.ajax({
        url: "api/remove_friend.php",
        type: "POST",
        data: {
            friend_id: friend_id,
        },
        cache: false,
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}

const getAllNotificaitons = () => {
    $.ajax({
        url: "api/notification.php",
        type: "POST",
        cache: false,
        dataType: "json",
        success: function (data) {
            appendAllNotifications(data);
        },
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}
const declineNotification = (friend_id) => {
    $.ajax({
        url: "api/cancel_req.php",
        type: "POST",
        data: {
            friend_id: friend_id
        },
        cache: false,
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}
const acceptNotification = (friend_id) => {
    $.ajax({
        url: "api/accept_req.php",
        type: "POST",
        data: {
            friend_id: friend_id
        },
        cache: false,
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}

getAllPosts();
