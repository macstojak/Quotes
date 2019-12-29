const fs = require("fs");
const uniqeId = require("uniqid");
const data = require("./quotesRead")
const writeFile = require("./quotesWrite");
const errorHandler = require("./errorHandler")
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

      fs.open("quotes.json", "wx", (err,fd)=>{
          if(fd){
                data()
                .then((returnTable)=>{
                   writeFile(returnTable, jsonData)
                })
                .catch(error=>errorHandler(error))
          
          }else if(err){
              if(err.code==="EEXIST"){
                writeFile(quotesTable, jsonData)
              }else{
                  errorHandler(err)
              }
           
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
