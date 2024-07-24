const memo = {};

var fibonacci = function (number) {
    if (number == 0) {
        return 0;
    } else if (number == 1) {
        return 1;
    } else if (number > 1) {
        return fibonacci(number - 1) + fibonacci(number - 2);
    } else {
        number = -number;
        return -fibonacci(number);
    }
}

console.log("Fibonacci of 19 is ", fibonacci(19));
console.log("Fibonacci of -53 is ", fibonacci(-50));


module.exports = fibonacci;
