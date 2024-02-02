function SeparaArray(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] !== arr[i + 1]) {
            return false;
        }
    }
    return true;
}

const array1 = [1, 1, 1, 1, 1];
const array2 = [1, 1, 2, 1, 1];
console.log("Is array1 a separator array?", SeparaArray(array1));
console.log("Is array2 a separator array?", SeparaArray(array2)); 
