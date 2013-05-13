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