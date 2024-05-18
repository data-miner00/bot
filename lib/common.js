// https://medium.com/@viral_shah/little-known-features-of-javascript-901665291387

const user = {
  firstName: "Nathan",
  lastName: "Drake",

  get fullName() {
    return this.firstName + " " + this.lastName;
  },
  set age(value) {
    if (isNaN(value)) throw Error("Age mut be positiv");
    this._age = Number(value);
  },
  get age() {
    return this._age;
  },
};

function highlight(strings, ...values) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (values[i]) {
      result += `<mark>${values[i]}</mark>`;
    }
  });
  return result;
}

const usernamed = "Maine",
  age = "32";

highlight`Howdy partner, ${usernamed}, age ${age} ya?`;

let counter = 0;

for (var a = 0, b = 10; a <= 10; a++, b--) {
  console.log("a", a, "b", b);
}

function getNextValue() {
  return counter++, console.log(counter), counter;
}

const getSquare = (x) => (console.log(x), x * x);
+"9.11";
+"-4";
+"0xFF";
+true;
+"123e-5";
+false;
+null;
+"Infinity";
+"1,234";
+new Date();

let username = "Nathan Drake";

if (~username.indexOf("Drake")) {
  console.log("Access denied");
} else {
  console.log("Access granted");
}

declarationBlock: {
  var i, j;
}

forLoop1: for (i = 0; i < 3; i++) {
  forLoop2: for (j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      continue forLoop1;
    }
    console.log("i = " + i + ", j = ", j);
  }
}

loopBlock4: {
  console.log("I will print");
  break loopBlock4;
  console.log("I will not print");
}
