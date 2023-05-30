# Graphite.js
### a javascript client library for working with [Graphite](http://graphite.wikidot.com/)

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Graphite.js provides a consistent, flexible way to interact with the Graphite
[render api](http://graphite.readthedocs.org/en/latest/render_api.html). It has
no external dependencies.

## Getting started

Graphite.js provides a chainable api, with the special `url` method that
returns a url corresponding to the accumulated property values. The
minimum useful url requires a target (metric) to graph. The Graphite
host is assumed to be "/render", but no other properties are provided default
values. Instead, your Graphite server's configuration specifies what defaults
it will use in generating graphs.

    Graphite().url() == "/render";
    Graphite().targets(["some.key"]).url() == "/render?target=some.key";
    Graphite().host('http://metrics.biz/render')
              .targets(["some.key"])
              .url() == "http://metrics.biz/render?target=some.key";

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
    Graphite()({from: "-2days"})({height: "300"}).targets(["bad.ideas"])().url();

Method names match parameters in the Graphite api documentation, with the
following exceptions:

* `host` is added to provide customization of the graphite host location
* `target` is not present, since graphite expects multiple values of target
      with multiple keys. Instead, `targets` is provided and expects an array
      of values for graph targets
* `url` is a getter only that returns the url corresponding to the current
      internal state.

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
