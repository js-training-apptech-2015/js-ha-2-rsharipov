# JS Programming assignment 3
---
## Task 1

Write a function 
```javascript
function bind(fn, ctx, a0, a1, ...an);
```
that would work as the native Function.prototype.bind permanently assigning context `ctx` and arguments to a function `fn`

### Assumptions
```javascript 
typeof fn === 'function'
(typeof ctx === 'object') && (ctx !== null)
```

### Example

```javascript
var o = {
    x: 1,
    foo: function (a, b) {
        return this.x + a + b;
    }
};
var f1 = o.foo.bind({x:2}, 1);
var f2 = bind(o.foo, {x:2}, 1);
var f3 = bind(bind(o.foo, {x:2}), {}, 1);
f1(5) === f2(5);
f1(5) === f3(5);
```
---

## Task 2
Write a function 
```javascript
function rebind(fn, ctx, ...args);
```
that acts the same way as the native Function.prototype.bind, but allows context changing

### Assumptions
```javascript 
typeof fn === 'function'
(typeof ctx === 'object') && (ctx !== null)
```

### Examples
```
var o = {
    x: 1,
    foo: function (a, b) {
        return this.x + a + b;
    }
};
var f1 = rebind(o.foo, {x:2});
var f2 = rebind(f1, {x:3});
f1(1,1) === 4;
f2(1,1) === 5
```
---
## Task 3
Write a function 
```javascript
function add(n);
```
that accumulates Number values in the following manner:

```javascript
var acc = add(1).add(2).add(3).add(4);
console.log(acc + 5 === 15);

var acc1 = add(1).add(2);
var acc2 = acc1.add(1).add(2);
console.log(acc1 + 1 === 4);
console.log(acc2 + 1 === 7);
```
### Assumptions
- both function and method `add` always receive valid JavaScript Numbers
