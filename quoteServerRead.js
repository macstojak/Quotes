const request = require("request");

function quoteServerRead(){
    const getQuote = new Promise((resolve, reject)=>{
        request("http://ec2-18-217-240-10.us-east-2.compute.amazonaws.com/node/quotes.php", (error, response, body)=>{
            if(!error && response.statusCode === 200){
                            const quote = JSON.parse(body)
                            resolve(quote)
                        }else{
                           reject("Didn't found quote on the server.")
                        }
                        })
        })
        return getQuote;
        }
     
module.exports = quoteServerRead;