var Banner, DesktopContent, Environment, Navigation, banner, desktopContent, environment, navigation;

Environment = (function() {
  Environment.prototype.min_width = "960px";

  Environment.prototype.isDesktop = function() {
    return Modernizr.mq("only screen and (min-width: " + this.min_width + ")");
  };

  function Environment() {
    window.onload = FastClick.attach(document.body);
  }

  return Environment;

})();

Banner = (function() {
  Banner.prototype.text = {
    storage_id: "banner-hidden",
    mobile_text: "To Campus",
    collapsed_text: "Expand banner",
    expanded_text: "Collapse banner",
    mobile_arrow: "icon-arrow-left",
    collapsed_arrow: "icon-arrow-down",
    expanded_arrow: "icon-arrow-up",
    desktop_link: "#",
    mobile_link: "http://csusb.edu",
    banner_id: "#campusBanner",
    hidden_class: "js-banner-hidden",
    banner_url: "http://www.csusb.edu/banner"
  };

  Banner.prototype.trigger = $("#campus-trigger");

  Banner.prototype.icon = $("#campus-trigger span");

  Banner.prototype.content = $("#campus-trigger i");

  Banner.prototype.inserted = false;

  function Banner() {
    if (environment.isDesktop() && !this.isHidden()) {
      this.insertBanner();
    }
    this.updateTrigger();
  }

  Banner.prototype.updateTrigger = function() {
    if (environment.isDesktop()) {
      if (this.isHidden()) {
        return this.setTriggerActive();
      } else {
        return this.setTriggerInactive();
      }
    } else {
      return this.unsetTrigger();
    }
  };

  Banner.prototype.setTriggerActive = function() {
    this.trigger.prop("href", this.text.desktop_link);
    this.content.text(this.text.collapsed_text);
    this.icon.removeClass(this.text.mobile_arrow);
    this.icon.addClass(this.text.collapsed_arrow);
    return this.setTriggerEvent();
  };

  Banner.prototype.setTriggerInactive = function() {
    this.trigger.prop("href", this.text.desktop_link);
    this.content.text(this.text.expanded_text);
    this.icon.removeClass(this.text.mobile_arrow);
    this.icon.addClass(this.text.expanded_arrow);
    return this.setTriggerEvent();
  };

  Banner.prototype.unsetTrigger = function() {
    this.trigger.prop("href", this.text.mobile_link);
    this.content.text(this.text.mobile_text);
    this.icon.removeClass(this.text.collapsed_arrow);
    this.icon.removeClass(this.text.expanded_arrow);
    return this.icon.addClass(this.text.mobile_arrow);
  };

  Banner.prototype.isHidden = function() {
    return sessionStorage.getItem(this.text.storage_id) !== null;
  };

  Banner.prototype.triggerToActive = function() {
    this.content.text(this.text.collapsed_text);
    this.icon.removeClass(this.text.expanded_arrow);
    return this.icon.addClass(this.text.collapsed_arrow);
  };

  Banner.prototype.triggerToInactive = function() {
    this.content.text(this.text.expanded_text);
    this.icon.removeClass(this.text.collapsed_arrow);
    return this.icon.addClass(this.text.expanded_arrow);
  };

  Banner.prototype.setTriggerEvent = function() {
    if (this.attached == null) {
      this.trigger.click((function(_this) {
        return function(e) {
          _this.toggle();
          return e.preventDefault;
        };
      })(this));
      return this.attached = true;
    }
  };

  Banner.prototype.toggle = function() {
    $(this.text.banner_id).toggleClass(this.text.hidden_class);
    if (this.isHidden()) {
      if (!this.inserted) {
        this.insertBanner();
      }
      sessionStorage.removeItem(this.text.storage_id);
      return this.triggerToInactive();
    } else {
      sessionStorage.setItem(this.text.storage_id, true);
      return this.triggerToActive();
    }
  };

  Banner.prototype.insertBanner = function() {
    document.write("<script src='" + this.text.banner_url + "'></script>");
    return this.inserted = true;
  };

  return Banner;

})();

Navigation = (function() {
  Navigation.prototype.text = {
    desktop_dropdown: "dropdown",
    mobile_dropdown: "",
    nav_class: "js-visible",
    active_arrow: "icon-arrow-up",
    inactive_arrow: "icon-arrow-down",
    desktop_mode: "desktop",
    mobile_mode: "mobile",
    error_msg: "Invalid window state."
  };

  Navigation.prototype.nav = $("#main-nav");

  Navigation.prototype.trigger = $("#main-nav-trigger");

  Navigation.prototype.icon = $("#main-nav-trigger span");

  Navigation.prototype.dropdown = $(".dropdown > a");

  Navigation.prototype.setDesktopDropdown = function() {
    return this.dropdown.prop("data-toggle", this.text.desktop_dropdown);
  };

  Navigation.prototype.setMobileDropdown = function() {
    return this.dropdown.prop("data-toggle", this.text.mobile_dropdown);
  };

  Navigation.prototype.setTriggerEvent = function() {
    return this.trigger.click((function(_this) {
      return function(e) {
        _this.nav.toggleClass(_this.text.nav_class);
        _this.icon.toggleClass(_this.text.inactive_arrow);
        _this.icon.toggleClass(_this.text.active_arrow);
        return e.preventDefault;
      };
    })(this));
  };

  Navigation.prototype.setState = function(state) {
    if (state === this.text.desktop_mode) {
      banner.updateTrigger();
      return this.setDesktopDropdown();
    } else if (state === this.text.mobile_mode) {
      banner.updateTrigger();
      return this.setMobileDropdown();
    }
  };

  Navigation.prototype.updateState = function() {
    if (environment.isDesktop()) {
      return this.setState(this.text.desktop_mode);
    } else {
      return this.setState(this.text.mobile_mode);
    }
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
    this.setTriggerEvent();
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
  DesktopContent.prototype.text = {
    id_class: ".js-desktop-only"
  };

  DesktopContent.prototype.getDesktopContent = function() {
    return [].slice.call(document.querySelectorAll(this.text.id_class));
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

environment = new Environment;

banner = new Banner;

navigation = new Navigation;

desktopContent = new DesktopContent;
