import { promises as fs } from 'fs';
import { sum } from '../tools/mafs.js';

const data = await fs.readFile('./input', 'utf-8');

const getSubFoldersSize = (path, fileSystem) => {
    return fileSystem
        .filter(s => s.path.startsWith(path) && s.path !== path)
        .map(s => s.size)
        .reduce(sum, 0);
};

const parseFileSystem = () => {
    const fileSystem = [];
    const lines = data.split('\n');
    const path = [];

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].startsWith('$ cd')) {
            continue;
        }

        const target = lines[i].split(' ')[2];

        if (target === '..') {
            path.pop();
            continue;
        }

        path.push(target);

        let folderSize = 0;
        let j = i + 2;
        while (j < lines.length && !lines[j].startsWith('$')) {
            const fileSize = lines[j].split(' ')[0];

            if (!isNaN(fileSize)) {
                folderSize += Number(fileSize);
            }

            j++;
        }

        fileSystem.push({ path: path.join('/'), size: folderSize });
    }

    return fileSystem.map(f => {
        f.size = f.size += getSubFoldersSize(f.path, fileSystem);
        return f;
    });
};

const solvePartOne = (fileSystem) => {
    return fileSystem
        .filter(path => path.size <= 100000)
        .map(path => path.size)
        .reduce(sum, 0);
};

const solvePartTwo = (fileSystem) => {
    const rootSize = fileSystem.find(f => f.path === '/').size;
    const free = 70000000 - rootSize;
    const required = 30000000 - free;

    const candidates = fileSystem
        .filter(c => c.size >= required)
        .map(c => c.size);

    return Math.min(...candidates);
};

const fileSystem = parseFileSystem();
console.log(`Part one: ${solvePartOne(fileSystem)}`);
console.log(`Part two: ${solvePartTwo(fileSystem)}`);
