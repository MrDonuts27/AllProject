function countPairsWithProduct(arr, target) {
    let count = 0;
    const numCounts = {};

    for (let num of arr) {
        numCounts[num] = (numCounts[num] || 0) + 1;
    }
    for (let num of arr) {
        const complement = target / num;
        if (numCounts[complement] && (complement !== num || numCounts[num] > 1)) {
            count++;
        }
    }

    return Math.floor(count / 2);
}

const inputs = [
    [[1,2,3,4,5,6], 12],
    [[1, 3, 5, 7, 9], 15],
    [[0, 9, 11, 100], 0],
    [[10, 20, 30, 40], 99]
];

inputs.forEach(([arr, target]) => {
    console.log("Input:", arr, target);
    console.log("Output:", countPairsWithProduct(arr, target), "คู่");
});
