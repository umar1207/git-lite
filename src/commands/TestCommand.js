import { Command } from './Command.js';
import { writeTree } from '../utils/GitUtils.js';
import { readFile } from '../utils/FileUtils.js';
import fs from 'fs';

function outputFile(dir) {
    // recursively output all files in the directory
    // with respect to the root directory
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const stats = fs.statSync(`${dir}/${file}`);
        if (stats.isDirectory()) {
            if (file === '.git') {
                return;
            }
            outputFile(`${dir}/${file}`);
        } else {
            console.log(`${dir.slice(process.cwd().length)}/${file}`.slice(1));
        }
    });
}

function outputIndex() {
    const index = readFile('.git/index').toString();
    const lines = index.split('\n');
    lines.forEach((line) => {
        const [hash, file] = line.split(' ');
        console.log(`File: ${file}, Hash: ${hash}`);
    });
}

function createTreeObject(tree) {
    const treeEntries = [];

    Object.keys(tree).forEach((key) => {
        const subTree = tree[key];

        if (typeof subTree === 'string') {
            const entry = Buffer.concat([
                Buffer.from(`100644 ${key}\0`),
                Buffer.from(subTree, 'hex'), // Binary SHA-1
            ]);
            treeEntries.push(entry);
        } else {
            const hash = createTreeObject(subTree);
            const entry = Buffer.concat([
                Buffer.from(`040000 ${key}\0`),
                Buffer.from(hash, 'hex'), // Binary SHA-1
            ]);
            treeEntries.push(entry);
        }
    });

    // sort entries by name
    treeEntries.sort((a, b) => {
        const aName = a.slice(7).toString();
        const bName = b.slice(7).toString();
        return aName.localeCompare(bName);
    });
    const rootTreeHash = writeTree(treeEntries);
    return rootTreeHash;
}

function parseIndexFile() {
    const entries = readFile('.git/index').toString().split('\n');
    const tree = {};
    entries.forEach((entry) => {
        const [hash, file] = entry.split(' ');
        const folders = file.split('/');
        let current = tree;
        folders.forEach((folder, index) => {
            if (index === folders.length - 1) {
                current[folder] = hash;
            } else {
                if (!current[folder]) {
                    current[folder] = {};
                }
                current = current[folder];
            }
        });
    });
    return tree;
}

export class TestCommand extends Command {
    execute() {
        const tree = parseIndexFile();
        const hash = createTreeObject(tree);
        console.log(`Tree hash: ${hash}`);
    }
}
