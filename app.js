const yargs = require('yargs');
const notes = require('./notes.js');
yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'add the note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },

    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// creating remove command
yargs.command({
  command: 'remove',
  describe: 'remove note',
  builder: {
    title: {
      describe: 'this is the title that will be removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// creating read command
yargs.command({
  command: 'read',
  describe: 'reading note',
  builder: {
    title: {
      describe: 'give the title that you want to read',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

// creating list command
yargs.command({
  command: 'list',
  describe: 'list note',
  handler() {
    notes.listNotes();
  }
});

yargs.parse();
