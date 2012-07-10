var Graphite = (function() {
    var g, ValueError,
        config = {
            host: "/render",
        },
        list = ["targets", //special variant
                "from",
                "until",
                "format", //default: png [png, raw, csv, json, svg, pickle]
                //"rawData", //deprecated
                "areaAlpha", //default: 1.0 [0.0 - 1.0]
                "areaMode", // default: none [none, first, all, stacked]
                "bgcolor", // default: graphTemplates.conf || #000000
                "cacheTimeout", // default: local_settings.py
                "colorList" //default: graphTemplates.conf
                ];

    function ValueError(message) {
        this.name = "ValueError";
        this.message = message || "right type, invalid value";
    }
    ValueError.prototype = new Error();
    ValueError.prototype.constructor = ValueError;

    function g() {
        if (!arguments.length) {
            return g;
        }

        initial_config = arguments[0];
        if (typeof initial_config !== "object") {
            throw new TypeError("an object is required");
        }

        // convert from a list to an faux-set object for membership testing
        // ['a','b','c'] -> { 'a':0, 'b': 1, 'c': 2}
        apiParams = list.reduce(function(p, c, i) {
            p[c] = i;
            return p;
        }, {});

        for (var i in initial_config) {
            if (!(i in apiParams)) {
                throw new ValueError("\"" + i + "\" is not a valid api parameter.");
            }
            config[i] = initial_config[i];
        }

        return g;
    }

    list.map(function(prop) {
        g[prop] = function() {
            var j;
            if (!arguments.length) {
                return config[prop];
            }

            config[prop] = arguments[0];
            return g;
        };
    });

    return g;
})();
