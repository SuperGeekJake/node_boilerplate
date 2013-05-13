require.config({
  paths: {
    jquery: "/components/jquery/jquery",
    underscore: "/components/underscore/underscore",
    util: "/js/lib/util"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    }
  }
});

require(["jquery", "underscore", "util"], function($, _, util) {});
