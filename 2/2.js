import { promises as fs } from 'fs';
import { sum } from '../tools/mafs.js';

const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const SCORES = { 'X': 1, 'Y': 2, 'Z': 3 };

const OPPONENT_MOVES = {
    'A': { winningMove: 'Y', drawMove: 'X', losingMove: 'Z' },
    'B': { winningMove: 'Z', drawMove: 'Y', losingMove: 'X' },
    'C': { winningMove: 'X', drawMove: 'Z', losingMove: 'Y' }
};

const calculateRoundScore = ([opponentMove, myMove]) => {
    if (myMove === OPPONENT_MOVES[opponentMove].winningMove) {
        return WIN_SCORE + SCORES[myMove];
    }

    if (myMove === OPPONENT_MOVES[opponentMove].drawMove) {
        return DRAW_SCORE + SCORES[myMove];
    }

    return SCORES[myMove];
};

const calculateRiggedRoundScore = ([opponentMove, instruction]) => {
    if (instruction === 'X') {
        return SCORES[OPPONENT_MOVES[opponentMove].losingMove];
    }

    if (instruction === 'Y') {
        return DRAW_SCORE + SCORES[OPPONENT_MOVES[opponentMove].drawMove];
    }

    if (instruction === 'Z') {
        return WIN_SCORE + SCORES[OPPONENT_MOVES[opponentMove].winningMove];
    }
};

const parseRounds = async () => {
    const data = await fs.readFile('./input', 'utf-8');
    const rows = data.split('\n');
    return rows.map(r => r.split(' '));
};

const solvePartOne = (rounds) => {
    return rounds.map(calculateRoundScore).reduce(sum);
};

const solvePartTwo = (rounds) => {
    return rounds.map(calculateRiggedRoundScore).reduce(sum);
};

const rounds = await parseRounds();

console.log(`Part one: ${solvePartOne(rounds)}`);
console.log(`Part two: ${solvePartTwo(rounds)}`);

