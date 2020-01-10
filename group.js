const quotesRestore  = require("./quotesRead");
const errorHandler = require("./errorHandler");
module.exports={
    command: "group",
    description:"show group of quotes",
    handler: async (argv) => {
        let result;
        let quote;
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
      
     if(argv.category){
        quote = result.filter(el=> el.category===argv.category)
        console.log("Quotes of the specified category: ", argv.category)
        quote.forEach((q, i)=>{
            console.log("Quote nr'",i+1,q.quote, "', by author:",q.author,", seen", q.counter, "times. category:", q.category)
        })
        }else{
        try{
        // stwórz tabelę samych istniejących kategorii
        const categories =  await result.map(el=>el.category)
        categories.forEach(cat=>{
            console.log("----------------")
            console.log("Category:", cat)
            console.log("----------------")
            result.forEach((q,i)=>{
                if(q.category===cat){
                    console.log("Quote nr",i+1,"'",q.quote, "', by author:",q.author,", seen", q.counter, "times. Category:", q.category)
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
            description: "show quotes by specified category"
        })
       
    }
    
}
