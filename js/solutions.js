function bind(fn, ctx) {
  var slice = Array.prototype.slice
  var args = slice.call(arguments, 2);
  return function() {
    return fn.apply(ctx, args.concat(slice.call(arguments)));
  }
}

function rebind(fn, ctx) {
  var drop = bind(Function.prototype.call, Array.prototype.slice)

  if (fn.rebind) {
    return fn.rebind.apply(fn, drop(arguments, 1));
  }
  
  var boundArgs  = drop(arguments, 2);
  var result = function() {
    return fn.apply(ctx, boundArgs.concat(drop(arguments)));
  }
  result.rebind = function(newContext) {
    var args = drop(arguments, 1);
    return function() {
      return fn.apply(newContext, args.concat(drop(arguments)));
    }
  }
  return result;
}

function add(n) {
  return {
    valueOf: function() {
      return n;
    },
    add: function(m) {
      return add(n + m);
    }
  };
}