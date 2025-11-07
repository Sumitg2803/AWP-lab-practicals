// script.js
const math = require("./math");

// console.log(math.dd)

// functions
console.log("Sum:", math.sum(2, 3));
console.log("Multiply:", math.mul(2, 3));

// constants
console.log("g:", math.g);
console.log("PI:", math.PI);

// class
const calc = new math.Calculator([1, 2, 3, 4]);
console.log("Class sum:", calc.sum());
console.log("Class average:", calc.average());

// default-like
console.log("Default-like:", math.default(2, 3));
