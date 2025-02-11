const arg1 = process.argv[2];

switch (arg1) {
    case "init":
        console.log("intialised");
        // call function to init a repo
        break;
    case "add":
        const file = process.argv[3];
        if(!file) {
            console.log("No files passed");
            break;
        }
        // function to git add
        console.log("added the files to staging area");
        break;
    default:
        console.log("error");
        break;
}