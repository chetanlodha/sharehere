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
        queryParams.set("id", currentUser);
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
*************** POST FUNCTIONS**************
********************************************/

const appendAllPosts = (data, page) => {
  if (page == 'profile')
    $('.profile .posts-container').empty();
  data.forEach(post => {
    appendPost(post, page)
  });
  Array.from($(`.${page} .post`)).forEach((post, i) => {
    setTimeout(() => {
      $(post).addClass('animatePost shadow-light');
    }, i * 200)
  })
  Array.from($(`.${page} .post`)).forEach(post => {
    if ($(post).find('.media .images img').length > 0)
      $(post).find('.images').lightGallery({
        download: false
      });
  })
}

const appendPost = (post, page) => {
  let newPost;
  let postContainer = $(`.${page} .posts-container`);
  let date;
  let time;
  let imageClass;
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
}
