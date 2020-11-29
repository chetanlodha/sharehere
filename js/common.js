if (window.innerWidth < 768)
  $(".logoutContainer").toggleClass("visible").toggleClass("hidden");

function onResize() {
  if (window.innerWidth > 768 && $(".logoutContainer").hasClass("hidden"))
    $(".logoutContainer").toggleClass("visible").toggleClass("hidden");
}

$("#toggleLogoutContainer").on("click", () =>
  $(".logoutContainer").toggleClass("visible").toggleClass("hidden")
);
