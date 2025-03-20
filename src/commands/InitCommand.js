import { Command } from './Command.js';
import { writeFile, createFolder } from '../utils/FileUtils.js';

export class InitCommand extends Command {
    execute() {
        createFolder('.git');
        createFolder('.git/objects');
        createFolder('.git/refs');
        writeFile('.git/HEAD', 'ref: refs/heads/main\n');
        console.log(
            `Initialized empty Git repository in ${process.cwd()}/.git/`
        );
    }
}
