function Checkstring(s) {
    if (!s) return { char: '', count: 0 };

    let maxChar = ''; //s[0]
    let maxLength = 0; //< s.length 

    let currentLength = 1;
    let currentChar = s[0];

    for (let i = 1; i < s.length; i++) {
        if (s[i] === currentChar) {
            currentLength++;
        } else {
            if (currentLength > maxLength) { //<
                maxLength = currentLength;
                maxChar = currentChar;
            }

            currentChar = s[i];
            currentLength = 1;
        }
    }
    if (currentLength > maxLength) { //<
        maxLength = currentLength;
        maxChar = currentChar;
    }

    return { char: maxChar, count: maxLength };
}

const inputs = ["axxxcxxccxxacvxxwwxx", "aaabcc", "abcde", "abbcccddddeeeee", "aaabaa"];
inputs.forEach(s => {
    const result = Checkstring(s);
    console.log(`Input: '${s}' ตอบ ${result.char} ${result.count} ตัว`);
});

module.exports = Checkstring;
