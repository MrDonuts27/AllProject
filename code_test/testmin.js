function longestSameCharSubstring(s) {
    if (!s) return { char: '', count: 0 };

    let minChar = s[0];
    let minLength = s.length;

    let currentLength = 1;
    let currentChar = s[0];

    for (let i = 1; i < s.length; i++) {
        if (s[i] === currentChar) {
            currentLength++;
        } else {
            if (currentLength < minLength) {
                minLength = currentLength;
                minChar = currentChar;
            }

            currentChar = s[i];
            currentLength = 1;
        }
    }

    // Check for the last character sequence
    if (currentLength < minLength) {
        minLength = currentLength;
        minChar = currentChar;
    }

    return { char: minChar, count: minLength };
}

const inputs = ["axxxcxxccxxacvxxwwxx", "aaamcc", "abcde", "lbbcccddddeeeee", "aaapaa"];
inputs.forEach(s => {
    const result = longestSameCharSubstring(s);
    console.log(`Input: '${s}' ตอบ ${result.char} ${result.count} ตัว`);
});

module.exports = longestSameCharSubstring;
