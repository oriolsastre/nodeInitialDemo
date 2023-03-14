# BACKEND

## Dependències

El servidor de back usa les següents dependències:

- `express` Per aixecar el servidor.
- `dotenv` Per gestionar les variables d'entorn.
- `cors` Per habilitar CORS amb el servidor client.
- `bcryptjs` Per encriptar les contrassenyes dels usuaris.
- `jsonwebtoke` Per generar els tokens de validació dels usuaris.
- `mysql2` Per connectar amb el servidor MySQL
- `sequelieze` ORM per interactuar amb les bases de dades del servidor MySQL
- `socket.io` Per establir i mantenir les connexions a temps real amb el servidor client que permeten el xat.

## Arquitectura

El servidor usa un Model Vista Controlador (MVC) i està separat de la següent manera:

* __Config__ Configuració de les varibles d'entorn.
* __Controller__ Controladors que interactuen amb els models.
* __Database__ Inicialització i connexió amb la base de dades.
* __Helpers__
* __Middlewares__  Middlewares d'autentificació i validació.
* __Models__
* __Routes__ Rutes de l'API
* __Sockets__ Lògica dels sockets que interactuen amb el servidor client.

## API

L'API gestiona el xat en quant a funcions CRUD d'usuaris, sales on xatejar, i els missatges que s'envien al xat.

Tots els endpoints de l'API retornen una resposta JSON amb la següent estructura:

```javascript
{
    status: Integer ["http status code"],
    error: null|{message: String} ["Missatge d'error"],
    message: null|String, ["Missatge descriptiu de la resposta"] 
    data: null|Array|Object
}
```

### Endpoints

En aquest mateix director hi ha una col·lecció de POSTMAN (_Xat.postman_collection.json_) per testejar els següents endpoints:

* /api/login
    * POST login
    
        Enpoint que permet l'inici de sessió comprovant que l'usuari existeix i que les credencials són vàlides.

        Body del request:
        ```javascript
        {
            user: String [required],
            pswd: String [required]
        }
        ```
        Response:
        ```javascript
        {
            status: 200,
            error: null,
            message: "Login OK",
            data: {
                name: String,
                id: Integer,
                token: JSONwebtoken
            }
        }
        ```
        El token de resposta s'usarà en els endpoints room i message. 
* /api/user
    * GET user/{user}

        Donat un nom d'usuari comprova si ja existeix. Per exemple, per al formulari d'inscripció del front que emeti un avís que aquell nom d'usuari no està disponible.

        Response:
        ```javascript
        {
            status: 200,
            error: null,
            message: null,
            data: {
                name: String|null
            }
        }
        ```
    * POST user

        Crea un nou usuari.

        Body del request:
        ```javascript
        {
            user: String [required],
            pswd: String [required]
        }
        ```
        El user només pot contenir caràcters alfanumèrics (a-zA-Z0-9) i ha de tenir menys de 20 caràcters.

        Response:
        ```javascript
        {
            status: 201,
            error: null,
            message: "New user created",
            data: {
                id: Integer,
                name: String,
            }
        }
* /api/room
    
    Tots els mètodes d'aquest enpoint requereixen el token obtingut en el login.
    
    Header del request:
    ```javascript
    {
        ...,
        authorization: "Bearer "+token [required]
    }
    ```
    * GET room

        Obté totes les sales del xat.

        Response:
        ```javascript
        {
            status: 200,
            error: null,
            message: null,
            data: [ {
                id: Integer,
                name: String,
                createdAt: timestamp,
                updatedAt: timestamp
            }]
        }
        ```
    * POST room

        Crea una nova sala al xat donat un nom.

        Body del request:
        ```javascript
        {
            name: String [required],
        }
        ```
        No pot existir cap altra sala amb el mateix nom i el nom de la sala només pot contenir caràcters alfanumèrics i una llargada màxima de 10. Els espais en blanc són eliminats.

        Response:
        ```javascript
        {
            status: 201,
            error: null,
            message: "New room created",
            data: {
                name: String
            }
        }
        ```
* /api/message

    Tots els mètodes d'aquest enpoint requereixen el token obtingut en el login.
    
    Header del request:
    ```javascript
    {
        ...,
        authorization: "Bearer "+token [required]
    }
    ```
    * GET message/{room}

        Obté els missatges que s'han publicat a la sala especificada. Se n'obtenen un màxim de 20. `room` ha de ser una ID vàlida d'una sala del xat.

        Body al request:
        ```javascript
        {
            limit: Integer [not required]
        }
        ```
        Si no s'especifica un limit al body, se n'obtindran 20.

        Response:
        ```javascript
        {
            status: 200,
            error: null,
            message: "Messages fetched",
            data: [{
                id: Integer,
                message: String,
                room: Integer,
                user: Integer,
                User.name: String,
                createdAt: timestamp,
                updatedAt: timestamp
            }]
        }
        ```
    * GET message/{room}/before/{timestamp}

        Obté els missatges que s'han publicat a la sala especificada anteriors a la marca de temps donada. Se n'obtenen 20. `room` ha de ser una ID vàlida d'una sala de xat.

        Response:
        ```javascript
        {
            status: 200,
            error: null,
            message: "Messages fetched",
            data: [{
                id: Integer,
                message: String,
                room: Integer,
                user: Integer,
                User.name: String,
                createdAt: timestamp,
                updatedAt: timestamp
            }]
        }
        ```
    * POST message/{room}/{user}
        
        Un usuari publica un missatge a una sala. `room` i `user` han de ser ID vàlides d'un usuari i sala corresponent.

        Body del request:
        ```javascript
        {
            message: String [required]
        }
        ```
        Response:
        ```javascript
        {
            status: 201,
            error: null,
            message: "Messages created",
            data: {
                id: Integer,
                user: Integer,
                room: Integer,
                message: String
            }
        }
        ```