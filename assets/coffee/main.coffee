##
# Used for checking whether the device is big enough to receive desktop things.
# It's a little hackish, but it works. This media query equates with
# $screen-lg-min in the SASS code. If that gets changed, this needs to be
# changed too. It also attaches FastClick to the window's onload event to make
# the site more responsive to user input on mobile devices.
##
class Environment
    min_width: "960px"

    isDesktop: ->
        Modernizr.mq("only screen and (min-width: #{@min_width})")

    constructor: ->
        window.onload = FastClick.attach(document.body)


##
# Maintains the state of the banner, and makes the appropriate changes whenever
# the banner is toggled.
##
class Banner
    text:
        storage_id:      "banner-hidden"
        mobile_text:     "To Campus"
        collapsed_text:  "Expand banner"
        expanded_text:   "Collapse banner"
        mobile_arrow:    "icon-arrow-left"
        collapsed_arrow: "icon-arrow-down"
        expanded_arrow:  "icon-arrow-up"
        desktop_link:    "#"
        mobile_link:     "http://csusb.edu"
        banner_id:       "#campusBanner"
        hidden_class:    "js-banner-hidden"
        banner_url:      "http://www.csusb.edu/banner/"

    trigger:         $("#campus-trigger")
    icon:            $("#campus-trigger span")
    content:         $("#campus-trigger i")
    inserted:        false

    constructor: ->
        if environment.isDesktop() and not @isHidden()
            @insertBanner()
        @updateTrigger()

    updateTrigger: ->
        if environment.isDesktop()
            if @isHidden()
                @setTriggerActive()
            else
                @setTriggerInactive()
        else
            @unsetTrigger()

    setTriggerActive: ->
        @trigger.prop("href", @text.desktop_link)
        @content.text(@text.collapsed_text)
        @icon.removeClass(@text.mobile_arrow)
        @icon.addClass(@text.collapsed_arrow)
        @setTriggerEvent()

    setTriggerInactive: ->
        @trigger.prop("href", @text.desktop_link)
        @content.text(@text.expanded_text)
        @icon.removeClass(@text.mobile_arrow)
        @icon.addClass(@text.expanded_arrow)
        @setTriggerEvent()

    unsetTrigger: ->
        @trigger.prop("href", @text.mobile_link)
        @content.text(@text.mobile_text)
        @icon.removeClass(@text.collapsed_arrow)
        @icon.removeClass(@text.expanded_arrow)
        @icon.addClass(@text.mobile_arrow)

    isHidden: ->
        sessionStorage.getItem(@text.storage_id) isnt null

    triggerToActive: ->
        @content.text(@text.collapsed_text)
        @icon.removeClass(@text.expanded_arrow)
        @icon.addClass(@text.collapsed_arrow)

    triggerToInactive: ->
        @content.text(@text.expanded_text)
        @icon.removeClass(@text.collapsed_arrow)
        @icon.addClass(@text.expanded_arrow)

    setTriggerEvent: ->
        if not @attached?
            @trigger.click (e) =>
                @toggle()
                e.preventDefault()
            @attached = true

    toggle: ->
        $(@text.banner_id).toggleClass(@text.hidden_class)
        if @isHidden()
            sessionStorage.removeItem(@text.storage_id)
            if not @inserted
                location.reload()
            @triggerToInactive()
        else
            sessionStorage.setItem(@text.storage_id, true)
            @triggerToActive()

    insertBanner: ->
        if not @inserted
            document.write("<script src='#{@text.banner_url}'></script>")
            @inserted = true


##
# Maintains the state of the navigation, and handles changes in window size
# appropriately.
##
class Navigation
    text:
        desktop_dropdown: "dropdown"
        nav_class:        "js-visible"
        active_arrow:     "icon-arrow-up"
        inactive_arrow:   "icon-arrow-down"
        desktop_mode:     "desktop"
        mobile_mode:      "mobile"
        error_msg:        "Invalid window state."

    nav:      $("#main-nav")
    trigger:  $("#main-nav-trigger")
    icon:     $("#main-nav-trigger span")
    dropdown: $(".js-dropdown-hook")

    setDesktopDropdown: ->
        @dropdown.attr("data-toggle", @text.desktop_dropdown)

    setMobileDropdown: ->
        @dropdown.removeAttr("data-toggle")

    setTriggerEvent: ->
        @trigger.click (e) =>
            @nav.toggleClass(@text.nav_class)
            @icon.toggleClass(@text.inactive_arrow)
            @icon.toggleClass(@text.active_arrow)
            e.preventDefault

    setState: (state) ->
        if state is @text.desktop_mode
            banner.updateTrigger()
            @setDesktopDropdown()
        else if state is @text.mobile_mode
            banner.updateTrigger()
            @setMobileDropdown()

    updateState: ->
        if environment.isDesktop()
            @setState(@text.desktop_mode)
        else
            @setState(@text.mobile_mode)

    setResizeListener: (callback) ->
        timer = null
        $(window).resize  =>
            if timer isnt null then window.clearTimeout(timer)
            timer = window.setTimeout callback, 200

    constructor: ->
        @setTriggerEvent()
        @updateState()
        @setResizeListener =>
            @updateState()


##
# If the environment is a desktop environment, loads all content marked
# 'desktop-only' by changing all data-* attributes into standard attributes.
##
class DesktopContent
    text:
        id_class: ".js-desktop-only"

    getDesktopContent: ->
        [].slice.call(document.querySelectorAll(@text.id_class))

    constructor: ->
        if environment.isDesktop()
            for elem in @getDesktopContent()
                elem.setAttribute("href", elem.dataset.href)
                elem.removeAttribute("data-href")
                elem.removeAttribute("class")


# sessionStorage.removeItem("banner-hidden")

##
# Load everything.
##
environment    = new Environment
banner         = new Banner
navigation     = new Navigation
desktopContent = new DesktopContent

