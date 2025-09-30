let count = 1;
let limit = 10;
let message = "Even numbers:";
const readline = require('node:readline');

function isEven(num) {
    return num % 2 === 0;
}

function printNumbers(limit) {
    console.log(message);
    for (let i = count; i <= limit; i++) {
        if (isEven(i)) {
            console.log(i);
        }
    }
}

printNumbers(limit);