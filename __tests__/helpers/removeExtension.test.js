const {removeExtension} = require('../../app/helpers/removeExtension')

test("Retorna correctament el nom del fitxer sense l'extensió", () => {
    expect(removeExtension("index.js")).toBe("index")
    expect(removeExtension("fotografia.png")).toBe("fotografia")
})