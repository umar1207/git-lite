import { Command } from './Command.js';
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
export class TestCommand extends Command {
    execute() {
        outputFile(process.cwd());
    }
}
