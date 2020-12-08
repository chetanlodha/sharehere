let nav = $("nav");
let isHideNavbarOnScrollActive = false;
let logoutContainer = $(".logoutContainer");
let mobileBreakPoint = 767;

window.onload = () => {
  if (window.innerWidth < mobileBreakPoint) {
    setDimensions(true);
    setNavbarScrollListener();
  } else {
    logoutContainer.toggleClass("visible").toggleClass("hidden");
    setDimensions(false)
  }
}

const onResize = () => {
  if (window.innerWidth > mobileBreakPoint) {
    if (logoutContainer.hasClass("hidden"))
      logoutContainer.toggleClass("visible").toggleClass("hidden");
    setDimensions(false);
    if (isHideNavbarOnScrollActive) {
      $(window).off();
      isHideNavbarOnScrollActive = false;
    }
  } else {
    if (logoutContainer.hasClass("visible"))
      logoutContainer.removeClass("visible").addClass("hidden");
    setDimensions(true);
    if (!isHideNavbarOnScrollActive) {
      setNavbarScrollListener();
      isHideNavbarOnScrollActive = true;
    }
  }
  let aboutPosition = $('.profile-header .info .about').position();
  aboutPosition = {
    top: aboutPosition.top + 20,
    left: aboutPosition.left + 20,
  }
  $('.profile-header .about-container').css('left', aboutPosition.left).css('top', aboutPosition.top);
}

/*******************************************
************ UTILITY FUNCTIONS**************
********************************************/

const getDimensions = () => {
  return {
    navbar: {
      width: nav.outerWidth(),
      height: nav.outerHeight(),
    },
    chatbarWidth: $(".chatbar").outerWidth(),
  };
};

const setDimensions = (isMobile) => {
  $(".main").css(
    isMobile
      ? {
        "padding": "0 0px 20px 0px",
        "padding-top": getDimensions().navbar.height + 10,
      }
      : {
        "padding-top": "20px",
        "padding-bottom": "20px",
        "padding-left": getDimensions().navbar.width + 20,
        "padding-right": getDimensions().chatbarWidth + 20,
      }
  );
};

/*******************************************
************* NAVBAR FUNCTIONS**************
********************************************/

const setNavbarScrollListener = () => {
  $(window).on('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    scrollY >= this.lastScroll
      ? nav.addClass('scrollUp')
      : nav.delay(400).removeClass('scrollUp')

    this.lastScroll = scrollY;
  });
  isHideNavbarOnScrollActive = true;
};

$('.nav-item').on('click', function (e) {
  let activePageIndex = $(this).index();
  let navItems = Array.from($('.nav-item'));
  let newPage = $(this).data('page');
  let allPages = Array.from($('.main')[0].children);
  navItems.forEach(ele => {
    let navItem = $(ele);
    let index = navItem.index()
    if (index != activePageIndex && navItem.hasClass('active'))
      navItem.removeClass('active');
    else if (index == activePageIndex) {
      navItem.addClass('active');
      if (navItem.data('page') == 'profile') {
        var queryParams = new URLSearchParams(window.location.search); // Set new or modify existing parameter value.
        queryParams.set("profile", currentUser);
        history.pushState(null, null, "?" + queryParams.toString()); // Replace current querystring with the new one.
        populateProfilePage();
      }
    }
  })
  allPages.forEach(page => $(page).hasClass(newPage) ? $(page).show() : $(page).hide());
  document.title = `Sharehere | ${$(this).children('span').text()}`;
})

$("#toggleLogoutContainer").on("click", () =>
  logoutContainer.toggleClass("visible").toggleClass("hidden")
);

/*******************************************
*************** POST FUNCTIONS**************
********************************************/

const appendAllPosts = (data, page) => {
  if (page == 'profile')
    $('.profile .posts-container').empty();
  data.forEach((post, i) => {
    appendPost(post, page, i)
  });
  Array.from($(`.${page} .posts-container .post`)).forEach((post, i) => {
    setTimeout(() => {
      $(post).addClass('animatePost shadow-light');
    }, i * 200)
  })
}

const appendPost = (post, page, i) => {
  let newPost;
  let postContainer = $(`.${page} .posts-container`);
  let date;
  let time;
  let imageClass;
  let images = "";
  let videos = "";
  date = post.last_updated.split(' ');
  time = date[4].split(':');
  time = `at ${(time[0] > 12) ? time[0] - 12 : time[0]}:${time[1]} ${(time[0] >= 12) ? 'pm' : 'am'}`;
  date = `${date[1]} ${date[2]} ${date[3]} ${time}`;
  if (post.media) {
    imageClass = (post.media.length > 1) ? "col-md-8 overflow-hidden" : "";
    post.media.forEach((ele, i) => {
      if (/jpg|jpeg|png/.test(ele))
        images += `<img class="col-12 ${imageClass} img-fluid px-0" src="./php/post/post/${ele}" data-src="./php/post/post/${ele}">`;
      else
        videos += `<video class="col-12 ${imageClass} px-0" src="./php/post/post/${ele}" controls controlsList="nodownload" preload="none"></video>`;
    })
  }
  newPost = ` <div class="post rounded bg-white px-4 py-4" data-postid="${post.post_id}">
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
                          <span class="edit">Edit post</span>
                          <hr class="my-2">
                          <span class="delete">Delete post</span>
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
                      <span class="toggle-comments">${post.comments} comments</span>
                  </div>
                  <div class="comments">
                      <div class="create-comment d-flex justify-content-between align-items-center w-100">
                          <textarea class="form-control p-2 px-3" rows=1 placeholder="Write a comment..."></textarea> 
                          <img class="icons ml-2" src="./assets/icons/tick-square.svg" alt="Creat post">
                      </div>
                      <div class="latest-comments"></div>
                      <hr>
                  </div>       
              </div>`;
  postContainer.prepend(newPost);
  setUpPostActions(page, i);
}

const setUpPostActions = (page) => {
  let post = `.post:first-child`;
  if ($(`.${page} ${post} .media .images img`).length > 0)
    $(`.${page} ${post} .images`).lightGallery({
      download: false
    });

  //Handle edit and delete post actions
  $(`.${page} ${post} .delete`).on('click', function (e) {
    deletePost($(this).parents('.post').data('postid'));
    $(this).parents('.post').css('height', $(this).parents('.post').outerHeight());
    $(this).parent().removeClass('visible');
    setTimeout(() => {
      $(this).parents('.post').addClass('removePost');
    }, 10)
  })

  //Handle comments
  $(`.${page} ${post} .toggle-comments`).on('click', function (e) {
    if (!$(this).parents('.post').children('.comments').hasClass('visible')) {
      $(this).parents('.post').find('.latest-comments').empty();
      $(this).parents('.post').children('.comments').addClass('visible');
      getComments($(this).parents('.post').data('postid'))
    }
    else {
      $(this).parents('.post').find('.latest-comments *').css('opacity', 0);
      $(this).parents('.post').children('.comments').removeClass('visible');
    }
  })

  $(`.${page} ${post} .create-comment img`).on('click', function (e) {
    createComment($(this).parents('.post').data('postid'), $(this).parents('.post').find('.create-comment textarea').val());
    $(this).prev().val('');
  })
}

const appendAllComments = (postId, data) => {
  if (data[0].length == 0)
    appendComment(postId, null)
  else {
    console.log(data.length);
    data.forEach(comment => {
      appendComment(postId, comment)
    })
    Array.from($(`.post[data-postid=${postId}] .latest-comments .comment`)).forEach((comment, i) => {
      setTimeout(() => {
        $(comment).addClass('visible')
      }, i * 100);
    });
    setUpCommentActions(postId);
  }
}

const appendComment = (postId, comment) => {
  console.log(comment);
  let newComment;
  if (comment)
    newComment = `<div class="comment px-2 d-flex justify-content-between align-items-center mb-3" data-datecreated="${comment.date_created}" data-id="${comment.id}">
                    <!--<div><img class="icons mr-2" src="../assets/user/profileImage.jpeg" alt="Commented by user's profile"></div>-->
                    <span>${comment.content}</span>
                    <img class="icons ml-2" src="assets/icons/close-square.svg" alt="Remove comment">
                  </div>`;
  else
    return;
  $(`.post[data-postid=${postId}] .latest-comments`).append(newComment);
}

const setUpCommentActions = (postId) => {
  $(`.post[data-postid=${postId}] .latest-comments .comment img`).on('click', function (e) {
    deleteComment(postId, $(this).parent().data('datecreated'), $(this).parent())
  })
}

/*******************************************
*************** PROFILE PAGE ***************
********************************************/

const populateProfileHeader = (profile) => {
  let aboutPosition = $('.profile-header .info .about').position();
  aboutPosition = {
    top: aboutPosition.top + 40,
    left: aboutPosition.left + 20,
  }
  $('.profile-header .row-1 h5 strong').text(profile.name);
  $('.profile-header .about-container').css('left', aboutPosition.left).css('top', aboutPosition.top);
}

/*******************************************
*************** MISCELLANEOUS ***************
********************************************/

//Prevent confirm form resubmission alert popup
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}