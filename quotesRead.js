const fs = require("fs");
    function Data(){
        fs.exists("quotes.json", exists=>{
            try{
            if(exists){
                const data = new Promise((resolve, reject)=>{
                    fs.readFile("quotes.json", "utf-8", (err, data)=>{
                    err ? reject(err) : resolve(JSON.parse(data))
                    })
                })
                return data;
                }
           
            
    }catch(err){
        return err;  
}})}
   
module.exports = Data;