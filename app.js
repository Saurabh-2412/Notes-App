const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const Notes = require('./notes');
const notes = require('./notes');

/* console.log(getNotes());
console.log(chalk.green.bold("Success..!")); */

/* var fileArgs = process.argv[2];
console.log(fileArgs); */

/* var fileArgs = process.argv;
var value = toString(fileArgs[0]).split(',')
console.log(chalk.blue.inverse.bold(fileArgs[2])); */

/* console.log(yargs.argv._[0] + yargs.argv.title[0]); */

yargs.command({
    command:"add",
    describe:"Adding Notes",
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'params values',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv) => {
        Notes.addNote(argv.title,argv.body)
    }
})//Adding New Note

yargs.command({
    command:"remove",
    describe:"Removing Notes",
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler: (args) => {
        notes.removeNotes(args.title);
    }
})//Removing Note

yargs.command({
    command:"list",
    describe:"Notes List",
    handler: () => {
        const listedNotes = notes.getNotes()
        /* console.log(chalk.green.inverse("Your Notes : ", listedNotes)); */
    }
})//Listing Notes

yargs.command({
    command:"read",
    describe:"Read Notes",
    handler: (args) => {
        notes.readNotes(args.title);
    }
})//Reading Notes

yargs.parse();