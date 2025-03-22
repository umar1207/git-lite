import { Command } from './Command.js';
import { readFile, writeFile } from '../utils/FileUtils.js';
import { createBlob, stageAllFiles } from '../utils/GitUtils.js';

export class AddCommand extends Command {
    execute() {
        const arg = process.argv[3];
        switch (arg) {
            case '.':
                // stage all files
                const indexEntries = [];
                stageAllFiles('./', indexEntries);
                writeFile('.git/index', Buffer.from(indexEntries.join('\n')));
                break;
            default:
                const hash = createBlob(arg);
                // first check if index file exists
                let index;
                try {
                    index = readFile('.git/index').toString();
                } catch (error) {
                    index = '';
                }
                if (index === '') {
                    // simply write the hash and the file path
                    writeFile('.git/index', Buffer.from(`${hash} ${arg}`));
                } else {
                    // check if the file is already in the index
                    let flag = false;
                    const lines = index.split('\n');
                    for (const line of lines) {
                        const [existingHash, file] = line.split(' ');
                        if (file === arg) {
                            // update the hash
                            flag = true;
                            writeFile(
                                '.git/index',
                                Buffer.from(
                                    index.replace(
                                        `${existingHash} ${file}`,
                                        `${hash} ${arg}`
                                    )
                                )
                            );
                            break;
                        }
                    }
                    if (!flag) {
                        // add the hash and the file path
                        writeFile(
                            '.git/index',
                            Buffer.from(`${index}\n${hash} ${arg}`)
                        );
                    }
                }
                break;
        }
        console.log('Add command executed');
    }
}
