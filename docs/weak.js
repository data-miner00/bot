var obj = {};
var obj2 = {};

var ws = new WeakSet();
ws.add(obj);

var wm = new WeakMap();
wm.set(obj, "hello");
wm.set(obj2, "world");

console.log("-----------------");

console.log(ws);
console.log(wm);

console.log("-----------------");
delete obj;
delete obj2;

console.log(ws);
console.log(wm);
