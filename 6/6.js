import { promises as fs } from 'fs';

const data = await fs.readFile('./input', 'utf-8');

const findMarkerIndex = (markerSize) => {
    for (let i = 0; i < data.length; i++) {
        if (new Set(data.slice(i, i + markerSize)).size === markerSize) {
            return i + markerSize;
        }
    }
};

const solvePartOne = () => {
    return findMarkerIndex(4);
};

const solvePartTwo = () => {
    return findMarkerIndex(14);
};

console.log(`Part one: ${solvePartOne()}`);
console.log(`Part two: ${solvePartTwo()}`);
