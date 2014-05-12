##
# Saves me a little bit of typing.
##
storage = sessionStorage


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
  banner: $("#campusBanner")
  hidden: "banner-hidden"

  isHidden: ->
    storage.getItem(@hidden) isnt null

  toggle: ->
    @banner.toggleClass("js-banner-visible")
    if @isHidden()
      storage.removeItem(@hidden)
    else
      storage.setItem(@hidden, true)

  constructor: ->
    if !@isHidden() and environment.isDesktop()
      document.write("<script src='http://csusb.edu/banner'></script>")


##
# Trigger for the CSUSB link and banner closure.
##
class CampusTrigger
  trigger: $("#campus-trigger")
  icon: $("#campus-trigger span")
  content: $("#campus-trigger i")

  setState: (state) ->
    if state is 'desktop'
      @content.text("Collapse banner")
      @trigger.attr("href", "#")
      @icon.removeClass("icon-arrow-left").addClass("icon-arrow-up")
    else
      @content.text("To Campus")
      @trigger.attr("href", "http://csusb.edu")
      @icon.removeClass("icon-arrow-up").addClass("icon-arrow-left")


##
# Desktop navigation dropdown.
##
class Dropdown
  trigger: $(".dropdown > a")

  setState: (state) ->
    if state is 'desktop'
      @trigger.attr("data-toggle", "dropdown")
    else
      @trigger.attr("data-toggle", "")


##
# Maintains the state of the navigation, and handles changes in window size
# appropriately.
##
class Navigation
  nav: $("#main-nav")
  trigger: $("#main-nav-trigger")
  icon: $("#main-nav-trigger span")

  setNavigationTrigger: ->
    @trigger.click (e) =>
      @nav.toggleClass("js-visible")
      @icon.toggleClass("icon-arrow-down")
      @icon.toggleClass("icon-arrow-up")
      e.preventDefault()

  setState: (state) ->
    campusTrigger.setState(state)
    dropdown.setState(state)

  updateState: ->
    @setState(if environment.isDesktop() then 'desktop' else 'mobile')
    return

  setResizeListener: (callback) ->
    timer = null
    $(window).resize () =>
      if timer isnt null then window.clearTimeout(timer)
      timer = window.setTimeout callback, 200

  constructor: ->
    @setNavigationTrigger()
    @updateState()
    @setResizeListener () =>
      @updateState()


##
# If the environment is a desktop environment, loads all content marked
# 'desktop-only' by changing all data-* attributes into standard attributes.
##
class DesktopContent
  id: "js-desktop-only"

  getDesktopContent: ->
    [].slice.call(document.querySelectorAll("." + @id))

  constructor: ->
    if environment.isDesktop()
      for elem in @getDesktopContent()
        elem.setAttribute("href", elem.dataset.href)


environment    = new Environment()
banner         = new Banner()
campusTrigger  = new CampusTrigger()
dropdown       = new Dropdown()
navigation     = new Navigation()
desktopContent = new DesktopContent()

