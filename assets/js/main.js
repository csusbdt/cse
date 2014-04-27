(function () {
    /**
     * Navigation toggle for small screens.
     */
    var NavToggle = {
        // Separating the things I'm referencing from when I'm referencing them.
        settings: {
            navTrigger: $("#main-nav-trigger"),
            nav: $("#main-nav")
        },

        // The initialization function.
        init: function() {
            self = this.settings;
            self.navTrigger.click(function (e) {
                self.nav.toggleClass("js-visible");
                e.preventDefault();
            });
        }
    };

    /**
     * Handle responsive changes
     */
    var Responsive = {
        // Header background toggle function
        header_bg_toggle: function () {
            if (Modernizr.mq('only screen and (min-width: 700px)')) {
                $("body").addClass("background-image");
            } else {
                $("body").removeClass("background-image");
            }
        },

        // Set campus toggle link
        set_campus_link: function () {
            var campus = document.getElementById('campus-trigger');
            if (Modernizr.mq('only screen and (min-width: 700px')) {
                campus.href = "#";
            } else {
                campus.href = "http://csusb.edu";
            }
        },

        // Initialization function
        init: function () {
          this.header_bg_toggle();
          this.set_campus_link();
          window.addEventListener("resize", this.header_bg_toggle, true);
          window.addEventListener("resize", this.set_campus_link, true);
        }
    };

    // Run everything.
    NavToggle.init();
    Responsive.init();
})();