function errorHandler(error){
        switch(typeof error){
            case ReferenceError:
                console.log("Reference error occured.");
                break;
            case SyntaxError:
                console.log("Unknown syntax.")
                break;
            case RangeError:
                console.log("Out of range.");
                break;
            case EvalError:
                console.log("eval() function error.")
                break;
            case TypeError:
                console.log("Type mismatch.");
            case Error:
                console.log(error.msg)
                break;
            default:
                console.log(error)
                break;
        }
}
module.exports= errorHandler;