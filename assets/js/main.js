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
    dropdownLink: $(".dropdown > a")
  },
  respond: function () {
    var self = this.settings;
    if (Modernizr.mq("only screen and (min-width: 960px)")) {
      self.campusTrigger.attr("href", "#");
      self.dropdownLink.attr("data-toggle", "dropdown");
    } else {
      self.campusTrigger.attr("href", "http://csusb.edu");
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
    var items = document.querySelectorAll('.media-query-dependent');
    var index = items.length;
    var current = null;
    var attribute = null;
    while (index--) {
      current = items[index];
      if (current.dataset.media && window.matchMedia(current.dataset.media).matches) {
        for (attribute in current.dataset) {
          if (attribute !== 'media') {
            current.setAttribute(attribute, current.dataset[attribute]);
          }
        }
      }
    }
  }
};

NavToggle.init();
Responsive.init();
Desktop.init();

