const fs = require("fs");
function Data(){
    const data = new Promise((resolve, reject)=>{
        fs.readFile("quotes.json", "utf-8", (err, data)=>{
        err ? reject(err) : resolve(JSON.parse(data))
        })
    })
    return data;             
}
   
module.exports = Data;
