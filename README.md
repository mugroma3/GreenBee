# BioOrtoStar

## bluetooth low energy nell'orto

[android ble](https://developer.android.com/guide/topics/connectivity/bluetooth-le.html) ⬱ guida per capirci qualcosa di Bluetooth Low Energy (ble) nel contesto di android - ma i concetti sono generali.

Nel ble ci sono 2 attori: il server ble e il client ble.

Il server ble è il device a cui si connette un client, ed espone vari servizi che il client può leggere (e scrivere)
Nel nostro caso il server ble è l'apparecchietto ble responsabile di leggere vari dati del suolo, e il client ble è l'apparecchio che legge questi dati dal server ble, e li trasmette online ad un qualche servizio (di questo ne discuteremo dopo)

il server ble è identificato da un indirizzo di 6 byte (di solito scritto come 6 coppie di valori esadecimali divisi da due punti, per es: aa:bb:cc:dd:ee:ff), e le caratteristiche (il nome tecnico è ATT, sono gli endpoint che il server fornisce per leggerne i dati) sono uuid di 128 bit. per il nostro scopo ogni server ha un payload leggibile di 20 byte, che contiene tra l'altro la temperatura, il livello batteria, l'umidità, e un altro paio di valori che ancora non sono stati decisi.

Il client ble ha una lista di server ble, e per ogni serve l'uuid della caratteristica che deve leggere. l'algoritmo è abbastanza semplice:

    Ogni 10 minuti:
      mi sveglio
      init di lista_server_vivi e lista_server_non_vivi
      per ogni server_ble s che conosco
        provo a connettermi a s
          se ci riesco,
            richiedo di leggere i 20 byte della caratteristica c in buffer
            aggiungo (s,buffer) a lista_server_vivi
            disconnetto s
          se non ci riesco, aggiungo (s) a lista_server_non_vivi
      invio lista_server_vivi al servizio esterno
      invio lista_server_non_vivi al servizio esterno
      mi metto a dormire per 10 minuti
      
that's it!

## servizio raccolta dati
ancora da decidere quale, ma penso che andremo con https://firebase.google.com 

## formato json mandato da una centralina al server
questo json è chiamato status_signal. il formato è:

    {
        "name": [stringa del nome della centralina],
        "ble_servers": [Lista di oggetti ble server, ogni oggetto sensore è costruito così 
            {"id_ble": [stringa di 12 caratteri],
             "reachable": [stringa "yes"/"no"  indica se è stato possibile raggiungere questo sensore. se "no" probabilmente il sensore ha finito la batteria],
             "temperature": [numero floating point con temperatura celsius],
             "humidity_gnd": [numero fp con valore umidità terreno],
             "battery_lvl": [numero percentuale livello batteria, indicativo],
             "humidity_air": [numero fp umidità aria],
             "ph": [numero fp acidità terrenp]
             }
         ],
        "battery_lvl": [numero percentuale livello batteria della centralina]
        "luminosity": [numero fb con luminosità percepita dalla centralina]
    }
    
per fare un esempio:

    { "name": "aabbccddeeff", "ble_servers": [{"id_ble": "112233445566", "reachable": "yes", "temperature": 27.7, "humidity_gnd": 34, "battery_lvl": 40, "humidity_air": 1000, "ph": 2}, {"id_ble": "998877665544", "reachable": "no", "temperature": -1, "humidity_gnd": -1, "battery_lvl": -1, "humidity_air": -1, "ph": -1}], "battery_lvl": 32, "luminosity": 55}
    
in ogni status_signal verranno inviati tutti i ble_server che la centralina conosce, in questo modo è possibile vedere velocemente quali server ble risultano spenti

a quale endpoint va mandato questo json? sono favorevole a fare una POST presso {ortobio.com}/controlunit/{id centralina}/reading


             

