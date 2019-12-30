const fs = require("fs");
const quotesRestore  = require("./quotesRead");
const writeFile = require('./quotesWrite');
const quoteServerRead = require("./quoteServerRead");
const errorHandler = require("./errorHandler");
module.exports={
    command: "show",
    description:"show random quotes",
    handler: async (argv) => {
        if(argv.random){
            quoteServerRead()
            .then(serverResponse=>{
                console.log(`Quote from the server: \n"${serverResponse.quote}"\nwritten by: ${serverResponse.author}`)
            })
            .catch(err=>{errorHandler(err)})
        }else if(argv.database || argv.list){
                       
        const result = quotesRestore();
        try{
        let data = await result;
        console.log(data)
        }catch(error){
            if(error.code === "ENOENT"){
                //plik NIE ISTNIEJE, stwórz go
                console.log("no such file exists")
            }else{
                errorHandler(data); 
            }
        }
    // if(data instanceof Error){
        
    // }else{
    //    //plik istnieje i dane się wczytały
        
    //     let quotes = JSON.parse(data);
    //     if(argv.list){
    //         console.log("Quotes list: ", quotes)
    //     }else{
    //         let quoteNumber = Math.floor(Math.random()*quotes.length);
    //         let {id, author, genre, quote, counter} = quotes[quoteNumber]
    //         counter += 1;
    //         console.log("Random quote'",quote, "', by author:",author,", seen", counter, "times.")
    //         let jsonData = {"id": id, "quote": quote, "author": author, "genre": genre, counter:counter};
    //         quotes[quoteNumber] = jsonData;
    //         writeFile(new Array, quotes);
    //     }
    // }
}               
    },
    builder: (yargs)=>{
        yargs
        .positional("--list",{
            alias: "-l",
            description: "list quotes from database"
        })
        .positional("--random",{
            alias: "-r",
            description: "generate random quote from server"
        })
        .positional("--database",{
            alias: "-d",
            description: "show quote from database"
        })
        .positional("--group",{
            alias: "-g",
            description: "group quotes by genre"
        })
    }
    
}
