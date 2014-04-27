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
var header_bg_toggle = function () {
  if (Modernizr.mq('only screen and (min-width: 700px)')) {
    $("body").addClass("background-image");
  } else {
    $("body").removeClass("background-image");
  }
}
header_bg_toggle();
window.addEventListener("resize", header_bg_toggle, true);
