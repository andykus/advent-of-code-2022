export const desc = (a, b) => b - a;

export const chunk = (arr, chunkSize) => {
    const res = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }

    return res;
};

export const intersect = (...arrs) => {
    return arrs.reduce((a, b) => a.filter(c => b.includes(c)))
};