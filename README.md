# Graphite.js
## a javascript client library for working with [Graphite](http://graphite.wikidot.com/)

Graphite provides a
[render api](http://graphite.readthedocs.org/en/latest/render_api.html)
for acessing its data. Minimally, you will need to provide a target to graph.
If not provided, the host is assumed to be "/render", all other options are not
provided unless specified, falling back to your graphite configuration's
defaults.

    Graphite().url() == "/render";
    Graphite().targets(["some.key"]).url() == "/render?target=some.key";

Parameters can be initialized by providing a dictionary to the functor, or
set by method chaining.

    Graphite({
        from: "-2days",
        until: "now",
        height: "300",
        targets: ["some.key", "some.other.key"],
    }).url();
    Graphite()
      .from("-2days")
      .until("now")
      .height("300")
      .targets([
        "some.key",
        "some.other.key"
      ]);
    // not recommended, but still works
    Graphite({from: "-2days"})({height: "300"})()({targets:["bad.ideas"]});

Method names match parameters in the Graphite api documentation, with the
following exceptions:

* `host` is added to provide customization of the graphite host location
* `target` is not present, since graphite expects multiple values of target
      with multiple keys. Instead, `targets` is provided and expects an array
      of values for graph targets

A complete list of valid parameters is in the source documentation. The
Graphite object uses the **closures with getter-setter methods** pattern for
all properties.

    var g = Graphite({
        host: "/render",
    }).host("http://metrics.biz/render");
    g.host() == "http://metrics.biz/render";

However, it does no error checking. You are responsible for making sure you're
passing legal values.

    Graphite().graphType("lolwut?").url() == "/render?graphType=lolwut?";
    Graphite().graphType("1337").url() == "/render?graphType=1337";

## Tests

Graphite.js uses qunit to run the tests. Crack open your web browser of choice
and load testRunner.html to get started.
