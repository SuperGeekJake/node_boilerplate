define ->
    util =
        debug: false
        browserisms: ""
        inherits: (ctor, superCtor) ->
            ctor.super_ = superCtor
            ctor:: = Object.create(superCtor::,
                constructor:
                    value: ctor
                    enumerable: false
                    writable: true
                    configurable: true
            )

        extend: (dest, source) ->
            for key of source
                dest[key] = source[key]  if source.hasOwnProperty(key)
            dest

        guid: ->
            
            # http://www.ietf.org/rfc/rfc4122.txt
            s = []
            hexDigits = "0123456789abcdef"
            i = 0

            while i < 36
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
                i++
            s[14] = "4" # bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) # bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-"
            uuid = s.join("")
            uuid

        log: ->
            if util.debug
                copy = Array::slice.call(arguments_)
                copy.unshift "brinkOnline: "
                console.log.apply console, copy
                window.log copy  if window.log

        setZeroTimeout: ((global) ->
            
            # Like setTimeout, but only takes a function argument.     There's
            # no time argument (always zero) and no arguments (you have to
            # use a closure).
            setZeroTimeoutPostMessage = (fn) ->
                timeouts.push fn
                global.postMessage messageName, "*"
            handleMessage = (event) ->
                if event.source is global and event.data is messageName
                    event.stopPropagation()  if event.stopPropagation
                    timeouts.shift()()  if timeouts.length
            timeouts = []
            messageName = "zero-timeout-message"
            if global.addEventListener
                global.addEventListener "message", handleMessage, true
            else global.attachEvent "onmessage", handleMessage  if global.attachEvent
            setZeroTimeoutPostMessage
        (this))

    util