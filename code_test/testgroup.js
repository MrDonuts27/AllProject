function findSum(arr, X) {

    arr.sort((a, b) => a - b); 
    
    let group1 = [];
    let group2 = [];
    let sum1 = 0;
    let sum2 = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        if (sum1 <= sum2) {
            group1.push(arr[i]);
            sum1 += arr[i];
        } else {
            group2.push(arr[i]);
            sum2 += arr[i];
        }
    }

    if (Math.abs(X - sum1) < Math.abs(X - sum2)) {
        [group1, group2] = [group2, group1];
    }

    return [group1, group2];
}

const array = [90, 90, 150, 150, 195, 195, 60, 60];
const X = 500;
const [group1, group2] = findSum(array, X);

console.log(`ตอบ 2 กลุ่ม`);
console.log(`กลุ่ม 1 = [${group1}] ผลรวม ${group1.reduce((acc, curr) => acc + curr, 0)} ผลต่าง ${Math.abs(X - group1.reduce((acc, curr) => acc + curr, 0))}`);
console.log(`กลุ่ม 2 = [${group2}] ผลรวม ${group2.reduce((acc, curr) => acc + curr, 0)} ผลต่าง ${Math.abs(X - group2.reduce((acc, curr) => acc + curr, 0))}`);
