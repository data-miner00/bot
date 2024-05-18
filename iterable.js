// Iterators
const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next() {
        step++;
        if (step == 10) {
          return { value: "end dy", done: true };
        }
        return { value: step, done: false };
      },
    };

    return iterator;
  },
};

for (const count of obj) {
  console.log(count);
}

// Generators
function* giveNext() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

const gg = giveNext();

for (const num of gg) {
  console.log(num);
}
