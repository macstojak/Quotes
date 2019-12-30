const fs = require("fs");
const errorHandler = require("./errorHandler");

function Write(returnTable, jsonData){
    let table;
    console.log(returnTable)
    if(!!returnTable){
    table = JSON.parse(returnTable);
    }else{
        table=[];
    }
        table.push(jsonData);
        fs.writeFile("quotes.json", JSON.stringify(table), err=>{errorHandler(err)})
}

module.exports = Write;