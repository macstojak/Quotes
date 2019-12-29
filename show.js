const fs = require("fs");
const quotesRestore  = require("./quotesRead")
const writeFile = require('./quotesWrite')
const quoteServerRead = require("./quoteServerRead")

module.exports={
    
    command: "show",
    description:"show random quotes",
    handler: (argv) => {
        if(argv.random){
            quoteServerRead()
            .then(serverResponse=>{
                console.log(`Quote from the server: \n"${serverResponse.quote}"\nwritten by: ${serverResponse.author}`)
            })
            .catch(err=>{console.log(err)})
        }else if(argv.database){
        quotesRestore()
        .then(function(data){
                let quotes = data;
                let quoteNumber = Math.floor(Math.random()*quotes.length);
                let {id, author, genre, quote, counter} = quotes[quoteNumber]
                counter += 1;
                console.log("Random quote'",quote, "', by author:",author,", seen", counter, "times.")
                let jsonData = {"id": id, "quote": quote, "author": author, "genre": genre, counter:counter};
                quotes[quoteNumber] = jsonData;
                writeFile(new Array, quotes);
            
        })
        .catch(error=>{return error})
    }
       
    },
    builder: (yargs)=>{
        yargs
        .positional("--random",{
            alias: "-r",
            description: "generate random quote from server"
        })
        .positional("--database",{
            alias: "-d",
            description: "show quote from database"
        })
    }
    
}
