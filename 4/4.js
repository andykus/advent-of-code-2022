import { promises as fs } from 'fs';
import { intersect } from '../tools/arrays.js';

const rangeToIndeces = (range) => {
    let [ low, high ] = range.split('-').map(Number);
    return [...Array((high - low) + 1).keys()].map(i => low + i);
};

const parseAssignedAreas = async () => {
    const data = await fs.readFile('./input', 'utf-8');
    return data.split('\n')
        .map(r => r.split(','))
        .map(([first, second]) => ({
            first: rangeToIndeces(first),
            second: rangeToIndeces(second)
        }));
};

const solvePartOne = (assignedAreas) => {
    return assignedAreas.filter(a => {
        const overlap = intersect(a.first, a.second);
        return overlap.length === a.first.length || 
               overlap.length === a.second.length;
    }).length;
};

const solvePartTwo = (assignedAreas) => {
    return assignedAreas.filter(a => (
        intersect(a.first, a.second).length
    )).length;
};

const assignedAreas = await parseAssignedAreas();
console.log(`Part one: ${solvePartOne(assignedAreas)}`);
console.log(`Part two: ${solvePartTwo(assignedAreas)}`);
