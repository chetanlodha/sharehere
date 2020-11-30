// let prev = 0;
let nav = $("nav");
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
        "padding": "0 20px 20px 20px",
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

// const setNavbarScrollListener = () => {
//   $(window).on("scroll", () => {
//     let scrollTop = $(window).scrollTop();
//     nav.toggleClass("hidden", scrollTop > prev);
//     prev = scrollTop;
//   });
// };

window.onload = () => {
  if (window.innerWidth < mobileBreakPoint) {
    setDimensions(true);
    // setNavbarScrollListener();
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
    // nav.off(); //Remove scroll event listener as it is not required in desktop mode
    setDimensions(false);
  } else {
    if (logoutContainer.hasClass("visible"))
      logoutContainer.removeClass("visible").addClass("hidden");
    setDimensions(true);
  }
}