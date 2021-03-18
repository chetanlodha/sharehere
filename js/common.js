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
  $(".page").css(
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
  // let navItems = Array.from($('.nav-item'));
  // let newPage = $(this).data('page');
  // let allPages = Array.from($('.main')[0].children);
  // navItems.forEach(ele => {
  //   let navItem = $(ele);
  //   let index = navItem.index()
  //   if (index != activePageIndex && navItem.hasClass('active'))
  //     navItem.removeClass('active');
  //   else if (index == activePageIndex) {
  //     navItem.addClass('active');
  //     if (navItem.data('page') == 'profile') {
  //       prepareProfilePage(true);
  //     }
  //     if (navItem.data('page') == 'notifications') {
  //       $('.latest-notifications').empty();
  //       getAllNotificaitons();
  //     }
  //     if (navItem.data('page') == 'home') {
  //       getAllPosts();
  //     }
  //     if (navItem.data('page') == 'search') {
  //       $('.search-container input').val('');
  //       $('.search-results').empty();
  //     }
  //   }
  // })
  // allPages.forEach(page => $(page).hasClass(newPage) ? $(page).show() : $(page).hide());
  const previousActiveNavItem = $('.nav-item.active');
  const previousActivePage = previousActiveNavItem.data('page');
  const currentActiveNavItem = $(this);
  const currentActivePage = currentActiveNavItem.data('page');
  if (previousActivePage != currentActivePage) {
    currentActiveNavItem.addClass('active');
    previousActiveNavItem.removeClass('active');
    $(`.${currentActivePage}`).removeClass('d-none');
    $(`.${previousActivePage}`).removeClass('active');
    setTimeout(() => {
      $(`.${currentActivePage}`).addClass('active');
    }, 10)
    setTimeout(() => {
      $(`.${previousActivePage}`).addClass('d-none');
    }, 500);
  }
  if (previousActivePage == 'search' && $('.page.profile.active').data('page') && currentActivePage != 'profile') {
    $('.page.profile').removeClass('active');
    setTimeout(() => {
      $('.page.profile').addClass('d-none');
    }, 500);
  }
  switch (currentActivePage) {
    case 'home':
      getAllPosts();
      break;
    case 'search':
      $('.search-container input').val('');
      $('.search-results').empty();
      break;
    case 'notifications':
      $('.latest-notifications').empty();
      getAllNotificaitons();
      break;
    case 'profile':
      prepareProfilePage();
      break;
    default:
      console.log('Page does not exists');
  }
  document.title = `Sharehere | ${$(this).children('span').text()}`;
  if (currentActivePage != 'profile') {
    const url = new URL(window.location); // Set new or modify existing parameter value.
    url.searchParams.delete('profile');
    window.history.pushState({}, '', url); // Replace current querystring with the new one.
  }
})

const prepareProfilePage = (user = null) => {
  const url = new URL(window.location);
  if (!user)
    url.searchParams.set('profile', currentUser);
  else
    url.searchParams.set("profile", btoa(user));
  window.history.pushState({}, '', url);
  // Hide search and display profile
  $(`.profile`).removeClass('d-none');
  $(`.search`).removeClass('active');
  setTimeout(() => {
    $(`.profile`).addClass('active');
  }, 10)
  setTimeout(() => {
    $(`.search`).addClass('d-none');
  }, 500);
  populateProfilePage();
}

$("#toggleLogoutContainer").on("click", () =>
  logoutContainer.toggleClass("visible").toggleClass("hidden")
);

/*******************************************
*************** POST FUNCTIONS**************
********************************************/

const appendAllPosts = (data, page) => {
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
    imageClass = (post.media.length > 1) ? "" : "";
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
                          ${(post.profile_picture) ?
      `<img class="profile-icon" src="php/post/post/uploads/${post.profile_picture}" alt="User profile">`
      :
      ` <div class="bg-grey rounded-circle">
                                <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                              </div>`
    }
                          <div class="current-user ml-2">
                              <div>
                                  <h6 class="mb-0">${post.name}</h6>
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
  setUpPostActions(page);
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
    data.forEach(comment => {
      appendComment(postId, comment)
    })
    Array.from($(`.post[data-postid=${postId}] .latest-comments .comment`)).forEach((comment, i) => {
      setTimeout(() => {
        $(comment).addClass('visible')
      }, i * 100);
    });
  }
}

const appendComment = (postId, comment) => {
  console.log(comment);
  if (!comment)
    return;
  let newComment = `<div class="comment px-2 d-flex justify-content-between align-items-center mb-3" data-datecreated="${comment.date_created}" data-id="${comment.id}">
                    <!--<div><img class="icons mr-2" src="../assets/user/profileImage.jpeg" alt="Commented by user's profile"></div>-->
                    <span>${comment.content}</span>
                    <img class="icons ml-2" src="assets/icons/close-square.svg" alt="Remove comment">
                  </div>`;
  $(`.post[data-postid=${postId}] .latest-comments`).append(newComment);
  setUpCommentActions(postId);
}

const setUpCommentActions = (postId) => {
  $(`.post[data-postid=${postId}] .latest-comments .comment:last-child img`).on('click', function (e) {
    deleteComment(postId, $(this).parent().data('datecreated'), $(this).parent())
  })
}

/*******************************************
*************** PROFILE PAGE ***************
********************************************/

const populateProfileHeader = (profile) => {
  let aboutPosition = $('.profile-header .info .about').position();
  let addFriend = $('.profile-header .row-2 .actions .add-friend');
  let requestSent = $('.profile-header .row-2 .actions .request-sent');
  let sendMessage = $('.profile-header .row-2 .actions .send-message');
  let removeFriend = $('.profile-header .row-2 .actions .remove-friend');
  let url = new URL(window.location.href);
  let profileId = url.searchParams.get('profile');
  aboutPosition = {
    top: aboutPosition.top + 40,
    left: aboutPosition.left + 20,
  }
  $('.profile-header .row-1 h5 strong').text(profile.name);
  $('.profile-header .about-container').css('left', aboutPosition.left).css('top', aboutPosition.top);
  if (profile.profile_picture) {
    $('.profile .profile-placeholder-image-container').hide();
    $('.profile .profile-image').show().attr('src', `php/post/post/uploads/${profile.profile_picture}`);
  } else {
    $('.profile .profile-placeholder-image-container').css('display', 'flex');
    $('.profile .profile-image').hide().attr('src', ` `);
  }
  if (profileId == currentUser) {
    if (!removeFriend.hasClass('hidden'))
      removeFriend.addClass('hidden');
    if (!addFriend.hasClass('hidden'))
      addFriend.addClass('hidden');
    if (!requestSent.hasClass('hidden'))
      requestSent.addClass('hidden');
    if (!sendMessage.hasClass('hidden'))
      sendMessage.addClass('hidden');
    $('.profile-header .profile-image-container .icons').show();
  } else {
    $('.profile-header .profile-image-container .icons').hide();
    if (!profile.isFriend) {
      if (!profile.hasNotification)
        addFriend.removeClass('hidden');
    }
    else {
      if (sendMessage.hasClass('hidden'))
        sendMessage.removeClass('hidden');
      if (removeFriend.hasClass('hidden'))
        removeFriend.removeClass('hidden');
    }

    if (profile.hasNotification)
      requestSent.removeClass('hidden');
  }
}

const populateFriendsList = (data) => {
  console.log(data);
  $('.friends-container .friends-list .col1').empty();
  $('.friends-container .friends-list .col2').empty();
  let count = (data.length == 1) ? 1 : data.length / 2;
  data.forEach((friend, i) => {
    let newFriends = `<div class="friend d-flex justify-content-between align-items-center bg-white rounded shadow-light p-3" data-friendid="${friend.id}">
                        <div class="d-flex align-items-center">
                        ${(friend.profile_picture) ?
        `<img class="profile-icon" src="php/post/post/uploads/${friend.profile_picture}" alt="User profile">`
        :
        ` <div class="bg-grey rounded-circle">
                              <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                            </div>`
      }
                          <span class="ml-2">${friend.name}</span>
                        </div>
                        <div class="confirmRemoveFriend d-flex flex-wrap justify-content-between align-items-center bg-white rounded shadow-light hidden">
                          <span>Are you sure you want to remove?</span>
                          <div>
                            <img class="icons remove" src="assets/icons/tick-square.svg" alt="Confirm remove friend">
                            <img class="icons close-confirmRemoveFriend ml-2" src="assets/icons/close-square.svg" alt="Confirm remove friend">
                          </div>
                        </div>
                        <img class="icons remove-friend" src="assets/icons/profile_friend.svg" alt="Remove Friend">
                      </div>`
    $(`.friends-container .friends-list .${(i < count || data.length == 1) ? "col1" : "col2"}`).append(newFriends);
    setUpFriendsListAction((i < count || data.length == 1));
  });
}
const setUpFriendsListAction = (checkColumn) => {
  $(`.friends-container .friends-list .${checkColumn ? "col1" : "col2"} .friend:last-child .remove-friend`).on("click", function (e) {
    let confirm = $(this).prev();
    if (confirm.hasClass('hidden'))
      confirm.removeClass('hidden');
    else
      confirm.addClass('hidden');
  });
  $(`.friends-container .friends-list .${checkColumn ? "col1" : "col2"} .friend:last-child .confirmRemoveFriend .remove`).on("click", function (e) {
    removeFriend($(this).parents('.friend').data("friendid"));
    $(this).parents('.friend').remove();
  });
  $(`.friends-container .friends-list .${checkColumn ? "col1" : "col2"} .friend:last-child .confirmRemoveFriend .close-confirmRemoveFriend`).on("click", function (e) {
    $(this).parents('.confirmRemoveFriend').addClass('hidden');
  });
}

$('.profile-header .row-2 .actions .add-friend').on('click', function (e) {
  let url = new URL(window.location.href);
  let profileId = atob(url.searchParams.get('profile'));
  sendFriendRequest(profileId);
  $(this).addClass('hidden').next().removeClass('hidden');
});

$('.profile-header .row-2 .actions .request-sent').on('click', function (e) {
  let url = new URL(window.location.href);
  let profileId = atob(url.searchParams.get('profile'));
  declineNotification(profileId);
  $(this).addClass('hidden').prev().removeClass('hidden');
});

$('.profile-header .row-2 .actions .remove-friend').on('click', function (e) {
  let confirm = $('.confirmRemoveFriend');
  if (confirm.hasClass('hidden'))
    confirm.removeClass('hidden')
  else
    confirm.addClass('hidden')
});

$('.profile-header .confirmRemoveFriend img').on('click', function (e) {
  let url = new URL(window.location.href);
  let profileId = atob(url.searchParams.get('profile'));
  removeFriend(profileId);
  $(this).parent().addClass('hidden');
  $('.profile-header .row-2 .actions .remove-friend').addClass('hidden').siblings('.add-friend').removeClass('hidden');
});

$('.profile-header .row-2 .info .friends').on('click', function (e) {
  $('.profile .latest-posts').hide();
  $('.profile .friends-container').show();
});

$('.profile .friends-container .close-friends-tab').on('click', function (e) {
  $('.profile .latest-posts').show();
  $('.profile .friends-container').hide();
});


const appendSearchResults = (data) => {
  let newResult;
  data.user.forEach(result => {
    newResult = ` <div class="result d-flex flex-wrap justify-content-between align-items-center bg-white rounded shadow-light p-3 m-2">
                      <div class="info d-flex" data-userid="${result.id}">
                      ${(result.profile_picture) ?
        `<img class="profile-icon" src="php/post/post/uploads/${result.profile_picture}" alt="User profile">`
        :
        ` <div class="bg-grey rounded-circle">
                            <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                          </div>`
      }
                       
                          <div class="d-flex flex-column ml-2">
                              <span class="name">${result.name}</span>
                              <small><span class="city">Firozabad, Uttar Pradesh</span></small>
                          </div>
                      </div>
                      <div class="actions d-flex">
                          <img class="icons ${(data.friends.includes(result.id)) ? `hidden` : (result.isAlreadySent) ? 'hidden' : ''} add-friend" src="assets/icons/profile-addFriend.svg" alt="">
                          <img class="icons ${(result.isAlreadySent) ? `` : `hidden`} request-sent" src="assets/icons/request-sent.svg" alt="">
                          <img class="icons ml-2" src="assets/icons/message-send.svg" alt="">
                      </div>
                  </div>`;
    console.log(data.friends.includes(result.id), result.isAlreadySent);
    $('.search-results').append(newResult);
    searchResultActions();
  })
}

const searchResultActions = () => {
  $('.search-results .result:last-child .info').on('click', function (e) {
    prepareProfilePage($(this).data('userid'));
  });
  $('.search-results .result:last-child .actions .add-friend').on('click', function (e) {
    sendFriendRequest($(this).parents('.result').children('.info').attr('data-userid'));
    $(this).addClass('hidden').next().removeClass('hidden');
  });
  $('.search-results .result:last-child .actions .request-sent').on('click', function (e) {
    declineNotification($(this).parents('.result').children('.info').attr('data-userid'));
    $(this).addClass('hidden').prev().removeClass('hidden');
  });
}

const appendAllNotifications = (data) => {
  data.forEach(notification => {
    let newNotification = `  <div class="notification shadow-light bg-white rounded m-1 col d-flex flex-wrap align-items-center p-3">
                                <div class="info d-flex align-items-center">
                                ${(notification.profile_picture) ?
        `<img class="profile-icon" src="php/post/post/uploads/${notification.profile_picture}" alt="User profile">`
        :
        ` <div class="bg-grey rounded-circle">
                                                      <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                                                    </div>`
      }
                                    <span class="ml-2">${notification.name}</span>
                                </div>
                                <div class="actions d-flex justify-content-center p-1" data-userid="${notification.id}">
                                    <button class="btn btn-green accept">Accept</button>
                                    <button class="btn btn-red ml-3 decline">Decline</button>
                                </div>
                              </div>`;
    $('.latest-notifications').append(newNotification);
    setUpNotificationActions();
  });
}


const setUpNotificationActions = () => {
  $('.notification:last-child .actions .decline').on('click', function (e) {
    declineNotification($(this).parent().data('userid'));
    $(this).parents('.notification').remove();
  });
  $('.notification:last-child .actions .accept').on('click', function (e) {
    acceptNotification($(this).parent().data('userid'));
    $(this).parents('.notification').remove();
  });
}
/*******************************************
*************** MISCELLANEOUS ***************
********************************************/

//Prevent confirm form resubmission alert popup
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}