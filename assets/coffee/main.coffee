##
# Used for checking whether the device is big enough to receive desktop things.
# It's a little hackish, but it works. This media query equates with
# $screen-lg-min in the SASS code. If that gets changed, this needs to be
# changed too. It also attaches FastClick to the window's onload event to make
# the site more responsive to user input on mobile devices.
##
class Environment
    isDesktop: ->
        Modernizr.mq("only screen and (min-width: 960px)")

    constructor: ->
        window.onload = FastClick.attach(document.body)


##
# Maintains the state of the banner, and makes the appropriate changes whenever
# the banner is toggled.
##
class Banner
    trigger:    $("#campus-trigger")
    icon:       $("#campus-trigger span")
    content:    $("#campus-trigger i")
    inserted:   false
    storage_id: "banner-hidden"

    constructor: ->
        if environment.isDesktop
            if @isHidden()
                @setTriggerActive()
            else
                @insertBanner()
                @setTriggerInactive()
        else
            @unsetTrigger()

    isHidden: ->
        sessionStorage.getItem(@storage_id) isnt null

    triggerToActive: ->
        @content.text("Expand banner")
        @icon.removeClass("icon-arrow-up").addClass("icon-arrow-down")

    triggerToInactive: ->
        @content.text("Collapse banner")
        @icon.removeClass("icon-arrow-down").addClass("icon-arrow-up")

    setTriggerEvent: ->
        @trigger.click (e) =>
            @toggle()
            e.preventDefault

    setTriggerActive: ->
        @trigger.attr("href", "#")
        @content.text("Expand banner")
        @icon.removeClass("icon-arrow-left").addClass("icon-arrow-down")
        @setTriggerEvent()

    setTriggerInactive: ->
        @trigger.attr("href", "#")
        @content.text("Collapse banner")
        @icon.removeClass("icon-arrow-left").addClass("icon-arrow-up")
        @setTriggerEvent()

    unsetTrigger: ->
        @trigger.attr("href", "http://csusb.edu")
        @content.text("To Campus")
        @icon.removeClass("icon-arrow-up").addClass("icon-arrow-left")

    toggle: ->
        $("#campusBanner").toggleClass("js-banner-hidden")
        if @isHidden()
            if not @inserted then @insertBanner()
            sessionStorage.removeItem(@storage_id)
            @triggerToInactive()
        else
            sessionStorage.setItem(@storage_id, true)
            @triggerToActive()

    insertBanner: ->
        document.write("<script src='http://csusb.edu/banner'></script>")
        @inserted = true


##
# Maintains the state of the navigation, and handles changes in window size
# appropriately.
##
class Navigation
    nav:     $("#main-nav")
    trigger: $("#main-nav-trigger")
    icon:    $("#main-nav-trigger span")

    dropdown:
        trigger: $(".dropdown > a")

        setState: (state) ->
            if state is 'desktop'
                @trigger.dataset.toggle = "dropdown"
            else
                @trigger.dataset.toggle = ""

    setNavigationTrigger: ->
        @trigger.click (e) =>
            @nav.toggleClass("js-visible")
            @icon.toggleClass("icon-arrow-down")
            @icon.toggleClass("icon-arrow-up")
            e.preventDefault

    setState: (state) ->
        @campusTrigger.setState(state)
        @dropdown.setState(state)

    updateState: ->
        @setState(if environment.isDesktop then 'desktop' else 'mobile')

    setResizeListener: (callback) ->
        timer = null
        $(window).resize  =>
            if timer isnt null then window.clearTimeout(timer)
            timer = window.setTimeout callback, 200

    constructor: ->
        @setNavigationTrigger
        @updateState
        @setResizeListener =>
            @updateState


##
# If the environment is a desktop environment, loads all content marked
# 'desktop-only' by changing all data-* attributes into standard attributes.
##
class DesktopContent
    getDesktopContent: ->
        [].slice.call(document.querySelectorAll(".js-desktop-only"))

    constructor: ->
        if environment.isDesktop
            for elem in @getDesktopContent
                elem.setAttribute("href", elem.dataset.href)


##
# Load everything.
##
environment    = new Environment
banner         = new Banner
navigation     = new Navigation
desktopContent = new DesktopContent

