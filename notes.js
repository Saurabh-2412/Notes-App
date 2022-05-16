const fs = require('fs');
const chalk = require('chalk');

getNotes = () => {
    const loadedNotes = loadNotes();
    /* const notesList = loadedNotes.map((ele) => ele.title);
    return notesList; */
    loadedNotes.forEach(element => {
        console.log(element.title);
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => { return note.title === title })//duplicateNotes.length === 0
    const duplicateNote = notes.find((note) => { return note.title === title })//duplicateNote

    if (!duplicateNote) {    
        notes.push({
            title:title,
            body:body
        })   
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added Successfully..!'));
    } else {
        console.log(chalk.red.inverse('Note Title Taken..!!'));
    }
}

const saveNotes = (notes) => {
    const stringifyingJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', stringifyingJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJOSN = dataBuffer.toString();
        return JSON.parse(dataJOSN);
    } catch (error) {
        return []   
    }
}

const readNotes = (title) => {
    const fetchingNotes = loadNotes();
    const filteringNotes = fetchingNotes.find((note) => note.title === title);
    if (filteringNotes) {
        console.log(chalk.green.inverse(filteringNotes.title));
        console.log(filteringNotes.body);
    } else {
        console.log(chalk.red.inverse("No Note Found With Given Title"));
    }
}

const removeNotes = (title) => {
    const notesList = loadNotes();
    const filteredNote = notesList.filter((ele) => {
        return ele.title !== title;  
    })
    if (notesList.length > filteredNote.length) {
        console.log(chalk.green.inverse("Note Removed..!"));
        saveNotes(filteredNote); 
    } else {
        console.log(chalk.red.inverse("No Note Found..!"));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    readNotes: readNotes
}