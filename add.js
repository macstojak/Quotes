const fs = require("fs");
const uniqeId = require("uniqid");
const quotesRead = require("./quotesRead")
const writeFile = require("./quotesWrite");
const errorHandler = require("./errorHandler")
module.exports={
    command: 'add <author> <quote> [category]',
    desc: 'add new quote to the list',
    handler: async (argv) => {
      let id = uniqeId();
      id.toString();
      let author = argv.author;
      let quote = argv.quote;
      let category = "none";
      let counter=0;
      if(argv.category){
      category = argv.category;
      }
      
      let jsonData = {"id": id, "quote": quote, "author": author, "category": category, "counter": counter};
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
        .positional("[category]",{
            describe: "category of a quote",
            type: "string",
            default:""
        })
    }
  }
