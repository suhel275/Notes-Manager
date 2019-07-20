console.log('utils.js');


// const name = 'suhel';
// module.exports = name;// members of a file have scope in the file but if we want to use these 
// members in another file then we have to export .

const add = function(a,b){
return a + b ;
}

module.exports = add ;// members of a file have scope in the file but if we want to use these 
// members in another file then we have to export .