(function(win) {
    Graphite = (function() {
        return function() {
            var config = {
                    host: "/render",
                },
                parameter_list = [
                     "host",
                     "targets",
                     "from",
                     "until",
                     "format",
                     //"rawData", //deprecated
                     "areaAlpha",
                     "areaMode",
                     "bgcolor",
                     "cacheTimeout",
                     "colorList",
                     "drawNullAsZero",
                     "fgcolor",
                     "fontBold",
                     "fontItalic",
                     "fontName",
                     "fontSize",
                     "format",
                     "from",
                     "graphOnly",
                     "graphTypes",
                     "hideLegend",
                     "hideAxes",
                     "hideYAxis",
                     "hideGrid",
                     "height",
                     "jsonp",
                     "leftColor",
                     "leftDashed",
                     "leftWidth",
                     "lineMode",
                     "lineWidth",
                     "logBase",
                     "localOnly",
                     "majorGridLineColor",
                     "margin",
                     "max",
                     "minorGridLineColor",
                     "minorY",
                     "min",
                     "minXStep",
                     "noCache",
                     "pickle",
                     "pieMode",
                     "rightColor",
                     "rightDashed",
                     "rightWidth",
                     "template",
                     "thickness",
                     "title",
                     "tz",
                     "uniqueLegend",
                     "until",
                     "vtitle",
                     "vtitleRight",
                     "width",
                     "xFormat",
                     "yAxisSide",
                     "yLimit",
                     "yLimitLeft",
                     "yLimitRight",
                     "yMin",
                     "yMax",
                     "yMaxLeft",
                     "yMaxRight",
                     "yMinLeft",
                     "yMinRight",
                     "yStep",
                     "yStepLeft",
                     "yStepRight",
                     "yUnitSystem",
                ];

            /* Public: functor providing an interface to the internal closure state
             *
             * initialConfig    - an object describing initial parameters and values
             *                    (default: {})
             *
             * Examples
             *
             *  Graphite()
             *
             *  Graphite({from: "-24hours"})
             *
             * Returns itself so that methods can be chained
             */
            function g(initialConfig) {
                if (!arguments.length) {
                    return g;
                }

                for (var i in initialConfig) {
                    config[i] = initialConfig[i];
                }

                return g;
            }

            /* Public: Get or set request parameters. When called without arguments it
             *         acts as a getter and returns the parameter's value or undefined.
             *         When called with arguments, the 0th argument is set as the
             *         parameter's value and the functor is returned for chainability.
             *
             * value    - the value to be set for the parameter (optional).
             *
             * Examples
             *
             *   Graphite().target(["some.key"])
             *
             * Returns the functor object for further chaining.
             *
             *   Graphite().from("-24hours").from()
             *
             * Returns "-24hours", the value of the from parameter.
             *
             * Signature
             *
             *  <parameter>([value])
             *
             * parameter - the query parameter to set. see the parameter_list variable
             *             enumeration of all the legal parameters. see the graphite
             *             render api doc for param defaults
             */
            parameter_list.map(function(prop) {
                g[prop] = function(value) {
                    var j;
                    if (!arguments.length) {
                        return config[prop];
                    }

                    config[prop] = value;
                    return g;
                };
            });

            /* Public: Compile a url from the current internal state.
             *
             * Examples
             *
             *   Graphite().url();
             *
             * Returns the string "/render"
             *
             *   Graphite({ from: "-2days" }).targets(['some.key']).url();
             *
             * Returns the string "/render?from=-2days&target=some.key"
             *
             */
            g.url = function() {
                var url = config['host'] + "?",
                    properties = [],
                    prop, i;
                // to get a consistent ordering for url properties, extract all the
                // property names, sort them, and then construct the url. useful for
                // testing.
                for (var prop in config) {
                    if (prop === "host") {
                        continue;
                    }
                    properties.push(prop);
                }
                properties.sort();
                for (i = 0; i < properties.length; i++) {
                    prop = properties[i];
                    if (prop === "targets") {
                        targets = config[prop];
                        for (j = 0; j < targets.length; j++) {
                            url += "target=" + targets[j] + "&";
                        }
                        continue;
                    }
                    url += prop + "=" + config[prop] + "&";
                }
                // pretty the url for the people
                return url.substring(0, url.length - 1);
            }

            return g;
        };
    })();
    win.Graphite = Graphite;
})(window);
