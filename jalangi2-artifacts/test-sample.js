/**
 * Sample JavaScript file for Jalangi2 testing
 * This file demonstrates various JavaScript operations
 */

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function greet(name) {
    var message = "Hello, " + name + "!";
    console.log(message);
    return message;
}

function calculateSum(a, b, c) {
    var sum = a + b + c;
    var average = sum / 3;
    return { sum: sum, average: average };
}

// Execute some functions
var result1 = fibonacci(5);
var result2 = greet("NodeBB");
var result3 = calculateSum(10, 20, 30);

console.log("Fibonacci(5) = " + result1);
console.log("Sum calculation:", result3);
