/**
 * Used for checking whether the device is big enough to receive desktop things.
 * It's a little hackish, but it works. This media query equates with
 * $screen-lg-min in the SASS code. If that gets changed, this needs to be
 * changed too.
 * @type {Object}
 */
var Environment = {
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
var Banner = {
  banner: $("#campusBanner"),

  isHidden: function () {
    return sessionStorage.getItem("banner-hidden") === true;
  },

  toggle: function () {
    this.banner.toggleClass("js-banner-visible");
  },

  load: function () {
    if (!this.isHidden() && Environment.isDesktop()) {
      document.write("<script src='http://csusb.edu/banner'></script>");
    }
  }
};


/**
 * Maintains the state of the navigation, and handles changes in window size
 * appropriately.
 * @type {Object}
 */
var Navigation = {
  elements: {
    body: $("body"),
    nav: $("#main-nav"),
    nav_trigger: $("main-nav-trigger"),
    nav_trigger_icon: ("#main-nav-trigger span"),
    campus_trigger: $("#campus-trigger"),
    campus_trigger_icon: $("#campus-trigger span"),
    campus_trigger_content: $("#campus-trigger i"),
    dropdown_link: $(".dropdown > a")
  },

  attachMobileNavEvent: function () {
    var elems = this.elements;
    elems.nav_trigger.click(function (e) {
      elems.nav.toggleClass("js-visible");
      elems.nav_trigger_icon.toggleClass("icon-arrow-down");
      elems.nav_trigger_icon.toggleClass("icon-arrow-up");
      e.preventDefault();
    });
  },

  setDesktopState: function () {
    var elems = this.elements;
    elems.campusTrigger.attr("href", "#");
    elems.campusTriggerIcon.removeClass("icon-arrow-left");
    elems.dropdownLink.attr("data-toggle", "dropdown");
    elems.campusTriggerContent.text("Collapse banner");
    elems.campusTriggerIcon.addClass("icon-arrow-up");
    elems.campusTrigger.click(function (e) {
      sessionStorage.setItem("csusb-banner-collapsed", true);
      $("#campusBanner").addClass("js-banner-hidden");
      $("body").addClass("js-banner-hidden-body");
    });
  },

  setMobileState: function () {
    var elems = this.elements;
    elems.campusTriggerContent.text("To Campus");
    elems.campusTrigger.attr("href", "http://csusb.edu").unbind("click");
    elems.campusTriggerIcon.removeClass("icon-arrow-up").addClass("icon-arrow-left");
    elems.dropdownLink.attr("data-toggle", "");
  },

  updateState: function () {
    Environment.isDesktop() ? this.setDesktopState() : this.setMobileState();
  },

  setResizeListener: function (callback, delay = 200) {
    if (typeof delay !== "number") return
    var timer = null;
    $(window).resize(function() {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(callback, delay);
    });
  },

  load: function () {
    this.updateState();
    this.setResizeListener(this.updateState);
  }
};


/**
 * Loads all content marked 'desktop-only' by changing all data-* attributes
 * into standard attributes if the environment is a desktop environment.
 * @type {Object}
 */
var DesktopContent = {
  load: function () {
    if (Environment.isDesktop()) {
      $(".desktop-only").each(function (elem) {
        for (attribute in elem.dataset) {
          elem.setAttribute(attribute, elem.dataset[attribute]);
        }
      });
    }
  }
};


Environment.load();
Banner.load();
Navigation.load();
DesktopContent.load();

