function sumOfEvenNumbers(arr) {
    let sum = 0;
    for (let num of arr) {
        if (num % 2 === 0) { //(num % 2 !== 0)
            sum += num;
        }
    }
    return sum;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Sum of even numbers:", sumOfEvenNumbers(array));
