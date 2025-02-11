const {init, add} = require('./utils/commands')

const arg1 = process.argv[2];

switch (arg1) {
case "init":
        init();
        break;
    case "add":
        const file = process.argv[3];
        add(file);
        break;
    default:
        console.log("error");
        break;
}
