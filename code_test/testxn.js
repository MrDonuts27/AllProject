function printCustomPattern(s, characterX) {
    for (let i = 0; i < s; i++) {
        let line = '';
        for (let j = 0; j < s; j++) {
            if (j === 0 || j === i || j === s - 1) {
                line += characterX;
            } else {
                line += ' ';
            }
        }
        console.log(line);
    }
}


const s = 8;
const characterX = 'x';
//const characterO = 'o';
printCustomPattern(s, characterX);
