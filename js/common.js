let nav = $("nav");
let isHideNavbarOnScrollActive = false;
let mobileBreakPoint = 767;

window.onload = () => {
  if (window.innerWidth <= mobileBreakPoint) {
    setDimensions(true);
    setNavbarScrollListener();
  } else {
    $(".logoutContainer").addClass("visible").removeClass("hidden");
    setDimensions(false)
  }
  notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'newMessage',
        background: "#6179B7",
        icon: false
      }
    ],
    ripple: true,
    dismissible: true
  });
}

const onResize = () => {
  if (window.innerWidth > mobileBreakPoint) {
    if ($(".logoutContainer").hasClass("hidden"))
      $(".logoutContainer").addClass("visible").removeClass("hidden");
    setDimensions(false);
    if (isHideNavbarOnScrollActive) {
      $('.page').off();
      isHideNavbarOnScrollActive = false;
    }
  } else {
    if ($(".logoutContainer").hasClass("visible"))
      $(".logoutContainer").removeClass("visible").addClass("hidden");
    setDimensions(true);
    if (!isHideNavbarOnScrollActive) {
      setNavbarScrollListener();
      isHideNavbarOnScrollActive = true;
    }
  }
  let aboutPosition = {
    top: $('.profile-header').outerHeight() - 20,
    left: $('.profile-header').outerWidth() / 2,
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
        "padding-top": getDimensions().navbar.height + 5,
      }
      : {
        "padding-top": "20px",
        "padding-bottom": "20px",
        "padding-left": getDimensions().navbar.width + 30,
        "padding-right": getDimensions().chatbarWidth + 20,
      }
  );
};

/*******************************************
************* NAVBAR FUNCTIONS**************
********************************************/

const setNavbarScrollListener = () => {
  $('.page').on('scroll', function () {
    var scrollY = document.querySelector('.page.active').pageYOffset || document.querySelector('.page.active').scrollTop;

    (scrollY >= this.lastScroll) ? nav.addClass('scrollUp') : nav.delay(400).removeClass('scrollUp')

    this.lastScroll = scrollY;
  });
  isHideNavbarOnScrollActive = true;
};

$('.nav-item').on('click', function (e) {
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
    if (previousActivePage == currentActivePage)
      $(`.${currentActivePage}`).addClass('active').removeClass('d-none');
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
    case 'chat':
      $('nav').hide()
      $('.chat-container').addClass('visible')
      $('.chatbar').addClass('d-none')
      break;
    default:
      console.log('Page does not exists');
  }
  if (currentActivePage !== 'chat') {
    $('nav').show()
    $('.chatbar').removeClass('d-none')
  }

  if (currentActivePage != 'profile') {
    const url = new URL(window.location); // Set new or modify existing parameter value.
    url.searchParams.delete('profile');
    window.history.pushState({}, '', url); // Replace current querystring with the new one.
    $('.friends-container').hide()
    $('.page.profile .latest-posts').show()
  }

  $('.confirmRemoveFriend').addClass('hidden')

  document.title = `Sharehere | ${$(this).children('span').text()}`;

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
  $(".logoutContainer").toggleClass("visible").toggleClass("hidden")
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

const appendPost = async (post, page, i) => {
  let newPost;
  let postContainer = $(`.${page} .posts-container`);
  let date;
  let time;
  let images = "";
  let videos = "";
  date = post.last_updated.split(' ');
  time = date[4].split(':');
  time = `at ${(time[0] > 12) ? time[0] - 12 : time[0]}:${time[1]} ${(time[0] >= 12) ? 'pm' : 'am'}`;
  date = `${date[1]} ${date[2]} ${date[3]} ${time}`;
  getLikes(post.post_id).then(likes => {
    let isLiked = likes.includes(atob(currentUser));

    if (post.media) {
      post.media.forEach((ele, i) => {
        if (/jpg|jpeg|png/.test(ele))
          images += `<img class="image img-fluid px-0 mx-auto" src="./php/post/post/${ele}" data-src="./php/post/post/${ele}" loading="lazy">`;
        else
          videos += `<video class="col-12 px-0" src="./php/post/post/${ele}" controls controlsList="nodownload" preload="none" loading="lazy">></video>`;
      })
    }
    newPost = ` <div class="post position-relative rounded bg-white shadow-light px-4 py-4" data-postid="${post.post_id}" data-userid=${btoa(post.userid)} style="--order: ${i + 1}">
                    <div class="update-post position-absolute d-flex flex-column rounded bg-white px-4 py-4">
                      <div class="d-flex justify-content-end">
                        <img class="icons" src="assets/icons/tick-square-filled.svg" alt="Update post" onclick="updatePost('${post.post_id}')">
                        <img class="icons ml-2" src="assets/icons/close-square.svg" alt="Close about" onclick="$(this).parents('.update-post').removeClass('visible')">
                      </div>
                      <textarea class="form-control flex-fill shadow mt-3 p-4">${post.content}</textarea>
                    </div>
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
                        ${btoa(post.user_id) === currentUser ?
        `<img class="icons" src="./assets/icons/overflow-menu.svg" alt="Post actions" 
                          onClick="$(this).next().toggleClass('visible')"/>
                          <div class="post-actions d-flex flex-column p-3 rounded shadow">
                              <span class="edit" onclick="$(this).parents('.post').children('.update-post').addClass('visible'); $(this).parent().removeClass('visible')">Edit post</span>
                              <hr class="my-2">
                              <span class="delete">Delete post</span>
                          </div>` : ''
      }
                        
                    </div>
                    <div class="body mx-0 mx-md-2 my-2">
                        <div class="media">
                            ${videos}
                            <div class="images d-flex col-12">
                                ${images}
                            </div>
                        </div>
                        <p class="content d-inline-block text-truncate text-wrap my-2">
                            ${post.content}
                        </p>
                    </div>
                    <div class="footer d-flex justify-content-between mx-2">
                        <div class="d-flex justify-content-center align-items-center">
                            <img class="icons ${isLiked ? 'liked' : ''} like" src="./assets/icons/${isLiked ? 'thumb-up-filled' : 'thumb-up'}.svg" alt="Like post" />
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
  })
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
    setTimeout(() => {
      $(this).parents('.post').remove();
    }, 800)
  })

  $(`.${page} ${post} .like`).on('click', function (e) {
    let post = $(this).parents('.post')
    let postId = post.data("postid")
    let userId = post.data('userid')
    let button = $(this)
    if (!button.hasClass('liked')) {
      likePost(postId, this)
      if (button.hasClass('animate'))
        setTimeout(() => {
          button.removeClass('animate')
        }, 5)
      button.attr('src', './assets/icons/thumb-up-filled.svg').addClass('animate liked')
    }
    else {
      unlikePost(postId, this)
      button.attr('src', './assets/icons/thumb-up.svg').removeClass('animate liked')
      setTimeout(() => {
        button.addClass('animate')
      }, 5)
      setTimeout(() => {
        button.removeClass('animate')
      }, 500)
    }
  })

  //Handle comments
  $(`.${page} ${post} .toggle-comments`).on('click', function (e) {
    console.log($(this).parents('.post').children('.comments').hasClass('visible'));
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
  console.log(profile)
  let addFriend = $('.profile-header .row-2 .actions .add-friend');
  let requestSent = $('.profile-header .row-2 .actions .request-sent');
  let sendMessage = $('.profile-header .row-2 .actions .send-message');
  let removeFriend = $('.profile-header .row-2 .actions .remove-friend');
  let friendListToggle = $('.profile-header .row-2 .info .friends');
  let url = new URL(window.location.href);
  let profileId = url.searchParams.get('profile');
  let aboutPosition = {
    top: $('.profile-header').outerHeight() - 20,
    left: $('.profile-header').outerWidth() / 2,
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
    $('.about-container input[name=name]').val(profile.name)
    $('.about-container input[name=email]').val(profile.email)
    $('.about-container input[name=dob]').val(profile.date_of_birth)
    $('.about-container input[name=state]').val(profile.state)
    $('.about-container input[name=city]').val(profile.city)
    removeFriend.addClass('hidden');
    addFriend.addClass('hidden');
    requestSent.addClass('hidden');
    sendMessage.addClass('hidden');
    friendListToggle.show()
    $('.profile-header .profile-image-container .icons').show();
  } else {
    $('.profile-header .profile-image-container .icons').hide();
    if (!profile.isFriend) {
      friendListToggle.hide()
      removeFriend.addClass('hidden');
      if (!profile.hasNotification)
        addFriend.removeClass('hidden');
    }
    else {
      sendMessage.removeClass('hidden');
      removeFriend.removeClass('hidden');
      requestSent.addClass('hidden');
      friendListToggle.show()
    }

    if (profile.hasNotification)
      requestSent.removeClass('hidden');
  }
}

const populateFriendsList = (data) => {
  console.log(data, "updating friends")
  $('.friends-container .friends-list .col1').empty();
  $('.friends-container .friends-list .col2').empty();
  let count = (data.length == 1) ? 1 : data.length / 2;
  let url = new URL(window.location.href);
  let id = url.searchParams.get('profile');
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
                        ${id == currentUser ?
        `
                          <div class="confirmRemoveFriend d-flex flex-wrap justify-content-between align-items-center bg-white rounded shadow hidden">
                            <span>Are you sure you want to remove?</span>
                            <div>
                              <img class="icons remove" src="assets/icons/tick-square.svg" alt="Confirm remove friend">
                              <img class="icons close-confirmRemoveFriend ml-2" src="assets/icons/close-square.svg" alt="Confirm remove friend">
                            </div>
                          </div>
                          <img class="icons remove-friend" src="assets/icons/profile_friend.svg" alt="Remove Friend">`
        : ''
      }
                        
                      </div>`
    $(`.friends-container .friends-list .${(i < count || data.length == 1) ? "col1" : "col2"}`).append(newFriends);
    setUpFriendsListAction((i < count || data.length == 1));
  });
}
const setUpFriendsListAction = (checkColumn) => {
  $(`.friends-container .friends-list .${checkColumn ? "col1" : "col2"} .friend:last-child .remove-friend`).on("click", function (e) {
    let confirm = $(this).prev();
    confirm.toggleClass('hidden');
  });
  $(`.friends-container .friends-list .${checkColumn ? "col1" : "col2"} .friend:last-child .confirmRemoveFriend .remove`).on("click", function (e) {
    let id = $(this).parents('.friend').data("friendid");
    removeFriend(id);
    socket.emit('removeFriend', { "senderId": currentUser, "receiverId": btoa(id) })
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
  socket.emit('newFriendRequest', { "receiverId": profileId })
  $(this).addClass('hidden').next().removeClass('hidden');
});

$('.profile-header .row-2 .actions .request-sent').on('click', function (e) {
  let url = new URL(window.location.href);
  let profileId = atob(url.searchParams.get('profile'));
  declineNotification(profileId);
  $(this).addClass('hidden').prev().removeClass('hidden');
});

$('.profile-header .row-2 .actions .send-message').on('click', function (e) {
  let url = new URL(window.location.href);
  let id = url.searchParams.get('profile');
  onChatUserClicked(id)
});

$('.profile-header .row-2 .actions .remove-friend').on('click', () => $('.confirmRemoveFriend').toggleClass('hidden'));

$('.profile-header .confirmRemoveFriend img').on('click', function (e) {
  let url = new URL(window.location.href);
  let profileId = atob(url.searchParams.get('profile'));
  removeFriend(profileId);
  socket.emit('removeFriend', { "senderId": currentUser, "receiverId": btoa(id) })
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
    let isFriend = data.friends.includes(result.id)
    newResult = ` <div class="result d-flex flex-wrap justify-content-between align-items-center bg-white rounded shadow-light p-3 m-2" data-isfriend=${isFriend}>
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
                              <small><span class="city">${result.city}, ${result.state}</span></small>
                          </div>
                      </div>
                      <div class="actions d-flex">
                          <img class="icons ${isFriend ? `hidden` : (result.isAlreadySent) ? 'hidden' : ''} add-friend" src="assets/icons/profile-addFriend.svg" alt="">
                          <img class="icons ${(result.isAlreadySent) ? `` : `hidden`} request-sent" src="assets/icons/request-sent.svg" alt="">
                          <img class="icons ${isFriend ? `` : (result.isAlreadySent) ? 'hidden' : ''} send-message ml-2" src="assets/icons/message-send.svg" alt="">
                      </div>
                  </div>`;
    $('.page.search .search-results').append(newResult);
    searchResultActions();
  })
}

const searchResultActions = () => {
  $('.search-results .result:last-child .info').on('click', function (e) {
    prepareProfilePage($(this).data('userid'));
  });
  $('.search-results .result:last-child .actions .add-friend').on('click', function (e) {
    let id = $(this).parents('.result').children('.info').attr('data-userid')
    socket.emit('newFriendRequest', { "receiverId": btoa(id) })
    sendFriendRequest(id);
    $(this).addClass('hidden').next().removeClass('hidden');
  });
  $('.search-results .result:last-child .actions .request-sent').on('click', function (e) {
    let id = $(this).parents('.result').children('.info').attr('data-userid')
    declineNotification(id);
    $(this).addClass('hidden').prev().removeClass('hidden');
  });
  $('.search-results .result:last-child .actions .send-message').on('click', function (e) {
    let id = $(this).parents('.result').children('.info').attr('data-userid')
    onChatUserClicked(btoa(id))
  });
}

const appendAllNotifications = (data) => {
  if (!$('.latest-notifications .notification'))
    $('.latest-notifications').empty()
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
                                    <span class="name ml-2">${notification.name}</span>
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
    if ($('.notification').length == 1)
      appendEmptyNotificationBanner();
    $(this).parents('.notification').remove();
  });
  $('.notification:last-child .actions .accept').on('click', function (e) {
    let id = $(this).parent().data('userid')
    let name = $(this).parents('.notification').find('.name').text()
    acceptNotification(id);
    socket.emit('newFriend', { "senderId": currentUser, "receiverId": btoa(id), "name": name })
    if ($('.notification').length == 1)
      appendEmptyNotificationBanner();
    $(this).parents('.notification').remove();
  });
}

const appendEmptyNotificationBanner = () => {
  let noNotifications = ` <div class="d-flex flex-column align-items-center animateBottomToTop my-5 py-5 mt-md-5 pt-md-5 w-100">
                                            <img class="col-12 col-md-6 illustration" src="assets/illustrations/noPosts.svg">
                                            <h5 class="font-weight-bold text-center mt-4 mb-0">No new notifications are available.</h5>
                                        </div>`;
  $('.latest-notifications').append(noNotifications);
}

const onChatUserClicked = (id) => {
  $('.chat-list .chat-user.active, .chat-window.active').removeClass('active')
  if ($(this).parents('.chatbar'))
    $('.nav-item[data-page=chat]').click()
  $(`.chat-list .chat-user[data-id=${$.escapeSelector(id)}], .chat-window[data-id=${$.escapeSelector(id)}]`).addClass('active')
}

const appendChatUserInHome = friend => {
  if (!$('.chat-user'))
    $('.chat-users, .chat-list').empty()
  let chatUser = `<div class="chat-user justify-content-start w-100" data-id="${friend.id}">
                    ${(friend.profile_picture) ?
      `<img class="profile-icon" src="php/post/post/uploads/${friend.profile_picture}" alt="User profile">`
      :
      `<div class="bg-grey rounded-circle">
                            <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                        </div>`
    }
                    <span class="ml-2 text-left">${friend.name}</span>
                  </div>`
  $('.chat-users').append(chatUser);
}

const appendChatUserInChatList = friend => {
  let chatUser = `<div class="chat-user d-flex align-items-center" data-id=${friend.id}>
                    ${friend.profile_picture ?
      `<img class="profile-icon" src="php/post/post/uploads/${friend.profile_picture}" alt="User profile">`
      :
      `<div class="bg-grey rounded-circle">
                            <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                        </div>`
    }
                    <div class="ml-2 text-left">
                        <span class="">${friend.name}</span>
                        <p class="mb-0"><small></small></p>
                    </div>
                  </div>`
  let chatWindow = `<div class="chat-window flex-column flex-fill mx-md-3" data-id="${friend.id}">
                      <div class="header d-flex justify-content-between rounded-bottom py-3 px-2 shadow">
                        <div class="d-flex align-items-center ml-3">
                          ${friend.profile_picture ?
      `<img class="profile-icon" src="php/post/post/uploads/${friend.profile_picture}" alt="User profile">`
      :
      ` <div class="bg-grey rounded-circle">
                                  <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                                </div>`
    }
                          <div class="d-flex flex-column ml-2">
                            <span class="user-name">${friend.name}</span>
                            <span class="online mb-0">Online</span>
                          </div>
                        </div>
                        <div class="d-flex align-items-center">
                          <img class="icon closeChat mr-3 d-md-none" src="./assets/icons/close-square.svg" onclick="closeChat(this)" alt="Close chat" style="filter: invert(1) contrast(2)">
                        </div>
                      </div>
                      <div class="messages d-flex flex-column justify-content-center flex-fill px-3 my-3">
                        <div class="no-messages">
                          <p class="text-center mb-0">No messages yet</p>
                          <p class="text-center mb-0">Say Hello!</p>
                        </div>
                      </div>
                      <div class="send-message-container d-flex align-items-center justify-content-between rounded-top py-2 px-2">
                        <input class="form-control mr-2 px-3 w-100" type="text" name="search" placeholder="Type a message">
                        <div class="sendMessage rounded" onclick="sendMessage(this)" data-id="${friend.id}">
                          <img class="profile-icon-placeholder" src="assets/icons/message-send-chat.svg" alt="User profile">
                        </div>
                      </div>
                    </div>`
  $('.chat-container .chat-list').append(chatUser)
  $('.chat-container').append(chatWindow)
}

const closeChat = (ref) => {
  $(`.chat-list .chat-user.active, .chat-window.active`).removeClass('active')
  if ($('.chat-window.active'))
    $('.chat-window.default').addClass('active')
}

const sendMessage = (ref) => {
  let receiverId = $(ref).attr('data-id')
  let message = $(ref).prev().val()
  if (message === '')
    return
  socket.emit('sendMessage', { "senderId": currentUser, "receiverId": receiverId, "message": message })
  appendMessage({ "receiverId": receiverId, "message": message })
  $(ref).prev().val('')
}

const appendMessage = (data, received = false) => {
  let date = new Date()
  let hours = date.getHours()
  hours = hours > 12 ? hours - 12 : hours
  let am_pm = hours >= 12 ? 'pm' : 'am'
  let mins = date.getMinutes()
  let newMessage = `<div class="message ${received ? 'received bg-grey px-3 py-2 mb-2' : 'sent d-flex justify-content-end mb-2'} rounded ">
                      ${!received ? '<div class="rounded px-3 py-2">' : ''}
                        <span>${data.message}</span>
                        <span class="time w-100 ml-1">
                            <small>
                                ${hours}:${mins} ${am_pm}
                            </small>
                        </span>
                      ${!received ? '</div' : ''}
                    </div>`
  if ($(`.chat-window[data-id=${$.escapeSelector(data.receiverId)}] .messages .message`))
    $(`.chat-window[data-id=${$.escapeSelector(data.receiverId)}] .messages`).removeClass('justify-content-center').children('.no-messages').remove()
  $(`.chat-window[data-id=${$.escapeSelector(data.receiverId)}] .messages`).append(newMessage)
}

socket.on('chat', data => {
  appendMessage(data, true)
  if ($(`.page.chat`).hasClass('active') && $(`.chat-list .chat-user[data-id=${$.escapeSelector(data.receiverId)}]`).hasClass('active'))
    return
  let name = $(`.chat-window[data-id=${$.escapeSelector(data.receiverId)}] .user-name`).text()
  const notification = notyf.open({
    type: 'newMessage',
    message: `New message from ${name}`,
  })
  notification.on('click', ({ target, event }) => {
    if (!$('.page.chat').hasClass('active'))
      $('.nav-item[data-page=chat]').click()
    $(`.chat-list .chat-user[data-id=${$.escapeSelector(data.receiverId)}]`).click()
    notyf.dismiss(notification);
  })
})

socket.on('newFriendRequest', data => {
  const notification = notyf.success('You have a new friend request')
  notification.on('click', () => $('.nav-item[data-page=notification]').click())
})

socket.on('newFriend', data => {
  notyf.success(`${data.name} accepted your friend request`)
  data.senderId = atob(data.senderId)
  $(`.search-results .result .info[data-userid=${data.senderId}]`).parents('.result').find('.request-sent').addClass('hidden')
  $('.profile-header .add-friend').addClass('hidden')
  getAllFriends()
})

socket.on('friendRemoved', data => $(`.chat-user[data-id=${$.escapeSelector(data.senderId)}], .chat-window[data-id=${$.escapeSelector(data.senderId)}]`).remove())

/*******************************************
*************** MISCELLANEOUS ***************
********************************************/

//Prevent confirm form resubmission alert popup
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}