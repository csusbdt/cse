/**
 * Navigation toggle. Toggles the js-visible class on the navigation, and
 * turns off the default click event for the trigger.
 *
 * @param  {event} e -> The default event triggered on click
 */
$("#main-nav-trigger").click(function (e) {
  $("#main-nav").toggleClass("js-visible");
  e.preventDefault();
});

/**
 * Conditional loading of resources.
 *
 * NOTE: Smaller screen devices will still download the image currently. This is
 * simply a test to show that the conditional loading logic works.
 */
function header_bg_toggle() {
  if (Modernizr.mq('only screen and (min-width: 700px)')) {
    $("body").addClass("background-image");
  } else {
    $("body").removeClass("background-image");
  }
}

function set_campus_link() {
    var campus = document.getElementById('campus-trigger');
    if (Modernizr.mq('only screen and (min-width: 700px')) {
        campus.href = "#";
    } else {
        campus.href = "http://csusb.edu";
    }
}

header_bg_toggle();
set_campus_link();
window.addEventListener("resize", header_bg_toggle, true);
window.addEventListener("resize", set_campus_link, true);
