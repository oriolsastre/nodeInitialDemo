# Sprint 5 - Chat

Xat usant _[socket.io](https://socket.io/)_ separant el client i back-end en dos servidors diferents.

## Requeriments

Per a poder usar el xat cal tenir instal·lat a l'ordinador:

* NodeJS (https://nodejs.org/ca/)
* Servidor MySQL (https://www.mysql.com/)

O bé

* Docker (https://www.docker.com/)

## Descarrega el repositori

Descarrega't aquesta branca _sprint5_ del repositori al teu ordinador local. Si tens GIT instal·lat ho pots fer des d'un terminal amb l'ordre

    git clone -b sprint5 https://github.com/oriolsastre/nodeInitialDemo --single-branch

## Instal·lació amb Docker

Obre una terminal a la carpeta que t'acabes de descarregar i executa l'ordre:

    docker compose up

Assegura't que els ports 3000, 5000 i sobretot 3306 no estiguin ocupats. El 3306 és el que usa MySQL per defecte i si el tens instal·lat a l'ordinador podria estar ocupat. Atura el servei de MySQL que tinguis corrents, si és el cas, abans d'iniciar el xat usant Docker.

Qualsevol canvi a les variables d'entorn que consideris necessari l'hauràs de fer al fitxer `docker-compose.yml` que trobaràs a la carpeta arrel.

## Instal·lació estàndard

### Configura les variables d'entorn

A la carpeta que t'acabes de descarregar hi trobaràs un fitxer anomenat "_.env-template_". Fes-ne una còpia, anomena-la "_.env_" i completa els camps de l'interior que pertanyin al teu sistema. Sobretot configura les credencials del teu servidor MySQL.

Els valors del port i host tant del client com del server (fa referència al backend) no els hauries de canviar si no és absolutament necessari. En cas de canviar algun valor, tenir en compte que potser s'ha de canviar també en alguna part tant del servidor client (per connectar amb l'API del back) com al backend (per habilitar CORS).

_CHAT-ADMIN-PSWD_ fa referència a la contrassenya que tindrà l'usuari Admin que es crea per defecte en iniciar el xat. Triar a lliure per disposició. Per defecte o absència serà '1234'.

_JWT-SECRET_ triar lliurement. S'usa en generar els JWT que es fan servir per a l'autentificació.

### Instal·lar dependències

Per instal·lar les dependències cal instal·lar tant les del client com les del backend. Des d'un terminal en situem a la carpeta _client_ i _server_ i executem, respectivament, l'ordre

    npm install


Un cop instal·lades, per separat també, aixecarem els dos servidors executant respectivament l'ordre.

    npm start

Per la consola del client veurem en quina direcció està el servidor i ens hi podrem connectar des d'un navegador.

## Característiques

Xan on xatejar amb altres usuaris. Es poden crear sales adicionals on mantenir-hi converses. En tot moment pots veure qui està connectat al xat. També s'anuncia sí un usuari entra o surt del xat, o si entra o surt de la sala on ets. A més, pots veure en quina sala tens missatges nour per llegir (per sessió).

## BACKEND

Per a més informació sobre el servidor de backend mira: [SERVER README](./server/README.md)

## FRONTEND

Per a més informació sobre el servidor de front mira: [CLIENT README](./client/README.md)