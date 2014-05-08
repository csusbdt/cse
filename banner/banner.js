var UniversityBanner, university_banner;

UniversityBanner = (function() {
  function UniversityBanner() {
    this.css_source = "/cse/banner/assets/banner.css";
    this.html_source = "/cse/banner/assets/banner.html";
    this.weather_source = "http://www.csusb.edu/banner/CurrentTemperature";
    this.callback_function = "university_banner.temperatureCallback";
    this.insertStylesheet();
    this.insertBanner();
  }

  UniversityBanner.prototype.run = function() {
    this.insertCurrentDate();
    this.insertCurrentTemperature();
    return this.setQuicklinkEvent();
  };

  UniversityBanner.prototype.insertStylesheet = function() {
    var stylesheet;
    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = this.css_source;
    return document.head.appendChild(stylesheet);
  };

  UniversityBanner.prototype.insertBanner = function() {
    var hook;
    hook = document.createElement("div");
    return this.getURLContents(this.html_source, "GET", (function(_this) {
      return function(result) {
        hook.id = "banner-hook";
        hook.innerHTML = result;
        return document.body.insertBefore(hook, document.body.firstChild);
      };
    })(this));
  };

  UniversityBanner.prototype.insertCurrentTemperature = function() {
    var script;
    script = document.createElement("script");
    script.src = this.weather_source + "?callback=" + this.callback_function;
    script.id = "temperature-callback";
    script.type = "text/javascript";
    return document.body.appendChild(script);
  };

  UniversityBanner.prototype.temperatureCallback = function(data) {
    var script;
    script = document.getElementById("temperature-callback");
    script.parentNode.removeChild(script);
    return document.getElementById("csusb-temperature").innerHTML = data.temp;
  };

  UniversityBanner.prototype.insertCurrentDate = function() {
    var date, day, month, suffix, today, year;
    today = new Date();
    date = today.getDate();
    suffix = this.getDaySuffix(date.toString());
    day = this.getDayName(today.getDay());
    month = this.convertMonth(today.getMonth());
    year = today.getFullYear();
    today = day + ", " + month + " " + date + suffix + ", " + year;
    return document.getElementById("csusb-date").innerHTML = today;
  };

  UniversityBanner.prototype.setQuicklinkEvent = function() {
    var dropdown, trigger;
    trigger = document.getElementById('dropdown-trigger');
    dropdown = document.getElementById('dropdown');
    return this.addListener(trigger, 'click', (function(_this) {
      return function() {
        _this.toggleClass(dropdown, "js-visible");
        return _this.toggleClass(trigger, "js-triggered");
      };
    })(this));
  };

  UniversityBanner.prototype.addListener = function(element, event, handler) {
    if (element.addEventListener) {
      return element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      return element.attachEvent('on' + event, handler);
    } else {
      return element['on' + event] = handler;
    }
  };

  UniversityBanner.prototype.removeListener = function(element, event, handler) {
    if (element.removeEventListener) {
      return element.removeEventListener(event, handler, false);
    } else if (element.detachEvent) {
      return element.detachEvent('on' + event, handler);
    } else {
      return element['on' + event] = null;
    }
  };

  UniversityBanner.prototype.toggleClass = function(element, cls) {
    if (this.hasClass(element, cls)) {
      return element.className = element.className.replace(cls, "");
    } else {
      return element.className = element.className + " " + cls;
    }
  };

  UniversityBanner.prototype.hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  };

  UniversityBanner.prototype.convertMonth = function(month_num) {
    switch (month_num) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "";
    }
  };

  UniversityBanner.prototype.getDaySuffix = function(day) {
    switch (day.substr(day.length - 1)) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  UniversityBanner.prototype.getDayName = function(day) {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  };

  UniversityBanner.prototype.getURLContents = function(url, method, callback) {
    var request;
    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        return callback(request.responseText);
      }
    };
    request.open(method, url, false);
    return request.send();
  };

  return UniversityBanner;

})();

university_banner = new UniversityBanner();

window.onload = university_banner.run();
