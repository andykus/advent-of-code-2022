import { promises as fs } from 'fs';
import { desc } from '../tools/arrays.js';
import { sum, toInt } from '../tools/mafs.js';
import { christmasPrint } from '../tools/text.js';

const data = await fs.readFile('./input', 'utf-8');

const getElfCaloryCounts = () => {
    const inventories = data.split('\n\n')
        .map(i => i.split('\n')
        .map(toInt));

    return inventories.map(i => i.reduce(sum)).sort(desc);
};

const solvePartOne = () => {
    return Math.max(...getElfCaloryCounts());
};

const solvePartTwo = () => {
    return getElfCaloryCounts()
        .slice(0, 3)
        .reduce(sum);
};

const answerOne = solvePartOne();
const answerTwo = solvePartTwo();

christmasPrint(`Part one: ${answerOne}`);
christmasPrint(`Part two: ${answerTwo}`);

