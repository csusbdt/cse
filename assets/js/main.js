var Banner, CampusTrigger, DesktopContent, Dropdown, Environment, Navigation, banner, campusTrigger, desktopContent, dropdown, environment, navigation, storage;

storage = sessionStorage;

Environment = (function() {
  Environment.prototype.isDesktop = function() {
    return Modernizr.mq("only screen and (min-width: 960px)");
  };

  function Environment() {
    window.onload = FastClick.attach(document.body);
  }

  return Environment;

})();

Banner = (function() {
  Banner.prototype.banner = $("#campusBanner");

  Banner.prototype.hidden = "banner-hidden";

  Banner.prototype.isHidden = function() {
    return storage.getItem(this.hidden) !== null;
  };

  Banner.prototype.toggle = function() {
    this.banner.toggleClass("js-banner-visible");
    if (this.isHidden()) {
      return storage.removeItem(this.hidden);
    } else {
      return storage.setItem(this.hidden, true);
    }
  };

  function Banner() {
    if (!this.isHidden() && environment.isDesktop()) {
      document.write("<script src='http://csusb.edu/banner'></script>");
    }
  }

  return Banner;

})();

CampusTrigger = (function() {
  function CampusTrigger() {}

  CampusTrigger.prototype.trigger = $("#campus-trigger");

  CampusTrigger.prototype.icon = $("#campus-trigger span");

  CampusTrigger.prototype.content = $("#campus-trigger i");

  CampusTrigger.prototype.setState = function(state) {
    if (state === 'desktop') {
      this.content.text("Collapse banner");
      this.trigger.attr("href", "#");
      return this.icon.removeClass("icon-arrow-left").addClass("icon-arrow-up");
    } else {
      this.content.text("To Campus");
      this.trigger.attr("href", "http://csusb.edu");
      return this.icon.removeClass("icon-arrow-up").addClass("icon-arrow-left");
    }
  };

  return CampusTrigger;

})();

Dropdown = (function() {
  function Dropdown() {}

  Dropdown.prototype.trigger = $(".dropdown > a");

  Dropdown.prototype.setState = function(state) {
    if (state === 'desktop') {
      return this.trigger.attr("data-toggle", "dropdown");
    } else {
      return this.trigger.attr("data-toggle", "");
    }
  };

  return Dropdown;

})();

Navigation = (function() {
  Navigation.prototype.nav = $("#main-nav");

  Navigation.prototype.trigger = $("#main-nav-trigger");

  Navigation.prototype.icon = $("#main-nav-trigger span");

  Navigation.prototype.setNavigationTrigger = function() {
    return this.trigger.click((function(_this) {
      return function(e) {
        _this.nav.toggleClass("js-visible");
        _this.icon.toggleClass("icon-arrow-down");
        _this.icon.toggleClass("icon-arrow-up");
        return e.preventDefault();
      };
    })(this));
  };

  Navigation.prototype.setState = function(state) {
    campusTrigger.setState(state);
    return dropdown.setState(state);
  };

  Navigation.prototype.updateState = function() {
    this.setState(environment.isDesktop() ? 'desktop' : 'mobile');
  };

  Navigation.prototype.setResizeListener = function(callback) {
    var timer;
    timer = null;
    return $(window).resize((function(_this) {
      return function() {
        if (timer !== null) {
          window.clearTimeout(timer);
        }
        return timer = window.setTimeout(callback, 200);
      };
    })(this));
  };

  function Navigation() {
    this.setNavigationTrigger();
    this.updateState();
    this.setResizeListener((function(_this) {
      return function() {
        return _this.updateState();
      };
    })(this));
  }

  return Navigation;

})();

DesktopContent = (function() {
  DesktopContent.prototype.id = "js-desktop-only";

  DesktopContent.prototype.getDesktopContent = function() {
    return [].slice.call(document.querySelectorAll("." + this.id));
  };

  function DesktopContent() {
    var elem, _i, _len, _ref;
    if (environment.isDesktop()) {
      _ref = this.getDesktopContent();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        elem.setAttribute("href", elem.dataset.href);
      }
    }
  }

  return DesktopContent;

})();

environment = new Environment();

banner = new Banner();

campusTrigger = new CampusTrigger();

dropdown = new Dropdown();

navigation = new Navigation();

desktopContent = new DesktopContent();
