import { promises as fs } from 'fs';

const data = await fs.readFile('./input', 'utf-8');

const findMarkerIndex = (markerSize) => {
    const currentSegment = [];
    for (let i = 0; i < data.length; i++) {
        if (currentSegment.length === markerSize) {
            currentSegment.shift();
        }

        currentSegment.push(data[i]);
        const isMarker = [...new Set(currentSegment)].length === markerSize;

        if (isMarker) {
            return i + 1;
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
