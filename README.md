# Sprint 4.1

Descarregar el repositori. Obrir un terminal localitzat a la carpeta del repositori. Primer de tot cal instal·lar les dependències necessàries amb l'ordre:

    npm install

I ara podrem iniciar el servidor amb l'API amb l'ordre:

    npm start

Obrim un navegador com el Firefox i el Chrome i anem a l'adreça: localhost:3000

Alternativament, si fos necessari, es pot canviar el port amb variables d'entorn. Només cal afegir un fitxer anomenat _.env_ a la carpeta base i definir el port d'entrada d'express "EXPRESS_PORT=####" i el port desitjat. Per defecte es tria el 3000. Es pot seguir l'estructura del fitxer _.env-template_ com a referència.

Tenir en compte que la col·lecció de Postman per a provar els endpoints utilitza el port 3000.

## API

### GET /user

Retorna un JSON amb el nom, edat i URL des d'on es fa la petició.

### POST /upload

Pujar una imatge al sevidor. El fitxer va al body amb la clau "_fitxer_". Formats acceptats són _jpg_, _png_ i _gif_.

### POST /time

És necessària una autenticació bàsica amb un usuari i contrassenya. L'usuari i contrassenya que s'han d'usar són "Admin" i "1234" respectivament. En cas que sigui correcte es reb de resposta un JSON amb la data i hora actuals.

S'afageix la capçalera _"Cache-control: no-cache"_ i s'habilita _CORS_.

### GET /pokemon/{id}

En cas d'enviar una id vàlida, és a dir un nombre enter, es retorna les dades de nom, alçada i pes del pokémon en qüestió.

L'alçada és en decímetres i el pes en hectograms.