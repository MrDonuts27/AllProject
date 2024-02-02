function arraySum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum;
}

const numbers = [3, 7, 2, 10, 5];
console.log("Sum of array:", arraySum(numbers)); 
