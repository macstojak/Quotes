// const addCommand=require("./add.js");
// const listCommand=require("./list.js");
// require('yargs')
//   .command(addCommand)
//   .command(listCommand)
//   // provide a minimum demand and a minimum demand message
//   .demandCommand(1, 'You need at least one command before moving on')
//   .help()
//   .argv


//PROGRAM DO CYTATÓW:
//1. Funkcje programu to: 
// - dodawanie i usuwanie cytatów - ZROBIONE
// - licznik wyświetleń cytatu (losowego) - ZROBIONE
// - losowe wyświetlanie cytatu - ZROBIONE
// - wyświetlenie listy cytatów - ! 
// - grupowanie cytatów wg kategorii - ! 
// - filtr: grupa cytatów - !
// - wyświetlenie losowego cytatu z serwera - ZROBIONE
//2. Dane obiektu: ID rekordu(unikalne), autor sentencji oraz jej treść i kategoria - ZROBIONE
//3. Moduły:
// - yargs - tworzenie komend, help oraz pobieranie argumentów za pomocą argv, 
// - fs - wczytywanie i zapis danych do pliku records.json - ZROBIONE
// - uniqid - generator losowych kluczy id - ZROBIONE


const yargs = require("yargs");
const addQuote = require("./add.js");
const deleteQuote = require("./delete.js");
const editQuote = require("./edit.js");
const showQuote = require("./show.js")
yargs
.command(addQuote)
.command(deleteQuote)
// .command(editQuote)
.command(showQuote)
.help()
.argv