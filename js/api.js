
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
            $('.posts-container').empty();
            getAllPosts();
        },
        error: function (e) {
            alert("Failed to create post!");
        }
    });
});

const getAllPosts = () => {
    $.ajax({
        url: "php/post/fetch_post.php",
        type: "GET",
        cache: false,
        success: function (data) {
            let newPost;
            let postContainer = $('.posts-container');
            let date;
            let time;
            let imageClass;
            data = JSON.parse(data);
            if (!data[0].hasOwnProperty('post_id'))
                return;
            data.forEach(post => {
                let images = "";
                let videos = "";
                date = post.last_updated.split(' ');
                time = date[4].split(':');
                time = `at ${(time[0] > 12) ? time[0] - 12 : time[0]}:${time[1]} ${(time[0] > 12) ? 'pm' : 'am'}`;
                date = `${date[1]} ${date[2]} ${date[3]} ${time}`;
                imageClass = (post.media.length > 1) ? "col-md-8 overflow-hidden" : "";
                post.media.forEach((ele, i) => {
                    if (/jpg|jpeg|png/.test(ele))
                        images += `<img class="col-12 ${imageClass} img-fluid px-0" src="./php/post/post/${ele}" data-src="./php/post/post/${ele}">`;
                    else
                        videos += `<video class="col-12 ${imageClass} px-0" src="./php/post/post/${ele}" controls controlsList="nodownload" preload="none"></video>`;
                })
                newPost = ` <div class="post rounded bg-white px-4 py-4">
                                <div class="header d-flex flex-row justify-content-between position-relative">
                                    <div class="info d-flex">
                                        <img class="profile-icon" src="./assets/user/profileImage.jpeg" alt="User profile" />
                                        <div class="current-user ml-2">
                                            <div>
                                                <h6 class="mb-0">Chetan Lodha</h6>
                                                <span class="text-muted">${date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <img class="icons" src="./assets/icons/overflow-menu.svg" alt="Post actions" 
                                    onClick="$(this).next().toggleClass('visible')"/>
                                    <div class="post-actions d-flex flex-column p-3 rounded shadow">
                                        <span>Edit post</span>
                                        <hr class="my-2">
                                        <span>Delete post</span>
                                    </div>
                                </div>
                                <div class="body mx-0 mx-md-2 my-2">
                                    <div class="media">
                                        ${videos}
                                        <div class="images d-flex col-12">
                                            ${images}
                                        </div>
                                    </div>
                                    <p class="d-inline-block text-truncate text-wrap my-2">
                                        ${post.content}
                                    </p>
                                </div>
                                <div class="footer d-flex justify-content-between mx-2">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="./assets/icons/thumb-up.svg" alt="Like post" />
                                        <span class="ml-2">${post.likes}</span>
                                    </div>
                                    <span>${post.comments} comments</span>
                                </div>         
                            </div>`;
                postContainer.prepend(newPost);
            });
            Array.from($('.post')).forEach((post, i) => {
                setTimeout(() => {
                    $(post).addClass('animatePost shadow-light');
                }, i * 200)
            })
            Array.from($('.post')).forEach(post => {
                if ($(post).find('.media .images img').length > 0)
                    $(post).find('.images').lightGallery({
                        download: false
                    });
            })
        },
        error: function (e) {
            alert("Failed to get posts!");
        }
    });
}

getAllPosts();
