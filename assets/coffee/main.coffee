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
        banner_url:      "http://www.csusb.edu/banner"

    trigger:         $("#campus-trigger")
    icon:            $("#campus-trigger span")
    content:         $("#campus-trigger i")
    inserted:        false

    constructor: ->
        if environment.isDesktop()
            if @isHidden()
                @setTriggerActive()
            else
                @insertBanner()
                @setTriggerInactive()
        else
            @unsetTrigger()

    isHidden: ->
        sessionStorage.getItem(@text.storage_id) isnt null

    triggerToActive: ->
        @content.text(@text.collapsed_text)
        @icon.removeClass(@text.expanded_arrow).addClass(@text.collapsed_arrow)

    triggerToInactive: ->
        @content.text(@text.expanded_text)
        @icon.removeClass(@text.collapsed_arrow).addClass(@text.expanded_arrow)

    setTriggerEvent: ->
        @trigger.click (e) =>
            @toggle()
            e.preventDefault

    setTriggerActive: ->
        @trigger.href = @text.desktop_link
        @content.text(@text.collapsed_text)
        @icon.removeClass(@text.mobile_arrow).addClass(@text.collapsed_arrow)
        @setTriggerEvent()

    setTriggerInactive: ->
        @trigger.href = @text.desktop_link
        @content.text(@text.expanded_text)
        @icon.removeClass(@text.mobile_arrow).addClass(@text.expanded_arrow)
        @setTriggerEvent()

    unsetTrigger: ->
        @trigger.href = @text.mobile_link
        @content.text(@text.mobile_text)
        @icon.removeClass(@text.collapsed_arrow).removeClass(@text.expanded_arrow)
        @icon.addClass(@text.mobile_arrow)

    toggle: ->
        $(@text.banner_id).toggleClass(@text.hidden_class)
        if @isHidden()
            if not @inserted then @insertBanner()
            sessionStorage.removeItem(@text.storage_id)
            @triggerToInactive()
        else
            sessionStorage.setItem(@text.storage_id, true)
            @triggerToActive()

    insertBanner: ->
        document.write("<script src='#{@text.banner_url}'></script>")
        @inserted = true


##
# Maintains the state of the navigation, and handles changes in window size
# appropriately.
##
class Navigation
    nav:      $("#main-nav")
    trigger:  $("#main-nav-trigger")
    icon:     $("#main-nav-trigger span")
    dropdown: $(".dropdown > a")

    setDesktopDropdown: ->
        @dropdown.attr("data-toggle", "dropdown")

    setMobileDropdown: ->
        @dropdown.attr("data-toggle", "")

    setTriggerEvent: ->
        @trigger.click (e) =>
            @nav.toggleClass("js-visible")
            @icon.toggleClass("icon-arrow-down")
            @icon.toggleClass("icon-arrow-up")
            e.preventDefault

    setState: (state) ->
        if state is "desktop"
            @setDesktopDropdown()
        else if state is "mobile"
            banner.constructor()
            @setMobileDropdown()
        else
            console.error("Invalid window state.")

    updateState: ->
        @setState(if environment.isDesktop() then 'desktop' else 'mobile')

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
    getDesktopContent: ->
        [].slice.call(document.querySelectorAll(".js-desktop-only"))

    constructor: ->
        if environment.isDesktop()
            for elem in @getDesktopContent()
                elem.setAttribute("href", elem.dataset.href)


##
# Load everything.
##
environment    = new Environment
banner         = new Banner
navigation     = new Navigation
desktopContent = new DesktopContent

