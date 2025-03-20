import { Command } from './Command.js';
import { readFile } from '../utils/FileUtils.js';
import zlib from 'zlib';

export class CatFileCommand extends Command {
    execute() {
        const arg = process.argv[3];
        const folder = arg.slice(0, 2);
        const file = arg.slice(2);
        const compressed_blob = readFile(`.git/objects/${folder}/${file}`);
        const content = zlib
            .inflateSync(compressed_blob)
            .toString()
            .split('\0')[1];
        process.stdout.write(content);
    }
}
