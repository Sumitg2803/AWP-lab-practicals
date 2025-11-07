// math.js

// functions
const sum = (a, b) => a + b;

// module.export dd = sum;
const mul = (a, b) => a * b;

// constants
const g = 9.8;
const PI = 3.14;

// class
class Calculator {
  constructor(numbers = []) {
    this.numbers = numbers;
  }
  sum() {
    return this.numbers.reduce((s, n) => s + n, 0);
  }
  average() {
    return this.numbers.length ? this.sum() / this.numbers.length : 0;
  }
}

// default-like function
const defaultFn = (a, b) => a * b + 10;

// export everything
module.exports = {
  sum: sum,
  mul: mul,
  g: g,
  PI: PI,
  Calculator: Calculator,
  default: defaultFn
};