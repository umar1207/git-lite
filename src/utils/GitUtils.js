import zlib from 'zlib';
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

function stageAllFiles(dir, index) {
    const files = fs.readdirSync(dir, index);
    files.forEach((file) => {
        const stats = fs.statSync(`${dir}/${file}`);
        if (stats.isDirectory()) {
            if (file === '.git') {
                return;
            }
            stageAllFiles(`${dir}/${file}`, index);
        } else {
            const hash = createBlob(file);
            const relativePath =
                `${dir.slice(process.cwd().length)}/${file}`.slice(1);
            index.push(`${hash} ${relativePath}`);
        }
    });
}

export { createBlob, stageAllFiles };
