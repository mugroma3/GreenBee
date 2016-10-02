TODO:

7) utenteController.addTransazione() Bisogna gesire qui dentro PUNTI UTENTE
9) Aggiungere bootstrap a tutte le view
11) Escludere alcuni campi nelle stampe dei JSON.... ATTENZIONE a quali!
15) Implementare rollback per utentecontroller.addTransazione() e togliere i commenti di DB Sminchiato
16) @vitus89 Stampare nel market i punti dell'utente
17) Mettere tasti + e - in admin/prezzario
18) input(type="number") Hai solo nascosto i tastini integrati di freccia su e giù, se clicchi dove dovrebbero stare si incrementa/decrementa il contatore
20) @vitus89 check responsive for all elemnts
21) @lorenzo93 collapse magazzino->prezzario


Credo non manchi altro al progetto...

COMPLETATI:
1) Finire il refactor di utenteController e utente.js secondo il nuovo paradigma
2) Fare refactor di addIngresso e addUscita secondo quanto ho spiegato a K
3) Rifare il codice di centralina e sensore
3a) Refactor di magazzinoController e magazzino.js secondo il nuovo paradigma
4) magazzinoController.create() Controllare che non ci sia già l'oggetto e in caso modificare e non aggiungere!
5) magazzinoController.update() verificare che quantità sia >0
6) magazzino evitare di esporre API?? Tanto ci pensa la gestione del mercato a fare tutto
8) WebUI Admin Prezzario (listAll, modify e aggiungi)
10) Fare le api utente con ricerca, addIngresso, addUscita, addTransazione, addColtivazione, removeColtivazione tramite telegramID
12) aggiungere listaTransazioni
13) aggiungere removeOrtaggi e gestire l'array senza duplicati
14) modifica market con menu a tendina per ortaggi
19) Comportamento della home in caso di utente loggato? (redirect a /user o home page con la roba dell'utente) @lorenzo93 preferisce la prima