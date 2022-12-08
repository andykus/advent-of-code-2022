import { promises as fs } from 'fs';

const data = await fs.readFile('./input', 'utf-8');

const parseTreeGrid = () => {
    return data.split('\n').map(r => r.split('').map(Number));
};

const getColumn = (col, treeGrid) => {
    return treeGrid.map(t => t[col]);
};

const viewDistance = (tree, otherTrees) => {
    for (let i = 0; i < otherTrees.length; i++) {
        if (otherTrees[i] >= tree) {
            return i+1;
        }
    }

    return otherTrees.length;
};

const calculateScenicScore = (x, y, grid) => {
    const tree = treeGrid[y][x];
    const column = getColumn(x, grid);
    const leftScore = viewDistance(tree, treeGrid[y].slice(0, x).reverse());
    const rightScore = viewDistance(tree, treeGrid[y].slice(x+1));
    const topScore = viewDistance(tree, column.slice(0, y).reverse());
    const downScore = viewDistance(tree, column.slice(y+1));
    return leftScore * rightScore * topScore * downScore;
};

const isVisibleFromEdge = (x, y, grid) => {
    const column = getColumn(x, grid);
    const tree = grid[y][x];
    const topLeft = Math.max(...grid[y].slice(0, x));
    const topRight = Math.max(...grid[y].slice(x+1));
    const topUp = Math.max(...column.slice(0, y));
    const topDown = Math.max(...column.slice(y+1));
    return tree > topLeft || tree > topRight || tree > topUp || tree > topDown;
};

const solvePartOne = (treeGrid) => {
    let totalTrees = (treeGrid.length * 4) - 4;

    for (let y = 1; y < treeGrid.length - 1; y++) {
        for (let x = 1; x < treeGrid[y].length - 1; x++) {
            if (isVisibleFromEdge(x, y, treeGrid)) {
                totalTrees++;
            }
        }
    }

    return totalTrees;
};

const solvePartTwo = (treeGrid) => {
    const scenicScores = [];

    for (let y = 1; y < treeGrid.length - 1; y++) {
        for (let x = 1; x < treeGrid[y].length - 1; x++) {
            scenicScores.push(calculateScenicScore(x, y, treeGrid));
        }
    }

    return Math.max(...scenicScores);
};

const treeGrid = parseTreeGrid();
console.log(`Part one: ${solvePartOne(treeGrid)}`);
console.log(`Part two: ${solvePartTwo(treeGrid)}`);
