TODO:

15) Implementare rollback per utentecontroller.addTransazione() e togliere i commenti di DB Sminchiato (Può non essere fatta!)
25) LO SCHEDULE!!!!
26) @kappa89 @Vitus89 @lorenzo93 Implementazione lato GUI e lato back-end (lato back-end?) toDoList Orto
29) IMPLEMENTARE LA PAGINA DEI SENSORI
31) @vitus89 Controllo login fallito già gestito in routes/index.js, provvedi te a reindirizzare dove vuoi
Credo non manchi altro al progetto...

COMPLETATI:
1) Finire il refactor di utenteController e utente.js secondo il nuovo paradigma
2) Fare refactor di addIngresso e addUscita secondo quanto ho spiegato a K
3) Rifare il codice di centralina e sensore
3a) Refactor di magazzinoController e magazzino.js secondo il nuovo paradigma
4) magazzinoController.create() Controllare che non ci sia già l'oggetto e in caso modificare e non aggiungere!
5) magazzinoController.update() verificare che quantità sia >0
6) magazzino evitare di esporre API?? Tanto ci pensa la gestione del mercato a fare tutto
7) utenteController.addTransazione() Bisogna gesire qui dentro PUNTI UTENTE
8) WebUI Admin Prezzario (listAll, modify e aggiungi)
9) Aggiungere bootstrap a tutte le view
10) Fare le api utente con ricerca, addIngresso, addUscita, addTransazione, addColtivazione, removeColtivazione tramite telegramID
11) @kappa89 Escludere alcuni campi nelle stampe dei JSON.... ATTENZIONE a quali!
    utenteTelegramController.
        addOrtaggio()
        removeOrtaggi()
        addTransazione()
        addUscita()
        addEntrata()
        far tornare solo una stringa di conferma [ok/failed]
12) aggiungere listaTransazioni
13) aggiungere removeOrtaggi e gestire l'array senza duplicati
14) modifica market con menu a tendina per ortaggi
16) @vitus89 Stampare nel market i punti dell'utente
17) Mettere tasti + e - in admin/prezzario
18) input(type="number") Hai solo nascosto i tastini integrati di freccia su e giù, se clicchi dove dovrebbero stare si incrementa/decrementa il contatore
19) Comportamento della home in caso di utente loggato? (redirect a /user o home page con la roba dell'utente) @lorenzo93 preferisce la prima
20) @vitus89 check responsive for all elemnts
21) @lorenzo93 collapse magazzino->prezzario
    //add costo, scrocca metodo updatecosto, elimina prezzario(controller, model, route), inserire funzione stampaSolo quantità > 0
    //modifica agguntaPrezzi (route)
    //modifica market per far stampare prezzo
    //modifica addTransazione per fare calcoli di prezzo e scalare/aggiungere punti (verifica cliente abbastanza punti, presenza in magazzino, scala punti, scala magazzino)
22) @vitus89 stampare nome utente dentro la navbar
23) Aggiungere controllo addOrtaggio che esista nel magazzino
24) Aggiungere file upload di immagine in addPrezzo (nella pagina prezzario.jade)
27) @vitus89 Implementare la funzione remove prezzario/magazzino(magazzinoController)
28) Implementare le funzioni rinomina, cambia password e username, remove in getioneUtenti
30) @vitus89 modal for remove