const fs = require("fs");
const path = require("path");

function init(){
    fs.mkdirSync(path.join(process.cwd(), ".mygit"), {recursive: true});
    fs.mkdirSync(path.join(process.cwd(), ".mygit", "objects"), {recursive: true});
    fs.mkdirSync(path.join(process.cwd(), ".mygit", "refs"), {recursive: true});

    fs.writeFileSync(path.join(process.cwd(), ".mygit", "HEAD"), "ref: refs/heads/main\n");
    console.log("Initialised a new git directory");
}

function add(file){
    if(!file) {
        console.log("No files passed");
        return;
    }
    console.log("Added files to staging area");
}

module.exports =  {init, add};
