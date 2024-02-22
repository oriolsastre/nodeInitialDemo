const express = require('express')
const { port, dbLang } = require('./config/config')
const { designDB } = require('./utils/designDB')
const { pageNotFound } = require('./controllers/errorHandler');

designDB(dbLang)
const app = express()
app.use(express.json())

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.json({
    api: "API rest Sprint4_2.",
    description: "API que dona suport a un joc de daus. Tires dos daus de 6 cares. Si la suma és igual a 7 guanyes, si no, perds.",
    credentials: "Per a accedir als endpoints necessitaràs un token que obtindràs a l'endpoint /login, usant una Basic Authentication amb Usuari: 'Admin' i la contrassenya que hagis triat al fitxer .env.",
    endpoints: {
      "/players": {
        methods: {
          GET: {
            description: "Retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.",
            request: null,
            response: "Array amb els jugadors inscrits i el percentatge d'èxit."
          }, POST: {
            description: "Crear un jugador/a.",
            request: {
              description: "Enviar un JSON al body que contingui els camps 'name' i 'password' com el de l'exemple.",
              example: {
                name: "[nom del jugador]",
                password: "[password].",
                level: "1"
              }, restrictions: {
                name: "Ha de ser únic. Si és null se t'anomenarà ANÒNIM. S'eliminen els espais en blanc i els caràcters ':'.",
                password: "No és necessari. Pot ser null.",
                level: "Per defecte 1. Si és 0 aquell jugador també té rol d'administrador, volent dir, pot obtenir un token a l'enpoint login si es valida amb les seves credencials. Per a ser level 0, però, els camps `name` i `password` del jugador no poden ser null ni buits."
              }
            }, response: "Dades del jugador creat."
          }, "PUT /:{id}": {
            description: "Modifica el nom del jugador/a.",
            request: {
              description: "Enviar un JSON al body amb un camp 'name' que contingui el nou nom a modificar",
              example: {
                name: "[Nou nom del jugador]"
              }, restrictions: "El servidor t'avisarà si el nou nom està disponible."
            }, response: "La id del jugador i el nou nom."
          }
        }
      }, "/games": {
        methods: {
          "GET /:{id}": {
            description: "Retorna el llistat de jugades per un jugador/a.",
            request: null,
            response: "Array amb totes les tirades del jugador indicat. Conté el valor de cada dau i de si era victòria o derrota."
          }, "POST /:{id}": {
            description: "Un jugador/a específic realitza una tirada.",
            request: null,
            response: "Tirada del jugador amb els valors de cada dau i si es victòria o no."
          }, "DELETE /:{id}": {
            description: "Elimina les tirades del jugador/a.",
            request: null,
            response: "Missatge d'èxit en la petició."
          }
        }
      }, "/ranking": {
        methods: {
          GET: {
            description: "Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.",
            request: null
          }, "GET /loser": {
            description: "Retorna el jugador/a amb pitjor percentatge d’èxit. Cal que hagi jugat alguna partida.",
            request: null
          }, "GET /winner": {
            description: "Retorna el jugador/a amb millor percentatge d’èxit. Cal que hagi jugat alguna partida.",
            request: null
          }
        }
      }, "/login": {
        methods: {
          POST: {
            description: "Identifica't com a administrador per a obtenir un token i poder accedir als endpoints anteriors. Les credencials són Usuari: 'Admin' i la contrassenya que hagis triat al fitxer .env.",
            request: "Basic Authentication amb l'usuari i contrassenya 'Admin', p.e. '1234'. També s'hi poden identificar aquells jugadors que tinguin un paràmetre `level: 0`",
            response: "Token per a accedir als endpoints anteriors."
          }
        }
      }
    }
  })
})

app.use(pageNotFound)

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port} usant ${dbLang}`)
})