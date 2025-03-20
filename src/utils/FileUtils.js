import fs from 'fs';
import path from 'path';
// create a folder function
function createFolder(folderPath) {
    fs.mkdirSync(path.join(process.cwd(), folderPath), { recursive: true });
}

// create a file function
function writeFile(filePath, fileContent) {
    fs.writeFileSync(path.join(process.cwd(), filePath), fileContent);
}

function readFile(filePath) {
    return fs.readFileSync(path.join(process.cwd(), filePath));
}

export { createFolder, writeFile, readFile };
