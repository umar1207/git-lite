import { InitCommand } from './commands/InitCommand.js';
import { AddCommand } from './commands/AddCommand.js';
import { CatFileCommand } from './commands/CatFileCommand.js';
import { TestCommand } from './commands/TestCommand.js';
const arg = process.argv[2];

switch (arg) {
    case 'init':
        const initCommand = new InitCommand();
        initCommand.execute();
        break;
    case 'add':
        const addCommand = new AddCommand();
        addCommand.execute();
        break;
    case 'commit':
        console.log('Commit Command');
        break;
    case 'cat-file':
        const catFileCommand = new CatFileCommand();
        catFileCommand.execute();
        break;
    case 'test':
        const testCommand = new TestCommand();
        testCommand.execute();
        break;
    default:
        console.log('Command not found');
        break;
}
