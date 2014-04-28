var NavToggle = {
  settings: {
    nav: $("#main-nav"),
    navTrigger: $("#main-nav-trigger"),
    navTriggerIcon: $("#main-nav-trigger span")
  },
  init: function () {
    var self = this.settings;
    self.navTrigger.click(function (e) {
      self.nav.toggleClass("js-visible");
      self.navTriggerIcon.toggleClass("icon-arrow-down");
      self.navTriggerIcon.toggleClass("icon-arrow-up");
      e.preventDefault();
    });
  }
};

var Responsive = {
  respond: function () {
    if (Modernizr.mq("only screen and (min-width: 700px)")) {
      $("body").addClass("background-image");
      $("#campus-trigger").href = "#";
    } else {
      $("body").removeClass("background-image");
      $("#campus-trigger").href = "http://csusb.edu";
    }
  },
  init: function () {
    this.respond();
    window.addEventListener("resize", this.respond, true);
  }
};

NavToggle.init();
Responsive.init();

