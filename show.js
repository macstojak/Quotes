
const quotesRestore  = require("./quotesRead");
const writeFile = require('./quotesWrite');
const quoteServerRead = require("./quoteServerRead");
const errorHandler = require("./errorHandler");
module.exports={
    command: "show",
    description:"show random quotes",
    handler: async (argv) => {
        if(argv.random){
            try{
            const serverResponse = await quoteServerRead()
            console.log(`Quote from the server: \n"${serverResponse.quote}"\nwritten by: ${serverResponse.author}`)
            }catch(error){
                errorHandler(error)
            }
        }else if(argv.database || argv.list){
            try{        
            const result = await quotesRestore();
            let quotes = result;
            if(argv.list){
                quotes.forEach(quoteInstance=>{
                    let {quote, author, category, counter} = quoteInstance;
                    console.log(`'${quote}', written by ${author}, from the category - ${category}. Seen ${counter} times.`);
                })
             
            }else{
                let quoteNumber = Math.floor(Math.random()*quotes.length);
                let {id, author, category, quote, counter} = quotes[quoteNumber];
                counter += 1;
                console.log("Random quote'",quote, "', by author:",author,", seen", counter, "times.")
                let jsonData = {"id": id, "quote": quote, "author": author, "category": category, counter: counter};
                quotes[quoteNumber] = jsonData;
                writeFile(quotes, jsonData);
            }
            }catch(error){
                if(error.code === "ENOENT"){
                    //plik NIE ISTNIEJE, stwórz go
                    console.log("There is no database records. Add some quotes first.")
                }else{
                    errorHandler(error); 
                }
            }
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
            description: "group quotes by category"
        })
    }
    
}
