import { promises as fs } from 'fs';

const data = await fs.readFile('./input', 'utf-8');

const parseMotions = () => {
    return data.split('\n')
        .map(row => row.split(' '))
        .map(([ dir, len ]) => ({ dir, len: Number(len) }));
};

const outOfRange = (head, tail) =>
    Math.abs(head.x - tail.x) > 1 || 
    Math.abs(head.y - tail.y) > 1;

const createRope = (len) => 
    Array(len).fill({ x: 0, y: 0 });

const follow = (knotA, knotB) => {
    if (!outOfRange(knotA, knotB)) {
        return knotB;
    }

    const yMovement = (knotA.y > knotB.y ? 1 : -1);
    const xMovement = (knotA.x > knotB.x ? 1 : -1);
    const isVerticalMove = knotA.x === knotB.x;
    const isHorizontalMove = knotA.y === knotB.y;
    const isDiagonalMove = !isVerticalMove && !isHorizontalMove;

    if (isDiagonalMove) {
        return { 
            x: knotB.x + xMovement,
            y: knotB.y + yMovement,
         };
    }

    if (isVerticalMove) {
        return { x: knotB.x, y: knotB.y + yMovement };
    }

    if (isHorizontalMove) {
        return { x: knotB.x + xMovement, y: knotB.y };
    }
};

const findVisitedTailPositions = (motions, ropeLength) => {
    const rope = createRope(ropeLength);
    const tailVisited = new Set(['0-0']);

    const headMoves = {
        'R': ({x, y}) => ({x: x + 1, y}),
        'L': ({x, y}) => ({x: x - 1, y}),
        'D': ({x, y}) => ({x, y: y - 1}),
        'U': ({x, y}) => ({x, y: y + 1}),
    };

    motions.forEach(({ len, dir }) => {
        for (let j = 0; j < len; j++) {
            rope[0] = headMoves[dir](rope[0]);

            for (let k = 1; k < rope.length; k++) {
                rope[k] = follow(rope[k - 1], rope[k]);
            }

            const tail = rope[rope.length - 1];
            tailVisited.add(`${tail.x}-${tail.y}`);
        }
    });

    return tailVisited.size;
}

const solvePartOne = (motions) => {
    return findVisitedTailPositions(motions, 2);
};

const solvePartTwo = (motions) => {
    return findVisitedTailPositions(motions, 10);
};

const motions = parseMotions();
console.log(`Part one: ${solvePartOne(motions)}`);
console.log(`Part two: ${solvePartTwo(motions)}`);
