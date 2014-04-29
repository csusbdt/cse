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
  settings: {
    body: $("body"),
    campusTrigger: $("#campus-trigger"),
    campusTriggerIcon: $("#campus-trigger span"),
    campusTriggerContent: $("#campus-trigger i"),
    dropdownLink: $(".dropdown > a")
  },
  respond: function () {
    if (Modernizr.mq("only screen and (min-width: 960px)")) {
      this.settings.campusTrigger.attr("href", "#");
      this.settings.campusTriggerContent.text("Collapse banner");
      this.settings.campusTriggerIcon.removeClass("icon-arrow-left");
      this.settings.campusTriggerIcon.addClass("icon-arrow-up");
      this.settings.dropdownLink.attr("data-toggle", "dropdown");
    } else {
      this.settings.campusTrigger.attr("href", "http://csusb.edu");
      this.settings.campusTriggerContent.text("To Campus");
      this.settings.campusTriggerIcon.removeClass("icon-arrow-up");
      this.settings.campusTriggerIcon.addClass("icon-arrow-left");
      this.settings.dropdownLink.attr("data-toggle", "");
    }
  },
  init: function () {
    this.respond();
  }
};

var Desktop = {
  init: function () {
    var queries = document.querySelectorAll('.media-query-dependent');
    var all = queries.length;
    var current = null;
    var attr = null;
    while (all--) {
      current = queries[all];
      if (current.dataset.media &&
          window.matchMedia(current.dataset.media).matches) {
        for (attr in current.dataset) {
          if (attr !== 'media') {
            current.setAttribute(attr, current.dataset[attr]);
          }
        }
      }
    }
  }
};

NavToggle.init();

Responsive.init();
var resize_timer = null;
$(window).resize(function() {
  if (resize_timer != null) window.clearTimeout(resize_timer);
  resize_timer = window.setTimeout(function() {
    Responsive.respond();
  }, 200);
});

Desktop.init();

$(function() {
  FastClick.attach(document.body);
});

