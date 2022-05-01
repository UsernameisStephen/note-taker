//dependencies

const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class Store {
    read() {
      return readFileAsync('db/db.json', 'utf8');
    }
  
    write(note) {
      return writeFileAsync('db/db.json', JSON.stringify(note));
    }
  
    getNotes() {
      return this.read().then((notes) => {
        let parsedNotes;
  
        // If notes isn't an array or can't be turned into one, send back a new empty array
        try {
          parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          parsedNotes = [];
        }
  
        return parsedNotes;
      });
    }
    addNote(note) {
      const { title, text } = note;
  
      if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
      }
      //uuid package allows unique id for each note
      const newNote = { 
        title, text, 
        id: uuid.v4()
      };
  

      return this.getNotes()
      .then((notes) => {
        return [...notes, newNote];
      })
      .then((updatedNotes) => {
        return this.write(updatedNotes);
      })
      .then(() => newNote);
    }
  
    async removeNote(id) {
      const notes = await this.getNotes();
      const filteredNotes = notes.filter((note) => note.id !== id);
      return await this.write(filteredNotes);
    }
  }
  
  module.exports = new Store();