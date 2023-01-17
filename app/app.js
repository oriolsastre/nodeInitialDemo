const express = require('express')
const { port } = require('./config/config')
const { designDB } = require('./utils/designDB')
const { pageNotFound } = require('./controllers/errorHandler')

designDB();
const app = express()
app.use(express.json())

app.use('/', require('./routes'))

app.get('/', (req, res) => {
  res.json({
    api: "API rest Sprint4_2.",
    description: "API que dona suport a un joc de daus. Tires dos daus de 6 cares. Si la suma és igual a 7 guanyes, si no perds.",
    credentials: "Per a accedir als endpoints necessitaràs un token que obtindràs a l'endpoint /login, usant una Basic Authentication amb Usuari: 'Admin' i Contrassenya '1234'.",
    endpoints: {
      "/players": {
        methods: {
          GET: {
            description: "Retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.",
            input: null,
            output: "Array amb els jugadors inscrits i el percentatge d'èxit."
          }, POST: {
            description: "Crear un jugador/a.",
            input: {
              description: "Enviar un JSON al body que contingui els camps 'name', 'email' i 'password' com el de l'exemple.",
              example: {
                name: "[nom del jugador]",
                email: "[email del jugador]",
                password: "[password]"
              }, restrictions: {
                name: "Ha de ser únic. Si és null se t'anomenarà ANÒNIM. S'eliminen els espais en blanc.",
                email: "Necessari. Ha de ser únic.",
                password: "Necessari."
              }
            }, output: "Dades del jugador creat."
          }, "PUT /:{id}": {
            description: "Modifica el nom del jugador/a.",
            input: {
              description: "Enviar un JSON al body amb un camp 'name' que contingui el nou nom a modificar",
              example: {
                name: "[Nou nom del jugador]"
              }, restrictions: "El servidor t'avisarà si el nou nom està disponible."
            }, output: "La id del jugador i el nou nom."
          }
        }
      }, "/games": {
        methods: {
          "GET /:{id}": {
            description: "Retorna el llistat de jugades per un jugador/a.",
            input: null,
            output: "Array amb totes les tirades del jugador indicat. Conté el valor de cada dau i de si era victòria o derrota."
          }, "POST /:{id}": {
            description: "Un jugador/a específic realitza una tirada.",
            input: null,
            output: "Tirada del jugador amb els valors de cada dau i si es victòria o no."
          }, "DELETE /:{id}": {
            description: "Elimina les tirades del jugador/a.",
            input: null,
            output: "Missatge d'èxit en la petició."
          }
        }
      }, "/ranking": {
        methods: {
          GET: {
            description: "Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.",
            input: null
          }, "GET /loser": {
            description: "Retorna el jugador/a amb pitjor percentatge d’èxit.",
            input: null
          }, "GET /winner": {
            description: "Retorna el jugador/a amb millor percentatge d’èxit.",
            input: null
          }
        }
      }, "/login": {
        methods: {
          POST: {
            description: "Identifica't com a administrador per a obtenir un token i poder accedir als endpoints anteriors. Les credencials són Usuari: 'Admin', Contrassenya: '1234'",
            input: "Basic Authentication amb l'usuari i contrassenya 'Admin', '1234'.",
            output: "Token per a accedir als endpoints anteriors."
          }
        }
      }
    }
  })
})

app.use(pageNotFound)

app.listen(port, () => {
    console.log(`Servidor corrent al port ${port}`)
})