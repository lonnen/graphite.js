var Graphite = (function() {
    var g, ValueError,
        config = {
            host: "/render",
        },
        parameter_list = [
             "targets",
             "from",
             "until",
             "format",
             //"rawData", //deprecated
             "areaAlpha",
             "areaMode",
             "bgcolor",
             "cacheTimeout",
             "colorList"
        ];

    /* Public: functor providing an interface to the internal closure state
     *
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

    return g;
})();
