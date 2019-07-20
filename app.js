/************* this is example how file system module works *************************************** 

const fs = require('fs')// if we require any [node.js] module or [npm] module etc in our currentfile
// we have to load this module into current file , to load we use [require], here we are loading 
// [file system module] that is use to read files , write files etc. here we created const variable
// with [fs] name it may be any name but it is industry standard that it should same as module name
// because it will be easy to work in cross project

fs.writeFileSync('notes.txt','This is first time!!');// [fs] is an object and [writeFileSync] is a 
// function of [fs] object , this is sysncronous function , asyncronous function we will see later
// first argument is a file name and second argument is conten of the file, now we are using [text]
// document later we will use other type, so we will run then this function is file does not exist
// then it will create and put the content , if file already exist then it will overwrite the 
// content
fs.writeFileSync('notes.txt','This is second time!!');// here it will overwrite the content
fs.appendFileSync('notes.txt',' here we are checking append function!!!!!');// [appendFileSync] function
// will not overwrite the content it will add the content [this was the coding challenge]

*****************************************************************************************************/

//const firstName = require('./utils.js');// here we are loading name variable present in [utils.js] but
// it should be in same directory , if any [console] statemennt present in [utils.js] file 
// then also it will print when we will run [app.js] 
//console.log(firstName);// it will print the variable that is present in [util.js] file

/******************** this is how we can import our created file  ************************************
const sum = require('./utils.js');// it will load [add] function 
const msg = require('./notes.js');// it will load getNotes function [it was challenge]
console.log(sum(4,-2));
console.log(msg());

console.log('app.js');

*************************************************************************************************/

/*********************** This is how to use validator ********************************************
 
const validator = require('validator');// here we are loading [validator] package into our file,
// if you goto to documentation of [validator] there you will see [no ES6 or ES6] , in ES6 to 
// import another file we have to use [import] but in [node.js] we use [require]
// [validator] is used to validate the data we can do manually also but it is better to use library when
// we have, there are many methods in [validator] that you can use in [validator] documentation

console.log(validator.isEmail('suhelkhan275@gmail.com'));// it will return true because it is valid email

console.log(validator.isEmail('suhelkhan275gmail.com'));// it will return false because it is invalid email

console.log(validator.isURL('https://google.com'));//  it will return true because it is valid URL

console.log(validator.isURL('https//google.com'));// it will return false because it is invalid URL

******************************************************************************************************/

/************************* This is how to use chalk [it was the coding challenge] ********************
 
const chalk = require('chalk');// here we are loading [chalk] module that is used to style our consoleoutput
console.log(chalk.bold.green.inverse('success!'));// here we are using the properties of [chalk], and does
// not depend that in which sequence we are using these properties

******************************************************************************************************/

/*************** how we get argument from cmp by process **********************************************
 
console.log(process.argv);// full form of [argv] is [argument vector] , as we discussed in 2nd section 
// that [process] run globlly, output of this will be an array [index 1] = location where node is installed
// [index 2] = location where current file is saved , remaaning index will be argumnets as it is you passed
// in teminal
console.log(process.argv[2]);// it will print extra arguments that you passed 

const command = process.argv[2];

if(command === 'add'){// If you pass [add] extra on terminal , remember it reads as string from terminal
    console.log('add the note !');
}else if(command === 'remove'){// If you pass [remove] extra on terminal , remember it reads as string
    // from terminal
    console.log('remove the note !!');
}

*****************************************************************************************************/

const yargs = require('yargs');// here we are loading yargs package check the notes to know more
const notes = require('./notes.js');//  here we are importing the object that [notes.js] file exported
// customize yargs version
yargs.version('1.1.0');// here we are setting yargs version , if we not set then it will give default
// version

// creating add command
yargs.command({// [command] is a function of yargs package where we pass object and as a property of 
    // this object we can perform our task
   command:'add',// this is what user pass as argument then our defined task will perform
   describe:'add the note',// this is description of that task, it is not mendatory to give 
   // desription but it is good practice

   builder:{// builder will arrange the command that will be pass after parent command in this case after
    // [add] command
       title:{// here after add command we can give title like [--title="Examination"]
           describe:'note title',// this is description like [command description] that we gave above
           demandOption: true ,// here we are applying the condition that title should be there after [add]
           type: 'string'// here we are telling that title type will be string otherwise if we don't 
           // assign title then it will take boolean value that we gave in [demandOption]
       },

       body:{// we can define body before [title] or after [title] no problem
           describe: 'note body',
           demandOption: true,
           type: 'string'
       }
   },
   handler(argv){// here we can define function and perform task
      //console.log('adding note!!'); // this is to check handler is working or not
      //console.log(argv);// it will give array that contains more information also
      //console.log('title: '+ argv.title);// it will print our title
      //console.log('body: ' + argv.body);// it will print our body
      notes.addNote(argv.title,argv.body);// here we will call [addNote] function that is created in 
      // [note.js] file and this function will add our title and body  that we will give in command to 
      // [note.json] file
   }
})

// creating remove command
yargs.command({
    command:'remove',
    describe:'remove note',
    builder:{
        title:{
            describe:'this is the title that will be removed',
            demandOption:true,
            type:'string'
        }

    },
    handler(argv){
        //console.log('removing note');
        notes.removeNote(argv.title);
    }
})

// creating read command
yargs.command({
  command:'read',
  describe:'reading note',
  builder:{
     title:{
         describe:'give the title that you want to read',
         demandOption:true,
         type:'string'
     }
  },
  handler(argv){
      //console.log('reading note');
      notes.readNote(argv.title);
  }

})

// creating list command
yargs.command({
    command:'list',
    describe:'list note',
    handler(){
        //console.log('listing out some notes');
        notes.listNotes();
    }
})
//console.log(process.argv);// as we declared that it will give array
//console.log(yargs.argv);// here we will get argument information in a sequence way

yargs.parse();// when compiler read this [parse] line then compiler will go through all parsing code that 
// we did , we can also use [yargs.argv] but it will print one array will all command info that we don't
// want so we are using [yargs.parse()]























