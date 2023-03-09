# GESTOR DE TASQUES

## Requeriments

Cal tenir NodeJS instal·lat (https://nodejs.org/ca/)

## Instal·lació

Descarrega't localment aquesta branca `development` del repositori. Si tens GIT instal·lat pots fer-ho des d'una consola amb l'ordre:

    git clone -b development https://github.com/oriolsastre/nodeInitialDemo --single-branch

Des de la mateixa consola, sitaut al directori que t'acabes de descarregar, exectua l'ordre:

    npm install

per instal·lar les dependències necessàries. Per a aquest projecte és especialment important l'`inquirer` per a poder interactuar amb la consola.

Un cop instal·lades podem iniciar el programa amb l'ordre:

    npm start

## Funcionament

Es demana el nom de l'usuari. Això permet veure quin usuari ha creat cada tasca. Si no s'introdueix res, el nom d'usuari per defecte es "`Anònim/a`".

Es demana al usuari quina persistència vol utilitzar. De moment, l'única opció es usar un JSON, però l'arquitectura de l'aplicació permet afegir una altra opció, com podrien ser Mongo o MySQl, per a desar les dades més endavant usant aquests altres sistemes com a persistència.

Des del menú principal es pot accedir a totes les accions del programa. En primer lloc, es pot crear tasques. L'usuari ha de posar el nom de la tasca, i el programa el guarda amb un timestamp i el nom de l'usuari que l'ha creada. Una altra opcions és veure totes les tasques desades, també filtrades per "iniciades" o "completades". El menú també permet fer modificacions a les tasques desades, ja sigui marcant-les com a iniciades, com a fetes o canviant-li el nom. Finalment, hi ha una opció per eliminar tasques.

Al final de cada operació, l'usuari veu un missatge informant-li que operació s'ha fet amb èxit. Desrpès, necessitarà premer "Enter" per tornar al menú principal.