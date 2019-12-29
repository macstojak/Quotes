const fs = require("fs");
const uniqeId = require("uniqid");
const data = require("./quotesRead")
const writeFile = require("./quotesWrite");
module.exports={
    command: 'add <author> <quote> [genre]',
    desc: 'add new quote to the list',
    handler: (argv) => {
      let id = uniqeId();
      id.toString();
      let author = argv.author;
      let quote = argv.quote;
      let genre = "none";
      let counter=0;
      if(argv.genre){
      genre = argv.genre;
      }
      let quotesTable = [];
      let jsonData = {"id": id, "quote": quote, "author": author, "genre": genre, "counter": counter};

      fs.exists("quotes.json", exists=>{
          if(exists){
                data()
                .then((returnTable)=>{
                   writeFile(returnTable, jsonData)
                })
                .catch(err=>console.log(err))
          
          }else if(!exists){
            writeFile(quotesTable, jsonData)
          }
      })
      

     
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
