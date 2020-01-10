const fs = require("fs");
const uniqeId = require("uniqid");
const quotesRead = require("./quotesRead")
const writeFile = require("./quotesWrite");
const errorHandler = require("./errorHandler")
module.exports={
    command: 'add <author> <quote> [genre]',
    desc: 'add new quote to the list',
    handler: async (argv) => {
      let id = uniqeId();
      id.toString();
      let author = argv.author;
      let quote = argv.quote;
      let genre = "none";
      let counter=0;
      if(argv.genre){
      genre = argv.genre;
      }
      
      let jsonData = {"id": id, "quote": quote, "author": author, "genre": genre, "counter": counter};
      try{
        let quotesTable = await quotesRead();
        writeFile(quotesTable, jsonData);
        console.log("New quote saved to file quotes.json")  
      }
      catch(error){
        if(error.code==="ENOENT"){
            writeFile(new Array(), jsonData);
            console.log("New quote saved to file quotes.json")
        }else{
            errorHandler(error);
        }
      }
     
   
    },
    builder: (yargs) => {
        yargs
        .positional("<author>",{
            describe: "author of a quote",
            type: "string"
        })
        .positional("<quote>",{     
            describe: "quote of the author",
            type: "string"
        })
        .positional("[genre]",{
            describe: "genre of a quote",
            type: "string",
            default:""
        })
    }
  }
