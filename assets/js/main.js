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
    dropdownLink: $(".dropdown > a")
  },
  respond: function () {
    var self = this.settings;
    if (Modernizr.mq("only screen and (min-width: 960px)")) {
      self.campusTrigger.attr("href", "#");
      self.campusTrigger.text("Collapse banner");
      self.campusTriggerIcon.removeClass("icon-arrow-left");
      self.campusTriggerIcon.addClass("icon-arrow-up");
      self.dropdownLink.attr("data-toggle", "dropdown");
    } else {
      self.campusTrigger.attr("href", "http://csusb.edu");
      self.campusTrigger.text("Campus");
      self.campusTriggerIcon.removeClass("icon-arrow-up");
      self.campusTriggerIcon.addClass("icon-arrow-left");
      self.dropdownLink.attr("data-toggle", "");
    }
  },
  init: function () {
    this.respond();
    window.addEventListener("resize", this.respond, true);
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
Desktop.init();
