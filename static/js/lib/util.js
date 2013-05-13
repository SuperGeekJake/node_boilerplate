define(function() {
  var util;

  util = {
    debug: false,
    browserisms: "",
    inherits: function(ctor, superCtor) {
      ctor.super_ = superCtor;
      return ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    },
    extend: function(dest, source) {
      var key;

      for (key in source) {
        if (source.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
      return dest;
    },
    guid: function() {
      var hexDigits, i, s, uuid;

      s = [];
      hexDigits = "0123456789abcdef";
      i = 0;
      while (i < 36) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        i++;
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      uuid = s.join("");
      return uuid;
    },
    log: function() {
      var copy;

      if (util.debug) {
        copy = Array.prototype.slice.call(arguments_);
        copy.unshift("brinkOnline: ");
        console.log.apply(console, copy);
        if (window.log) {
          return window.log(copy);
        }
      }
    },
    setZeroTimeout: (function(global) {
      var handleMessage, messageName, setZeroTimeoutPostMessage, timeouts;

      setZeroTimeoutPostMessage = function(fn) {
        timeouts.push(fn);
        return global.postMessage(messageName, "*");
      };
      handleMessage = function(event) {
        if (event.source === global && event.data === messageName) {
          if (event.stopPropagation) {
            event.stopPropagation();
          }
          if (timeouts.length) {
            return timeouts.shift()();
          }
        }
      };
      timeouts = [];
      messageName = "zero-timeout-message";
      if (global.addEventListener) {
        global.addEventListener("message", handleMessage, true);
      } else {
        if (global.attachEvent) {
          global.attachEvent("onmessage", handleMessage);
        }
      }
      return setZeroTimeoutPostMessage;
    }, this)
  };
  return util;
});