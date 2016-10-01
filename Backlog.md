TODO:

7) utenteController.addTransazione() Bisogna gesire qui dentro PUNTI UTENTE
8) WebUI Admin Prezzario (listAll, modify e aggiungi)
9) Aggiungere bootstrap a tutte le view
10) Fare le api utente con ricerca, addIngresso, addUscita, addTransazione tramite telegramID
11) Escludere alcuni campi nelle stampe dei JSON.... ATTENZIONE!
15) Implementare rollback per utentecontroller.addTransazione() e togliere i commenti di DB Sminchiato
16) @vitus89 Stampare nel market i punti dell'utente



Credo non manchi altro al progetto...

COMPLETATI:
1) Finire il refactor di utenteController e utente.js secondo il nuovo paradigma
2) Fare refactor di addIngresso e addUscita secondo quanto ho spiegato a K
3) Rifare il codice di centralina e sensore
3a) Refactor di magazzinoController e magazzino.js secondo il nuovo paradigma
4) magazzinoController.create() Controllare che non ci sia già l'oggetto e in caso modificare e non aggiungere!
5) magazzinoController.update() verificare che quantità sia >0
6) magazzino evitare di esporre API?? Tanto ci pensa la gestione del mercato a fare tutto
12) aggiungere listaTransazioni
13) aggiungere removeOrtaggi e gestire l'array senza duplicati
14) modifica market con menu a tendina per ortaggi