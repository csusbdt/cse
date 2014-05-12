/**
 * Saves me a little bit of typing.
 */
var storage = sessionStorage;


/**
 * Used for checking whether the device is big enough to receive desktop things.
 * It's a little hackish, but it works. This media query equates with
 * $screen-lg-min in the SASS code. If that gets changed, this needs to be
 * changed too. It also attaches FastClick to the window's onload event to make
 * the site more responsive to user input on mobile devices.
 * @type {Object}
 */
var environment = {
  isDesktop: function () {
    return Modernizr.mq("only screen and (min-width: 960px)");
  },

  load: function () {
    window.onload = FastClick.attach(document.body);
  }
};


/**
 * Maintains the state of the banner, and makes the appropriate changes whenever
 * the banner is toggled.
 * @type {Object}
 */
var banner = {
  banner: $("#campusBanner"),
  hidden: "banner-hidden",

  isHidden: function () {
    return storage.getItem(this.hidden) !== null;
  },

  toggle: function () {
    this.banner.toggleClass("js-banner-visible");
    if (this.isHidden()) {
      storage.removeItem(this.hidden);
    } else {
      storage.setItem(this.hidden, true);
    }
  },

  load: function () {
    if (!this.isHidden() && environment.isDesktop()) {
      document.write("<script src='http://csusb.edu/banner'></script>");
    }
  }
};


/**
 * Trigger for the CSUSB link and banner closure.
 * @type {Object}
 */
var campusTrigger = {
  trigger: $("#campus-trigger"),
  icon: $("#campus-trigger span"),
  content: $("#campus-trigger i"),

  setState: function (state) {
    if (state == 'desktop') {
      this.content.text("Collapse banner");
      this.trigger.attr("href", "#");
      this.icon.removeClass("icon-arrow-left").addClass("icon-arrow-up");
    } else {
      this.content.text("To Campus");
      this.trigger.attr("href", "http://csusb.edu");
      this.icon.removeClass("icon-arrow-up").addClass("icon-arrow-left");
    }
  }
};


/**
 * Desktop navigation dropdown.
 * @type {Object}
 */
var dropdown = {
  trigger: $(".dropdown > a"),

  setState: function (state) {
    if (state === 'desktop') {
      this.trigger.attr("data-toggle", "dropdown");
    } else {
      this.trigger.attr("data-toggle", "");
    }
  }
}


/**
 * Maintains the state of the navigation, and handles changes in window size
 * appropriately.
 * @type {Object}
 */
var navigation = {
  nav: $("#main-nav"),
  trigger: $("main-nav-trigger"),
  icon: ("#main-nav-trigger span"),

  setNavigationTrigger: function () {
    this.trigger.click(function (e) {
      this.nav.toggleClass("js-visible");
      this.icon.toggleClass("icon-arrow-down").toggleClass("icon-arrow-up");
      e.preventDefault();
    });
  },

  setState: function (state) {
    campusTrigger.setState(state);
    dropdown.setState(state);
  },

  updateState: function () {
    this.setState(environment.isDesktop() ? 'desktop' : 'mobile');
  },

  setResizeListener: function (callback) {
    var timer = null;
    $(window).resize(function() {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(callback, 200);
    });
  },

  load: function () {
    this.setNavigationTrigger();
    this.updateState();
    this.setResizeListener(this.updateState);
  }
};


/**
 * If the environment is a desktop environment, loads all content marked
 * 'desktop-only' by changing all data-* attributes into standard attributes.
 * @type {Object}
 */
var desktopContent = {
  id: ".js-desktop-only",

  getDesktopContent: function () {
    return Array.prototype.slice.call(document.querySelectorAll(this.id));
  },

  load: function () {
    if (environment.isDesktop()) {
      var elements = this.getDesktopContent();
      for (var elem in elements) {
        for (attribute in elem.dataset) {
          elem.setAttribute(attribute, elem.dataset[attribute]);
        }
      }
    }
  }
};


environment.load();
banner.load();
navigation.load();
desktopContent.load();

