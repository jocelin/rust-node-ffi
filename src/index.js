const ffi = require("ffi");
const path = require("path");

const libDir = "../rust/target/release";
const libPath = `${libDir}/fib`;
const libPathFull = path.join(__dirname, libPath);
console.debug({ libDir, libPath, libPathFull });

const rustLib = ffi.Library(libPathFull, {
  fibonacci: ["int", ["int"]]
});

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.time("rust");
var rustFibonacci = rustLib.fibonacci(30);
console.timeEnd("rust");

console.time("node");
var nodeFibonacci = fibonacci(30);
console.timeEnd("node");

console.log({ rustFibonacci, nodeFibonacci });
