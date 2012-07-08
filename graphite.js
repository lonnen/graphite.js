var Graphite = function() {
    var host = "/render",
        config = {};

    function g() { };

    g.url = function() {
        /* Build the URL from the default config. */
        var url = host + "?";
        for (var prop in config) {
            url += prop + "=" + config[prop] + "&";
        }
        return url;
    };

    return g;
}
