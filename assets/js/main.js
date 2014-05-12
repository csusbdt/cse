var Banner, DesktopContent, Environment, Navigation, banner, desktopContent, environment, navigation;

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
  Banner.prototype.trigger = $("#campus-trigger");

  Banner.prototype.icon = $("#campus-trigger span");

  Banner.prototype.content = $("#campus-trigger i");

  Banner.prototype.inserted = false;

  Banner.prototype.storage_id = "banner-hidden";

  function Banner() {
    if (environment.isDesktop) {
      if (this.isHidden()) {
        this.setTriggerActive();
      } else {
        this.insertBanner();
        this.setTriggerInactive();
      }
    } else {
      this.unsetTrigger();
    }
  }

  Banner.prototype.isHidden = function() {
    return sessionStorage.getItem(this.storage_id) !== null;
  };

  Banner.prototype.triggerToActive = function() {
    this.content.text("Expand banner");
    return this.icon.removeClass("icon-arrow-up").addClass("icon-arrow-down");
  };

  Banner.prototype.triggerToInactive = function() {
    this.content.text("Collapse banner");
    return this.icon.removeClass("icon-arrow-down").addClass("icon-arrow-up");
  };

  Banner.prototype.setTriggerEvent = function() {
    return this.trigger.click((function(_this) {
      return function(e) {
        _this.toggle();
        return e.preventDefault;
      };
    })(this));
  };

  Banner.prototype.setTriggerActive = function() {
    this.trigger.attr("href", "#");
    this.content.text("Expand banner");
    this.icon.removeClass("icon-arrow-left").addClass("icon-arrow-down");
    return this.setTriggerEvent();
  };

  Banner.prototype.setTriggerInactive = function() {
    this.trigger.attr("href", "#");
    this.content.text("Collapse banner");
    this.icon.removeClass("icon-arrow-left").addClass("icon-arrow-up");
    return this.setTriggerEvent();
  };

  Banner.prototype.unsetTrigger = function() {
    this.trigger.attr("href", "http://csusb.edu");
    this.content.text("To Campus");
    return this.icon.removeClass("icon-arrow-up").addClass("icon-arrow-left");
  };

  Banner.prototype.toggle = function() {
    $("#campusBanner").toggleClass("js-banner-hidden");
    if (this.isHidden()) {
      if (!this.inserted) {
        this.insertBanner();
      }
      sessionStorage.removeItem(this.storage_id);
      return this.triggerToInactive();
    } else {
      sessionStorage.setItem(this.storage_id, true);
      return this.triggerToActive();
    }
  };

  Banner.prototype.insertBanner = function() {
    document.write("<script src='http://csusb.edu/banner'></script>");
    return this.inserted = true;
  };

  return Banner;

})();

Navigation = (function() {
  Navigation.prototype.nav = $("#main-nav");

  Navigation.prototype.trigger = $("#main-nav-trigger");

  Navigation.prototype.icon = $("#main-nav-trigger span");

  Navigation.prototype.dropdown = {
    trigger: $(".dropdown > a"),
    setState: function(state) {
      if (state === 'desktop') {
        return this.trigger.dataset.toggle = "dropdown";
      } else {
        return this.trigger.dataset.toggle = "";
      }
    }
  };

  Navigation.prototype.setNavigationTrigger = function() {
    return this.trigger.click((function(_this) {
      return function(e) {
        _this.nav.toggleClass("js-visible");
        _this.icon.toggleClass("icon-arrow-down");
        _this.icon.toggleClass("icon-arrow-up");
        return e.preventDefault;
      };
    })(this));
  };

  Navigation.prototype.setState = function(state) {
    this.campusTrigger.setState(state);
    return this.dropdown.setState(state);
  };

  Navigation.prototype.updateState = function() {
    return this.setState(environment.isDesktop ? 'desktop' : 'mobile');
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
    this.setNavigationTrigger;
    this.updateState;
    this.setResizeListener((function(_this) {
      return function() {
        return _this.updateState;
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
    if (environment.isDesktop) {
      _ref = this.getDesktopContent;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        elem.setAttribute("href", elem.dataset.href);
      }
    }
  }

  return DesktopContent;

})();

environment = new Environment;

banner = new Banner;

navigation = new Navigation;

desktopContent = new DesktopContent;
