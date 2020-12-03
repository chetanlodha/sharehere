let nav = $("nav");
let isHideNavbarOnScrollActive = false;
let logoutContainer = $(".logoutContainer");
let mobileBreakPoint = 767;

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
        "padding-left": getDimensions().navbar.width + 30,
        "padding-right": getDimensions().chatbarWidth + 30,
      }
  );
};

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

window.onload = () => {
  if (window.innerWidth < mobileBreakPoint) {
    setDimensions(true);
    setNavbarScrollListener();
  } else {
    logoutContainer.toggleClass("visible").toggleClass("hidden");
    setDimensions(false)
  };
}

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
    else if (index == activePageIndex)
      navItem.addClass('active');
  })
  allPages.forEach(page => $(page).hasClass(newPage) ? $(page).show() : $(page).hide());
  document.title = `Sharehere | ${$(this).children('span').text()}`;
})

$("#toggleLogoutContainer").on("click", () =>
  logoutContainer.toggleClass("visible").toggleClass("hidden")
);

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
}