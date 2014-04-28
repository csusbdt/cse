/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

+function(a){function e(d){a(b).remove(),a(c).each(function(){var b=f(a(this)),c={relatedTarget:this};if(!b.hasClass("open"))return;b.trigger(d=a.Event("hide.bs.dropdown",c));if(d.isDefaultPrevented())return;b.removeClass("open").trigger("hidden.bs.dropdown",c)})}function f(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}"use strict";var b=".dropdown-backdrop",c="[data-toggle=dropdown]",d=function(b){a(b).on("click.bs.dropdown",this.toggle)};d.prototype.toggle=function(b){var c=a(this);if(c.is(".disabled, :disabled"))return;var d=f(c),g=d.hasClass("open");e();if(!g){"ontouchstart"in document.documentElement&&!d.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",e);var h={relatedTarget:this};d.trigger(b=a.Event("show.bs.dropdown",h));if(b.isDefaultPrevented())return;d.toggleClass("open").trigger("shown.bs.dropdown",h),c.focus()}return!1},d.prototype.keydown=function(b){if(!/(38|40|27)/.test(b.keyCode))return;var d=a(this);b.preventDefault(),b.stopPropagation();if(d.is(".disabled, :disabled"))return;var e=f(d),g=e.hasClass("open");if(!g||g&&b.keyCode==27)return b.which==27&&e.find(c).focus(),d.click();var h=" li:not(.divider):visible a",i=e.find("[role=menu]"+h+", [role=listbox]"+h);if(!i.length)return;var j=i.index(i.filter(":focus"));b.keyCode==38&&j>0&&j--,b.keyCode==40&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),e=c.data("bs.dropdown");e||c.data("bs.dropdown",e=new d(this)),typeof b=="string"&&e[b].call(c)})},a.fn.dropdown.Constructor=d,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",c,d.prototype.toggle).on("keydown.bs.dropdown.data-api",c+", [role=menu], [role=listbox]",d.prototype.keydown)}(jQuery)

/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 1.0.1
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
(function e$$0(h,l,c){function k(g,a){if(!l[g]){if(!h[g]){var b="function"==typeof require&&require;if(!a&&b)return b(g,!0);if(f)return f(g,!0);throw Error("Cannot find module '"+g+"'");}b=l[g]={exports:{}};h[g][0].call(b.exports,function(a){var b=h[g][1][a];return k(b?b:a)},b,b.exports,e$$0,h,l,c)}return l[g].exports}for(var f="function"==typeof require&&require,m=0;m<c.length;m++)k(c[m]);return k})({1:[function(n,h,l){function c(a,b){function d(a,b){return function(){return a.apply(b,arguments)}}
var e;b=b||{};this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.lastTouchIdentifier=this.touchStartY=this.touchStartX=0;this.touchBoundary=b.touchBoundary||10;this.layer=a;this.tapDelay=b.tapDelay||200;if(!c.notNeeded(a)){for(var g="onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" "),f=0,h=g.length;f<h;f++)this[g[f]]=d(this[g[f]],this);k&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",
this.onMouse,!0));a.addEventListener("click",this.onClick,!0);a.addEventListener("touchstart",this.onTouchStart,!1);a.addEventListener("touchmove",this.onTouchMove,!1);a.addEventListener("touchend",this.onTouchEnd,!1);a.addEventListener("touchcancel",this.onTouchCancel,!1);Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,d,c){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,d.hijacked||d,c):e.call(a,b,d,c)},a.addEventListener=function(b,d,c){var e=Node.prototype.addEventListener;
"click"===b?e.call(a,b,d.hijacked||(d.hijacked=function(a){a.propagationStopped||d(a)}),c):e.call(a,b,d,c)});"function"===typeof a.onclick&&(e=a.onclick,a.addEventListener("click",function(a){e(a)},!1),a.onclick=null)}}var k=0<navigator.userAgent.indexOf("Android"),f=/iP(ad|hone|od)/.test(navigator.userAgent),m=f&&/OS 4_\d(_\d)?/.test(navigator.userAgent),g=f&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);c.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case "button":case "select":case "textarea":if(a.disabled)return!0;
break;case "input":if(f&&"file"===a.type||a.disabled)return!0;break;case "label":case "video":return!0}return/\bneedsclick\b/.test(a.className)};c.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case "textarea":return!0;case "select":return!k;case "input":switch(a.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}};c.prototype.sendClick=function(a,b){var d,
c;document.activeElement&&document.activeElement!==a&&document.activeElement.blur();c=b.changedTouches[0];d=document.createEvent("MouseEvents");d.initMouseEvent(this.determineEventType(a),!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null);d.forwardedTouchEvent=!0;a.dispatchEvent(d)};c.prototype.determineEventType=function(a){return k&&"select"===a.tagName.toLowerCase()?"mousedown":"click"};c.prototype.focus=function(a){var b;f&&a.setSelectionRange&&0!==a.type.indexOf("date")&&
"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()};c.prototype.updateScrollParent=function(a){var b,d;b=a.fastClickScrollParent;if(!b||!b.contains(a)){d=a;do{if(d.scrollHeight>d.offsetHeight){b=d;a.fastClickScrollParent=d;break}d=d.parentElement}while(d)}b&&(b.fastClickLastScrollTop=b.scrollTop)};c.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a};c.prototype.onTouchStart=function(a){var b,d,c;if(1<a.targetTouches.length)return!0;
b=this.getTargetElementFromEventTarget(a.target);d=a.targetTouches[0];if(f){c=window.getSelection();if(c.rangeCount&&!c.isCollapsed)return!0;if(!m){if(d.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=d.identifier;this.updateScrollParent(b)}}this.trackingClick=!0;this.trackingClickStart=a.timeStamp;this.targetElement=b;this.touchStartX=d.pageX;this.touchStartY=d.pageY;a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault();return!0};c.prototype.touchHasMoved=
function(a){a=a.changedTouches[0];var b=this.touchBoundary;return Math.abs(a.pageX-this.touchStartX)>b||Math.abs(a.pageY-this.touchStartY)>b?!0:!1};c.prototype.onTouchMove=function(a){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))this.trackingClick=!1,this.targetElement=null;return!0};c.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};
c.prototype.onTouchEnd=function(a){var b,c,e=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0;this.cancelNextClick=!1;this.lastClickTime=a.timeStamp;b=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;g&&(c=a.changedTouches[0],e=document.elementFromPoint(c.pageX-window.pageXOffset,c.pageY-window.pageYOffset)||e,e.fastClickScrollParent=this.targetElement.fastClickScrollParent);c=e.tagName.toLowerCase();
if("label"===c){if(b=this.findControl(e)){this.focus(e);if(k)return!1;e=b}}else if(this.needsFocus(e)){if(100<a.timeStamp-b||f&&window.top!==window&&"input"===c)return this.targetElement=null,!1;this.focus(e);this.sendClick(e,a);f&&"select"===c||(this.targetElement=null,a.preventDefault());return!1}if(f&&!m&&(b=e.fastClickScrollParent)&&b.fastClickLastScrollTop!==b.scrollTop)return!0;this.needsClick(e)||(a.preventDefault(),this.sendClick(e,a));return!1};c.prototype.onTouchCancel=function(){this.trackingClick=
!1;this.targetElement=null};c.prototype.onMouse=function(a){return this.targetElement&&!a.forwardedTouchEvent&&a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0};c.prototype.onClick=function(a){if(this.trackingClick)return this.targetElement=null,this.trackingClick=!1,!0;if("submit"===a.target.type&&0===a.detail)return!0;a=this.onMouse(a);a||(this.targetElement=
null);return a};c.prototype.destroy=function(){var a=this.layer;k&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0));a.removeEventListener("click",this.onClick,!0);a.removeEventListener("touchstart",this.onTouchStart,!1);a.removeEventListener("touchmove",this.onTouchMove,!1);a.removeEventListener("touchend",this.onTouchEnd,!1);a.removeEventListener("touchcancel",this.onTouchCancel,!1)};c.notNeeded=
function(a){var b,c;if("undefined"===typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1])if(k){if((b=document.querySelector("meta[name=viewport]"))&&(-1!==b.content.indexOf("user-scalable=no")||31<c&&window.innerWidth<=window.screen.width))return!0}else return!0;return"none"===a.style.msTouchAction?!0:!1};c.attach=function(a,b){return new c(a,b)};"undefined"!==typeof define&&define.amd?define(function(){return c}):"undefined"!==typeof h&&h.exports?(h.exports=
c.attach,h.exports.FastClick=c):window.FastClick=c},{}],2:[function(n,h,l){n("./bower_components/fastclick/lib/fastclick.js")},{"./bower_components/fastclick/lib/fastclick.js":1}]},{},[2]);



/**
 * Responsive Tables by Zurb
 */
$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($(window).width() < 767) && !switched ){
      switched = true;
      $("table.responsive").each(function(i, element) {
        splitTable($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables();});
  $(window).on("resize", updateTables);
  function splitTable(original) {
    original.wrap("<div class='table-wrapper' />");
    var copy = original.clone();
    copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
    copy.removeClass("responsive");
    original.closest(".table-wrapper").append(copy);
    copy.wrap("<div class='pinned' />");
    original.wrap("<div class='scrollable' />");
    setCellHeights(original, copy);
  }
  function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
  }
  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];
    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');
      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });
    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }
});

