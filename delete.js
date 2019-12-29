const fs = require("fs");
let quotesRestore  = require("./quotesRead");
const errorHandler = require("./errorHandler");
module.exports={
    
    command: "delete",
    description: "delete chosen quote",
    handler: (argv) => {
        quotesRestore()
        .then(function(data){
            
            let quotes = data;
            let id = argv.id;
            let chosenQuote = quotes.map(el=>{return el.id}).indexOf(`${id}`)
            quotes.splice(chosenQuote, 1)
            fs.writeFile("./quotes.json", JSON.stringify(quotes), err=>{errorHandler(err)})
        })
        .catch(error=>{errorHandler(error)})
        
       
    },
    builder: (yargs)=>{
        yargs
        .positional("--id",{
            description: "pass unique identifier to delete chosen quote"
        })
    }
    
}
