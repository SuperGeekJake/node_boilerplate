require.config({
    paths: {
        "jquery": "components/jquery/jquery",
        "underscore": "components/underscore/underscore",
        "util": "lib/util"
    },
    shim: {
        "jquery": {
            "exports": '$'
        },
        "underscore": {
            "exports": '_'
        }
    }
});

require(['jquery', 'underscore', 'util'], function ($, _, util) {
    //Code that needs jquery and underscore and util goes here.
});