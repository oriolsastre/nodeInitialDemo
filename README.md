# Sprint 4.2

API que dona suport a un joc de daus. Tires dos daus de 6 cares. Si la suma és igual a 7 guanyes, si no, perds.

## Requeriments

Per a poder provar l'API cal tenir els següents programes instal·lats.

- NodeJS (https://nodejs.org/ca/)
- Servidor MySQL (https://www.mysql.com/)

## Instal·lació

### Descarrega el repositori

Descarrega't aquesta branca (Sprint4_2) al teu ordinador local. Si tens GIT instal·lat, fes-ho amb la següent ordre:

`git clone -b sprint4_2 https://github.com/oriolsastre/nodeInitialDemo --single-branch`

### Configura les variables d'entorn

A la carpeta que t'acabes de descarregar anomenada 'nodeInitialDemo' hi trobaràs un fitxer que es diu ".env-template". Fes-ne una còpia, anomena aquesta còpia ".env" i comepleta els camps de l'interior amb els paràmetres del teu equip. Sobretot configura les credèncials del servidor MySQL que estigui corrent al teu ordinador.

No canviïs el EXPRESS_PORT del 3000 si no és absolutament necessari. Si ho fas, tingues en compte que la col·lecció de Postman que trobaràs adjunta assumeix que l'API està corrent al Port 3000.

### Instal·lar dependències

Ara ja pots instal·lar les dependències necessàries per a l'API executant al terminal l'ordre:

`npm install`

I ja pots iniciar el servidor amb:

`npm start`

## API

Al punt d'entrada (per defecte: localhost:3000) tens una descripció dels endpoint i mètodes disponibles.

### Primers passos
Ja que per accedir als endpoints necessites un token, cal que la primera acció sigui aconseguir aquest token.

Per accedir-lo cal fer una petició POST a l'endpoint `/login`, afegint una Autenticació Bàsica a la capçalera del request amb l'usuari: "Admin" i la contrassenya: "1234".

El token que obtinguis és el que hauràs d'adjuntar a la capçalera de les peticions que facis a tots els altres endpoints.