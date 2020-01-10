//PROGRAM DO CYTATÓW:
//1. Funkcje programu to: 
// - dodawanie i usuwanie cytatów - ZROBIONE
// - licznik wyświetleń cytatu (losowego) - ZROBIONE
// - losowe wyświetlanie cytatu - ZROBIONE
// - wyświetlenie listy cytatów - ZROBIONE
// - grupowanie cytatów wg kategorii - ZROBIONE
// - filtr: grupa cytatów - ZROBIONE
// - wyświetlenie losowego cytatu z serwera - ZROBIONE
//2. Dane obiektu: ID rekordu(unikalne), autor sentencji oraz jej treść i kategoria - ZROBIONE
//3. Moduły:
// - yargs - tworzenie komend, help oraz pobieranie argumentów za pomocą argv, 
// - fs - wczytywanie i zapis danych do pliku records.json - ZROBIONE
// - uniqid - generator losowych kluczy id - ZROBIONE


const yargs = require("yargs");
const addQuote = require("./add.js");
const deleteQuote = require("./delete.js");
const groupQuotes = require("./group.js")
const showQuote = require("./show.js")
yargs
.command(addQuote)
.command(deleteQuote)
.command(groupQuotes)
.command(showQuote)
.help()
.argv