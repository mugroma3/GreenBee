# BioOrtoStar

## bluetooth low energy nell'orto

[android ble](https://developer.android.com/guide/topics/connectivity/bluetooth-le.html) ⬱ guida per capirci qualcosa di Bluetooth Low Energy (ble) nel contesto di android - ma i concetti sono generali.

Nel ble ci sono 2 attori: il server e il client.

Il server è il device a cui si connette un client, ed espone vari servizi che il client può leggere (e scrivere)
Nel nostro caso il server è l'apparecchietto ble responsabile di leggere vari dati del suolo, e il client è l'apparecchio che legge questi dati dal server, e li trasmette online ad un qualche servizio (di questo ne discuteremo dopo)

il server è identificato da un indirizzo di 6 byte (di solito scritto come 6 coppie di valori esadecimali divisi da due punti, per es: aa:bb:cc:dd:ee:ff), e le caratteristiche (il nome tecnico è ATT, sono gli endpoint che il server fornisce per leggerne i dati) sono uuid di 128 bit. per il nostro scopo ogni server ha un payload leggibile di 20 byte, che contiene tra l'altro la temperatura, il livello batteria, l'umidità, e un altro paio di valori che ancora non sono stati decisi.

Il client ha una lista di server, e per ogni serve l'uuid della caratteristica che deve leggere. l'algoritmo è abbastanza semplice:

    Ogni 10 minuti:
      mi sveglio
      init di lista_server_vivi e lista_server_non_vivi
      per ogni server s che conosco
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
