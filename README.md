# Sprint 5 - Chat

Xat usant _[socket.io](https://socket.io/)_ separant el client i back-end en dos servidors diferents.

## Requeriments

Per a poder usar el xat cal tenir instal·lat a l'ordinador:

* NodeJS (https://nodejs.org/ca/)
* Servidor MySQL (https://www.mysql.com/)

## Instal·lació

### Descarrega el repositori

Descarrega't aquesta branca _sprint5_ del repositori al teu ordinador local. Si tens GIT instal·lat ho pots fer des d'un terminal amb l'ordre

    git clone -b sprint5 https://github.com/oriolsastre/nodeInitialDemo --single-branch

### Configura les variables d'entorn

A la carpeta que t'acabes de descarregar hi trobaràs un fitxer anomenat "_.env-template_". Fes-ne una còpia, anomena-la "_.env_" i completa els camps de l'interior que pertanyin al teu sistema. Sobretot configura les credencials del teu servidor MySQL.

Els valors del port i host tant del client com del server (fa referència al backend) no els hauries de canviar si no és absolutament necessari. En cas de canviar algun valor, tenir en compte que potser s'ha de canviar també en alguna part del servidor client.

_CHAT-ADMIN-PSWD_ fa referència a la contrassenya que tindrà l'usuari Admin que es crea per defecte en iniciar el xat. Triar a lliure per disposició. Per defecte o absència serà '1234'.

_JWT-SECRET_ triar lliurement. S'usa en generar els JWT que es fan servir per a l'autentificació.

### Instal·lar dependències

Per instal·lar les dependències cal instal·lar tant les del client com les del backend. Des d'un terminal en situem a la carpeta _client_ i _server_ i executem, respectivament, l'ordre

    npm install


Un cop instal·lades, per separat també, aixecarem els dos servidors executant respectivament l'ordre.

    npm start

Per la consola del client veurem en quina direcció està el servidor i ens hi podrem connectar des d'un navegador.


## TO DO


## Coses a tenir en compte?
https://stackoverflow.com/questions/3391242/should-i-hash-the-password-before-sending-it-to-the-server-side
https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs