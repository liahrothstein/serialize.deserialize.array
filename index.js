const fs = require('node:fs');

function generateRandomNumbersArray(length) {
    var array = Array.from({ length: length }, () => (Math.floor(Math.random() * 299) + 1));

    return (array);
};

function serialize(numsArray, length) {
    fs.writeFileSync(`serialized-array${length}.bin`, new Uint32Array(numsArray))
};

function deserialize(arrayLength) {
    var bufferArray = fs.readFileSync(`./serialized-array${arrayLength}.bin`);

    var parsedArray = new Uint32Array(
        bufferArray.buffer,
        bufferArray.byteOffset,
        bufferArray.byteLength / arrayLength
    );

    return { bufferArray, parsedArray };
};

var fiftyNumbersArray = generateRandomNumbersArray(50);
var oneHundredNumbersArray = generateRandomNumbersArray(100);
var fiveHundredNumbersArray = generateRandomNumbersArray(500);
var oneThousandNumbersArray = generateRandomNumbersArray(1000);


// Tests

// Fifty numbers
serialize(fiftyNumbersArray, fiftyNumbersArray.length);
var { bufferArray: bufferFiftyNumbers } = deserialize(fiftyNumbersArray.length);

console.log(`50 чисел ==>
Исходная строка: ${fiftyNumbersArray};
Сжатая строка: ${bufferFiftyNumbers}`);

// One Hundred numbers
serialize(oneHundredNumbersArray, oneHundredNumbersArray.length);
var { bufferArray: bufferOneHundredNumbers } = deserialize(oneHundredNumbersArray.length);

console.log(`100 чисел ==>
Исходная строка: ${oneHundredNumbersArray};
Сжатая строка: ${bufferOneHundredNumbers}`);

// Five Hundred numbers
serialize(fiveHundredNumbersArray, fiveHundredNumbersArray.length);
var { bufferArray: bufferFiveHundredNumbers } = deserialize(fiveHundredNumbersArray.length);

console.log(`500 чисел ==>
Исходная строка: ${fiveHundredNumbersArray};
Сжатая строка: ${bufferFiveHundredNumbers}`);

// One Thousand numbers
serialize(oneThousandNumbersArray, oneThousandNumbersArray.length);
var { bufferArray: bufferOneThousandNumbers } = deserialize(oneThousandNumbersArray.length);

console.log(`1000 чисел ==>
Исходная строка: ${oneThousandNumbersArray};
Сжатая строка: ${bufferOneThousandNumbers}`);