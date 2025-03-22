import zlib from 'zlib';
import path from 'path';
import fs from 'fs';
import { generateHash } from './HashUtils.js';
import { createFolder, writeFile, readFile } from './FileUtils.js';

function createBlob(filePath) {
    const fileContent = readFile(filePath);
    const fileSize = fileContent.length;
    const header = `blob ${fileSize}\0`;
    const blob = Buffer.concat([Buffer.from(header), Buffer.from(fileContent)]);
    const hash = generateHash(blob);
    const folder = hash.slice(0, 2);
    const file = hash.slice(2);
    createFolder(`.git/objects/${folder}`);
    writeFile(`.git/objects/${folder}/${file}`, zlib.deflateSync(blob));
    return hash;
}

function writeTree(treeEntries) {
    const content = Buffer.concat(treeEntries);
    const header = `tree ${content.length}\0`;
    const tree = Buffer.concat([Buffer.from(header), content]);
    const treeHash = generateHash(tree);
    const folder = treeHash.slice(0, 2);
    const file = treeHash.slice(2);
    createFolder(`.git/objects/${folder}`);
    writeFile(`.git/objects/${folder}/${file}`, zlib.deflateSync(tree));
    return treeHash;
}

function stageAllFiles(dir, index) {
    const fullPath = path.resolve(process.cwd(), dir);
    const files = fs.readdirSync(fullPath);

    files.forEach((file) => {
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            if (file !== '.git') {
                stageAllFiles(path.join(dir, file), index);
            }
        } else {
            const relativePath = path.relative(process.cwd(), filePath);
            const hash = createBlob(relativePath);
            index.push(`${hash} ${relativePath}`);
        }
    });
}

export { createBlob, writeTree, stageAllFiles };
