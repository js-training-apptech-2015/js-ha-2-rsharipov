describe("bind", function() {
	it("should bind a method of an object like the standard bind", function() {
		var o = {
		  x: 1,
		  foo: function (a, b) {
        return this.x + a + b;
			}
    };
	  var f1 = o.foo.bind({x:2}, 1);
		var f2 = bind(o.foo, {x:2}, 1);
		var f3 = bind(bind(o.foo, {x:2}), {}, 1);
		expect(f2(5)).toBe(f1(5));
		expect(f3(5)).toBe(f1(5));
  });
  it("should handle the no arguments bound case", function() {
    function sum(x, y) {
      return x + y;
    };
    var bound = bind(sum, {});
    expect(bound(1, 2)).toBe(3);
  })
  it("should handle a case of no-argument function", function() {
    function some() {
      return 3;
    };
    var bound = bind(some, { a: 33 }, 1);
    expect(bound(13)).toBe(3);
  })
});

describe("rebind", function() {
	it("should bind a method of an object like the standard bind", function() {
		var o = {
		  x: 1,
		  foo: function (a, b) {
        return this.x + a + b;
			}
    };
	  var f1 = o.foo.bind({x:2}, 1);
		var f2 = bind(o.foo, {x:2}, 1);
		expect(f2(5)).toBe(f1(5));
  });
  it("should allow to bind another context", function() {
    var context = {
      greeting: function() {
        return "Hello " + this.name;
      },
      name: "John"
    };
    expect(context.greeting()).toEqual("Hello John");
    
    var boundToJane = rebind(context.greeting, { name: "Jane" });
    expect(boundToJane()).toEqual("Hello Jane");
    
    var reboundToJim = rebind(boundToJane, { name: "Jim" });
    expect(reboundToJim()).toEqual("Hello Jim");
  });
  it("should allow to bind other arguments", function() {
    function sum(x, y) {
      return x + y;
    }
    
    var firstBound = rebind(sum, {}, 1, 2);
    expect(firstBound()).toBe(3);
    
    var secondBound = rebind(firstBound, {}, 3, 6);
    expect(secondBound()).toBe(9);
  });
});

describe("add", function() {
  it("add supports fluent syntax and conversion to a number", function() {
    var acc = add(1).add(2).add(3).add(4);
    expect(15).toEqual(acc + 5);
  });
  it("add's result is immutable and creates a copy", function() {
    var acc1 = add(1).add(2);
    var acc2 = acc1.add(1).add(2);
    expect(3).toEqual(acc1 + 0);
    expect(6).toEqual(acc2 + 0);
  });
});