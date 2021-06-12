
$("#createPost").on('submit', function (e) {
    e.preventDefault();
    if (!$('#createPost textarea').val() && !$('#createPost input')[0].files.length){
        notyf.error("Cannot create empty post");
        return
    }
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
            notyf.success("Post created");
            console.log(data);
            data = JSON.parse(data);
            console.log(data);
            if (!data.hasOwnProperty('post_id'))
                return
            console.log('post');
            appendPost(data, 'home', 1);
            setUpPostActions('home');
            $('.post:first-child').addClass('animatePost shadow-light');
            form.find('textarea, input').val('');
            form.find('.attachment-indicator').removeClass('visible');
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
            $('.home .latest-posts .posts-container').empty();
            if (!data[0].hasOwnProperty('post_id')) {
                let noPosts = `<div class="mt-2 mb-3 d-flex flex-column align-items-center animateBottomToTop">
                                    <img class="col-12 col-md-6 illustration" src="assets/illustrations/noPosts.svg">
                                    <h5 class="font-weight-bold mt-4">No posts available.</h5>
                                    <span class="text-center text-muted">Get started by creating your first post or making friends.</span>
                                </div>`;
                $('.home .latest-posts .posts-container').append(noPosts);
                return;
            }
            console.log("Getting all posts", data);
            $('.home .latest-posts .posts-container').empty();
            appendAllPosts(data, 'home');
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

const updatePost = (id) => {
    let val = $(`.post[data-postid=${id}] .update-post textarea`).html();
    $.ajax({
        url: 'php/post/post.php',
        type: "POST",
        data: {
            action: 'update',
            post_id: id,
            content: val
        },
        cache: false,
        success: function (data) {
            data = JSON.parse(data)
            let date;
            let time;
            date = data.last_updated.split(' ');
            time = date[4].split(':');
            time = `at ${(time[0] > 12) ? time[0] - 12 : time[0]}:${time[1]} ${(time[0] >= 12) ? 'pm' : 'am'}`;
            date = `${date[1]} ${date[2]} ${date[3]} ${time}`;
            $(`.post[data-postid=${id}] .current-user span`).html(date);
            $(`.post[data-postid=${id}] .content`).html(val);
            notyf.success("Post updated");
        },
        error: function (e) {
            alert("Failed to get profile details!");
        }
    })
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

const getLikes = id => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'php/post/like.php',
            type: "POST",
            data: {
                "action": "get_likes",
                "post_id": id
            },
            cache: false,
            success: res => {
                res = JSON.parse(res)
                resolve(res)
            },
            error: error => {
                notyf.error({ "message": "Failed to get likes" })
                console.log(error)
            }
        })
    })
}

const likePost = (id, ref) => {
    $.ajax({
        url: 'php/post/like.php',
        type: "POST",
        data: {
            "action": "like",
            "post_id": id
        },
        cache: false,
        success: () => {
            let currentValue = parseInt($(ref).next().text())
            $(ref).next().text(currentValue + 1)
        },
        error: error => {
            notyf.error({ "message": "Failed to like post" })
            console.log(error)
        }
    })
}

const unlikePost = (id, ref) => {
    $.ajax({
        url: 'php/post/like.php',
        type: "POST",
        data: {
            "action": "unlike",
            "post_id": id
        },
        cache: false,
        success: () => {
            let currentValue = parseInt($(ref).next().text())
            $(ref).next().text(currentValue - 1)
        },
        error: error => {
            notyf.error({ "message": "Failed to like post" })
            console.log(error)
        }
    })
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
                if (!data.post[0].hasOwnProperty('post_id')) {
                    let noPosts = `<div class="mt-2 mb-3 d-flex flex-column align-items-center animateBottomToTop">
                                    <img class="col-12 col-md-6 illustration" src="assets/illustrations/noPosts.svg">
                                    <h5 class="font-weight-bold mt-4">No posts available.</h5>
                                    <span class="text-center text-muted">Get started by creating your first post.</span>
                                </div>`;
                    $('.profile .latest-posts .posts-container').append(noPosts);
                    return;
                }
                $('.page.profile .latest-posts h4').show()
                appendAllPosts(data.post, 'profile');
            } else
                $('.page.profile .latest-posts h4').hide()
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
                    if ($('.bg-grey.rounded-circle').length) {
                        $('.bg-grey.rounded-circle').remove();
                        $('.nav-header').append(`<img class="profile-icon ml-3 d-md-none" src="${data.image}" id="toggleLogoutContainer" alt="User profile" />`)
                        $('.logoutContainer').prepend(`<img class="profile-icon d-none d-md-block" src="${data.image}" alt="User profile" />`)
                    }
                    $(".profile-icon").attr("src", `php/post/post/uploads/${data.image}`);
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
    if (!$(this).val()) {
        $('.search-results').empty();
        return;
    }
    $.ajax({
        url: "api/get_allusers.php",
        type: "POST",
        data: {
            keyword: $(this).val(),
        },
        cache: false,
        success: function (data) {
            data = JSON.parse(data);
            console.log(data)
            $('.search-results').empty();
            if (!data.user.length) {
                let noResults = `<div class="my-5 py-5 mt-md-5 pt-md-5 d-flex flex-column align-items-center animateBottomToTop">
                                    <img class="col-12 col-md-6 illustration" src="assets/illustrations/noPosts.svg">
                                    <h5 class="font-weight-bold mt-4 mb-0">No users found.</h5>
                                </div>`;
                $('.search-results').append(noResults);
                return;
            }
            appendSearchResults(data);
            Array.from($('.result')).forEach((result, i) => {
                setTimeout(() => {
                    $(result).addClass('visible');
                }, (i + 1) * 150)
            })
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
            $(`.chat-user[data-id=${$.escapeSelector(btoa(friend_id))}], .chat-window[data-id=${$.escapeSelector(btoa(friend_id))}]`).remove()
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
            console.log(data);
            if (!data.length) {
                appendEmptyNotificationBanner();
                return;
            }
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
            getAllFriends();
        },
        error: function (e) {
            alert(`Failed to send req!`);
            console.log(e);
        }
    });
}

const getAllFriends = () => {
    $.ajax({
        url: `php/post/profile_post.php`,
        type: "GET",
        data: { id: currentUser },
        cache: false,
        success: function (data) {
            data = JSON.parse(data)[0];
            if (!data.friends.length) {
                $('.chat-users').append('No friends');
                return;
            }
            data.friends.forEach(friend => {
                friend.id = btoa(friend.id)
                appendChatUserInHome(friend)
                appendChatUserInChatList(friend)
            })
            onResize()
            $('.chat-user').on('click', function () {
                let id = $(this).data('id')
                onChatUserClicked(id);
            })
        },
        error: function () {
            alert("Failed to populate chat list");
        }
    });
}


getAllPosts();
getAllFriends();
