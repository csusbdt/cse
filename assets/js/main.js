var Banner, CampusTrigger, DesktopContent, Dropdown, Environment, Navigation, banner, desktopContent, environment, navigation;

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
  Banner.prototype.hidden = "banner-hidden";

  Banner.prototype.loaded = false;

  Banner.prototype.isHidden = function() {
    return sessionStorage.getItem(this.hidden) !== null;
  };

  Banner.prototype.toggle = function() {
    this.insertBanner();
    $("#campusBanner").toggleClass("js-banner-hidden");
    if (this.isHidden()) {
      return sessionStorage.removeItem(this.hidden);
    } else {
      return sessionStorage.setItem(this.hidden, true);
    }
  };

  Banner.prototype.insertBanner = function() {
    if (!this.loaded) {
      this.loaded = true;
      return document.write("<script src='http://csusb.edu/banner'></script>");
    }
  };

  function Banner() {
    if (!this.isHidden() && environment.isDesktop()) {
      this.insertBanner();
    }
  }

  return Banner;

})();

CampusTrigger = (function() {
  function CampusTrigger() {}

  CampusTrigger.prototype.trigger = $("#campus-trigger");

  CampusTrigger.prototype.icon = $("#campus-trigger span");

  CampusTrigger.prototype.content = $("#campus-trigger i");

  CampusTrigger.prototype.isActive = false;

  CampusTrigger.prototype.active = function() {
    this.content.text("Expand banner");
    return this.icon.removeClass("icon-arrow-up").addClass("icon-arrow-down");
  };

  CampusTrigger.prototype.inactive = function() {
    this.content.text("Collapse banner");
    return this.icon.removeClass("icon-arrow-down").addClass("icon-arrow-up");
  };

  CampusTrigger.prototype.clicked = function() {
    if (this.isActive) {
      this.inactive();
    } else {
      this.active();
    }
    return this.isActive = !this.isActive;
  };

  CampusTrigger.prototype.setState = function(state) {
    if (state === 'desktop') {
      this.content.text("Collapse banner");
      this.trigger.attr("href", "#");
      this.icon.removeClass("icon-arrow-left").addClass("icon-arrow-up");
      return this.trigger.click((function(_this) {
        return function(e) {
          banner.toggle();
          _this.clicked();
          return e.preventDefault();
        };
      })(this));
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
    this.campusTrigger.setState(state);
    return this.dropdown.setState(state);
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
    this.campusTrigger = new CampusTrigger();
    this.dropdown = new Dropdown();
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
  DesktopContent.prototype.getDesktopContent = function() {
    return [].slice.call(document.querySelectorAll(".js-desktop-only"));
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

sessionStorage.removeItem("banner-hidden");

environment = new Environment();

banner = new Banner();

navigation = new Navigation();

desktopContent = new DesktopContent();
