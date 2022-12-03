const red = '\x1b[31m';
const green = '\x1b[32m';
const clear = '\x1b[0m';

export const christmasPrint = (text) => {
    const tokens = text.split('');
    const colorfulTokens = tokens.map((t, i) => {
        return `${i % 2 === 0 ? red : green}${t}${clear}`;
    });

    console.log(colorfulTokens.join(''));
};

export const alphabetToNumeric = () => {
    const values = {};

    for (let i = 1; i <= 26; i++) {
        values[String.fromCharCode(i + 64).toLowerCase()] = i;
        values[String.fromCharCode(i + 64)] = i + 26;
    }

    return values;
};
