function* range(start, end) {
  for (var i = start; i < end; i++) {
    yield i;
  }
}

for (var num of range(5, 13)) {
  console.log(num);
}

function* counterGenerator() {
  var count = 0;

  while (true) {
    count = yield ++count;
  }
}

var counter = counterGenerator();

console.log(counter.next()); // 1
console.log(counter.next(10)); // 11
console.log(counter.next(15)); // 16

function* fibonacciGenerator() {
  var [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

var fibonacci = fibonacciGenerator();

for (var i = 0; i < 10; i++) {
  console.log(fibonacci.next());
}

// Nested generators
function* nestedGenerator() {
    yield "I am nested";
}

function* outerGenerator() {
    yield "Before nested";
    yield* nestedGenerator();
    yield "After nested";
}

var outer = outerGenerator();

for (var i = 0; i < 4; i++) {
    console.log(outer.next());
}

