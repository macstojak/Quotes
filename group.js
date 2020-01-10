const quotesRestore  = require("./quotesRead");
const errorHandler = require("./errorHandler");
module.exports={
    command: "group",
    description:"show group of quotes",
    handler: async (argv) => {
        let result;
        try{        
            result = await quotesRestore();
            }catch(error){
            if(error.code === "ENOENT"){
                //plik NIE ISTNIEJE, stwórz go
                console.log("There is no database records. Add some quotes first.")
            }else{
                errorHandler(error); 
            }
        }   
        let quote;
     if(argv.category){
        quote = result.filter(el=> el.genre===argv.category)
        console.log("Quotes of the category: ", argv.category)
        quote.forEach((q, i)=>{
            console.log("Quote nr'",i+1,q.quote, "', by author:",q.author,", seen", q.counter, "times. Genre:", q.genre)
        })
        }else{
        try{
        const categories = await [...new Set(result.map(el=>el.genre))]
        categories.forEach(cat=>{
            console.log("----------------")
            console.log("Category:", cat)
            console.log("----------------")
            result.forEach((q,i)=>{
                if(q.genre===cat){
                    console.log("Quote nr",i+1,"'",q.quote, "', by author:",q.author,", seen", q.counter, "times. Genre:", q.genre)
                }
            })
        })
        }catch(error){
            errorHandler(error)
        }   
    }           
    },
    builder: (yargs)=>{
        yargs
        .positional("--category",{
            alias: "-c",
            description: "group quotes by category"
        })
    }
    
}
