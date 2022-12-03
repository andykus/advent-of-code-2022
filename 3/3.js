import { promises as fs } from 'fs';
import { intersect, chunk } from '../tools/arrays.js';
import { sum } from '../tools/mafs.js';
import { alphabetToNumeric } from '../tools/text.js';

const ITEM_VALUES = alphabetToNumeric();

const getItemValue = (item) => {
    return ITEM_VALUES[item];
};

const organizeRucksack = (rucksack) => {
    const items = rucksack.split('');
    const firstCompartment = items.slice(0, items.length / 2);
    const secondCompartment = items.slice(items.length / 2);

    return {
        inventory: items,
        firstCompartment, 
        secondCompartment,
        commonItemType: intersect(firstCompartment, secondCompartment)[0]
    };
};

const parseRucksacks = async () => {
    const data = await fs.readFile('./input', 'utf-8');
    const rows = data.split('\n');
    return rows.map(organizeRucksack);
};

const solvePartOne = (rucksacks) => {
    return rucksacks
        .map(r => r.commonItemType)
        .map(getItemValue)
        .reduce(sum);
};

const solvePartTwo = (rucksacks) => {
    const groups = chunk(rucksacks, 3);
    const inventories = groups.map(gr => gr.map(e => e.inventory));
    const badges = inventories.map(i => intersect(...i)[0]);
    return badges.map(getItemValue).reduce(sum);
};

const rucksacks = await parseRucksacks();

console.log(`Part one: ${solvePartOne(rucksacks)}`);
console.log(`Part two: ${solvePartTwo(rucksacks)}`);
