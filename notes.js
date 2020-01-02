const fs = require('fs');
const chalk = require('chalk');
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note is added :)'));
  } else {
    console.log(chalk.red.inverse('Same title is present :('));
  }
};

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('notes.json');
    const dataJSON = bufferData.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note Removed !'));
  } else {
    console.log(chalk.red.inverse('No Note Found !'));
  }
};
const listNotes = () => {
  console.log(chalk.blue.inverse('Your Notes:'));
  const notes = loadNotes();
  notes.forEach(note => console.log(chalk.yellow.inverse(note.title)));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(
      chalk.green.inverse(note.title) + ':' + chalk.yellow.inverse(note.body)
    );
  } else {
    console.log(chalk.red.inverse('Sorry this title is not present :('));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
