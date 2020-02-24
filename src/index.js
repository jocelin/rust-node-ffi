const ffi = require('ffi');
const path = require('path');

const libDir = '../rust/target/release';
const libPath = `${libDir}/fib`;
const libPathFull = path.join(__dirname, libPath);
// console.debug({ libDir, libPath, libPathFull });

const rustLib = ffi.Library(libPathFull, {
  fibonacci: ['uint', ['int']],
});

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const [, , rawInput = 30] = process.argv;
const input = parseInt(rawInput);

console.log(`Calculating fibonacci, input: ${input}\n`);

console.time('rust');
var rustFib = rustLib.fibonacci(input);
console.timeEnd('rust');

console.time('node');
var nodeFib = fibonacci(input);
console.timeEnd('node');

const result = {
  Fibonacci: {
    rust: rustFib.toLocaleString(),
    node: nodeFib.toLocaleString(),
  },
};
console.log(JSON.stringify(result, null, 2));
