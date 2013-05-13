require.config
    paths:
        jquery: "/components/jquery/jquery"
        underscore: "/components/underscore/underscore"
        util: "/js/lib/util"
    shim:
        jquery:
            exports: "$"
        underscore:
            exports: "_"

require ["jquery", "underscore", "util"], ($, _, util) ->
    #Code that needs jquery and underscore and util goes here.
    socket = io.connect '/'

    appendMessage = (message) ->
        $("#chat").append message

    sendMessage = (message) ->
        socket.emit "chatMessage",
            message: message
        appendMessage message

    socket.on 'receiveMessage', (data) ->
        appendMessage data.message

    $("input[name=\"send\"]").on "click", (event) ->
        sendMessage $("input[name=\"msg\"]").val()