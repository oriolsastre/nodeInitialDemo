require("dotenv").config()

const port = process.env.EXPRESS_PORT || 3000;

module.exports = { port }