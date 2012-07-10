test("noop", 1, function() {
    var url = Graphite().url();
    equal(url, "/render");
});

test("minimal functional example", 1, function() {
    var url = Graphite().targets(["some.key"]).url();
    equal(url, "/render?target=some.key");
});

test("multiple targets requre an array of target keys", 1, function() {
    var url = Graphite().targets(["some.key", "another.key"]).url();
    equal(url, "/render?target=some.key&target=another.key");
});

test("parameters can be initialized in constructor", 1, function() {
    var url = Graphite({
        from: "-2days",
        until: "now",
        target: ["some.key"],
    }).url();
    equal(url, "/render?from=-2days&target=some.key&until=now");
});

test("parameters can be accumulated through chaning", 1, function() {
    var url = Graphite().from("-2days").targets(["some.key"]).url();
    equal(url, "/render?from=-2days&target=some.key");
});

test("properties use getter-setter methods", 2, function() {
    var g = Graphite(),
        oldHost,
        newHost;
    oldHost = g.host();
    g.host("http://betrics.biz/render");
    newHost = g.host();
    equal(oldHost, "/render");
    equal(newHost, "http://betrics.biz/render");
});

test("allows non-string values", 1, function() {
    var url = Graphite().height(300).url();
    equal(url, "/render?height=300");
});

test("allows ludicrous values", 2, function() {
    var url = Graphite().graphTypes("lolwut?").url();
    equal(url, "/render?graphTypes=lolwut?");
    url = Graphite().graphTypes(1337).url();
    equal(url, "/render?graphTypes=1337");
});
