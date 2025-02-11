const {init, add} = require('./utils/commands')

const arg1 = process.argv[2];

switch (arg1) {
case "init":
        init();
        break;
    case "add":
        // create a blob object with compressed representations of each file
        const file = process.argv[3];
        add(file);
        break;
    case "commit":
        // create a commit and tree object with some meta data
        break;
    default:
        console.log("error");
        break;
}