const fs = require("fs");

function Write(returnTable, jsonData){
    const data =  new Promise((resolve, reject)=>{
        if(resolve){
        returnTable.push(jsonData);
        fs.writeFile("quotes.json", JSON.stringify(returnTable), err=>{console.log(err)})
        }
        else{
            reject("Can't write file");
        }
    })
    return data;
}

module.exports = Write;