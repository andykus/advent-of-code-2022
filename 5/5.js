import { promises as fs } from 'fs';

const data = await fs.readFile('./input', 'utf-8');

const parseStacks = () => {
    const stacks = [];
    const allStacks = data
        .split('\n\n')[0].split('\n').slice(0, -1)
        .map(s => s.match(/.{1,4}/g));

    allStacks.forEach(cols => cols.forEach((c, i) => {
        stacks[i] = stacks[i] || [];
        stacks[i].push(c.trim());
    }));

    return stacks.map(s => s.reverse().filter(v => v));
};

const parseMove = (row) => {
    const [_, num, from, to] = [
        ...row.matchAll(/(\d+) from (\d+) to (\d+)/g)
    ][0].map(Number);
    
    return { num, from, to };
};

const parseMoves = () => {
    return data.split('\n\n')[1].split('\n').map(parseMove);
};

const solvePartOne = (stacks, moves) => {
    moves.forEach(move => {
        for (let i = 0; i < move.num; i++) {
            const toStack = stacks[move.to - 1];
            const fromStack = stacks[move.from - 1];
            toStack.push(fromStack.pop());
        }
    });

    return stacks.map(s => s.pop()).join('');
};

const solvePartTwo = (stacks, moves) => {
    moves.forEach(move => {
        const fromStack = stacks[move.from - 1];
        const toStack = stacks[move.to - 1];
        toStack.push(...fromStack.splice(fromStack.length - move.num));
    });

    return stacks.map(s => s.pop()).join('');
};

const moves = parseMoves();

console.log(`Part one: ${solvePartOne(parseStacks(), moves)}`);
console.log(`Part two: ${solvePartTwo(parseStacks(), moves)}`);
