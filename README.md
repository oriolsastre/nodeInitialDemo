# Sprint 4.1

Descarregar el repositori. Obrir un terminal localitzat a la carpeta del repositori. Primer de tot cal instal·lar les dependències necessàries amb l'ordre:

    npm install

I ara podrem iniciar el servidor amb l'API amb l'ordre:

    npm start

Obrim un navegador com el Firefox i el Chrom i anem a l'adreça: localhost:3000

Alternativament, si fos necessari, es pot canviar el port amb variables d'entorn. Només cal afegir un fitxer anomenat _.env_ a la carpeta base i definir el port d'entrada d'express "EXPRESS_PORT=####" i el port desitjat. Per defecte es tria el 3000. Es pot seguir l'estructura del fitxer _.env-template_ com a referència.

Tenir en compte que la col·lecció de Postman per a provar els endpoints utilitza el Port 3000.


<!-- ### Oriol Sastre


Cal treure ejs suposo per a 4.1
  ```
  git revert --hard 5b914e14c3da1329d8c68b0317f799e45cac31d8
  git push --force
  ```

Això per restaurar la branca main del nodeInitialDemo. No ho hauria de fer servir en general.
-->