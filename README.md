GESTOR DE TASQUES

Utilitizar el comando "npm i" per instalar les dependències i "npm start" per executar el programa. A partir d'aquest moment, es podrà introduïr totes les dades a travès d'un inquirer a la consola.

Es demana el nom de l'usuari. Això permet veure quin usuari ha creat cada tasca. Si no s'introdueix res, el nom d'usuari per defecte es "Anònim/a".

Es demana al usuari quina persistència vol utilitzar. De moment, l'única opció es usar un JSON, però l'arquitectura de l'aplicació permet afegir una altra opció per a desar les dades més endavant.

Des del menú principal es pot accedir a totes les accions del programa. En primer lloc, es pot crear tasques. L'usuari ha de posar el nom de la tasca, i el programa el guarda amb un timestamp i el nom de l'usuari que l'ha creada. Una altra opcions és veure totes les tasques desades, també filtrades per "iniciades" o "completades". El menú també permet fer modificacions a les tasques desades, ja sigui marcant-les com a iniciades, com a fetes o canviant-li el nom. Finalment, hi ha una opció per eliminar tasques.

Al final de cada operació, l'usuari veu un missatge informant-li que operació s'ha fet amb èxit. Desrpès, necessitarà premer "Enter" per tornar al menú principal.