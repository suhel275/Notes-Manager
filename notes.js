const fs = require('fs');// here we are impoeting [file system] that we know
const chalk = require('chalk');

//const getNotes = ()=>'Your notes ..........'// this is the example function to check how function is exported 


const addNote = (title,body)=> {//this function will add  title and body  that are passed from [app.js] 
    // file and will add to [note.json] file
    const notes = loadNotes();// this function will fetch the data from [notes.json] file and convert it
    // into array and here we will store in [notes] variable
    //console.log(notes);// it is only for checking purpose

    //const duplicateNotes = notes.filter((note)=>note.title === title)// here we are checking that same [title] should 
    // not be present previously. [filter] function will return the [sub array] of [notes] array.
    // in filter function we can write a function for matching criteria , this matching function will
    // run for every element of notes array. if filter function gets return [true] then it will put
    // this current element into sub array, if get false then filter function will not put this current 
    // element to the sub array.if title match then it will return true
    // but problem is this [filter] method after finding duplicate element will not stop it will search for
    // remaining elements also , so we will use [find] method because [find] method after finding our 
    // required element will stop

    const duplicateNote = notes.find((note)=>note.title === title);

    //if(duplicateNotes.length === 0){// this is the statement if we use [filter]
    if(!duplicateNote){// we can also use if(duplicateNote === undefined) , both are correct because if 
        // [find] method does'nt find element then it returns [undefined]
        notes.push({// here we are pusing the new object into array where all previous object are present
            // that we fetch by [loadNotes] function, we did this because if without fetching previos object 
            // if we put new then it will overwrite and by doing this all object will be present in one array
            title:title,
            body:body
        })

        saveNotes(notes);// this function will store our final array into [note.json] file
        console.log(chalk.green.inverse('New note is added :)'));
    }else{
        console.log(chalk.red.inverse('Same title is present :('));
    }

  


}

const loadNotes =()=>{// this function will fetch the data from [notes.json] file and convert it
    // into array and here we will store in [notes] variable
    try{// here we apply try because in first time [notee.json] file will not be there so these codes will
        // create error
        const bufferData = fs.readFileSync('notes.json');
        const dataJSON = bufferData.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];// if error occure that means [notes.json] file is not there so we will return an empty
        // array and new object will be pushed in this empty array and saved into [notes.json] file , so 
        // here we have decided that all object will be present in array
    }
   
}

const saveNotes =(notes)=>{// this function will store our final array into [note.json] file
const dataJSON = JSON.stringify(notes);
fs.writeFileSync('notes.json', dataJSON);

}

const removeNote =(title)=>{
    // console.log(`this title ${title} will be removed`);
    const notes = loadNotes();
        const notesToKeep = notes.filter((note)=>note.title !== title )
        if(notesToKeep.length < notes.length){
            saveNotes(notesToKeep);
            console.log(chalk.green.inverse('Note Removed !'));

        }else{
            console.log(chalk.red.inverse('No Note Found !'));
        }
}
const listNotes = ()=>{
    console.log(chalk.blue.inverse('Your Notes:'))
    const notes =loadNotes();
    notes.forEach((note)=> console.log(chalk.yellow.inverse(note.title))); 
}
 
const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=>note.title === title);
    if(note){
    console.log(chalk.green.inverse(note.title)+':'+chalk.yellow.inverse(note.body));
    }else{
    console.log(chalk.red.inverse('Sorry this title is not present :('));
    }
}


// module.exports = getNotes ;// members of a file have scope in the file but if we want to use these 
// members in another file then we have to export . [It was coding challenge].

module.exports = {// if we have to require multiple export then we will export an object and put all things
    // as this object property
    //getNotes:getNotes,// here we are saying that we are exporting [getNotes] function that can be used 
    //after importing by [getNotes] name, it was for checking purpose.0-
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}