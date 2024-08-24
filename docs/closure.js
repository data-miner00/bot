function Counter() {
  var count = 0;

  return function () {
    count++;
    return count;
  };
}

var counter = Counter();

for (var i = 0; i < 10; i++) {
  console.log("Counter is now at: ", counter());
}

function Fibonacci() {
  var a = 1,
    b = 1;

  return function () {
    var temp = a + b;
    a = b;
    b = temp;
    return b;
  };
}

var fib = Fibonacci();

console.log("Fibonacci");

console.log("0, 1, 1");
for (var i = 0; i < 10; i++) {
  console.log(`${fib()}, `);
}
