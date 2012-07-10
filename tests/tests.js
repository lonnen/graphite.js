test("noop", function() {
    var url = Graphite().url();
    equal(url, "/render?");
});

test("minimal functional example", function() {
    var url = Graphite().target(["some.key"]).url();
    equal(url, "/render?target=some.key");
});

test("multiple targets requre an array of target keys", function() {
    var url = Graphite.target(["some.key", "another.key"]).url();
    equal(url, "/render?target=some.key&target=another.key");
});

test("parameters can be initialized in constructor", function() {
    var url = Graphite({
        from: "-2days",
        until: "now",
        target: ["some.key"],
    }).url();
    equal(url, "/render?target=some.key&from=-2days&until=now");
});

test("parameters can be accumulated through chaning", function() {
    var url = Graphite().from("-2days").until("now").target(["some.key"]);
    equal(url, "/render?target=some.key&from=-2days&until=now");
});

test("properties use getter-setter methods", function() {
    var g = Graphite(),
        oldHost,
        newHost;
    oldHost = g.host();
    g.host("http://betrics.biz/render");
    newHost = g.host();
    equal(oldHost, "/render");
    equal(newHost, "http://betrics.biz/render");
});

test("allows non-string values", function() {
    var url = Graphite().height(300);
    equal(url, "/render?height=300");
});

test("allows ludicrous values", function() {
    var url = Graphite().graphType("lolwut?");
    equal(url, "/render?graphType=lolwut?");
    url = Graphite().graphType(1337);
    equal(url, "/render?graphType=1337");
});
