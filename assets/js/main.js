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
 */
window.addEventListener("resize", function() {
  if (Modernizr.mq('only screen and (min-width: 700px)')) {
    $("body").addClass("background-image");
  } else {
    $("body").removeClass("background-image");
  }
}, true);
