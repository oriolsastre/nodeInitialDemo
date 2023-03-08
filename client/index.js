require("dotenv").config({ path: __dirname + "/./../.env" });
const path = require("path");
const express = require("express");

const clientConfig = {
  host: process.env.CLIENT_HOST,
  port: process.env.CLIENT_PORT,
};
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get('*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'public', 'NotFound.html' ) );
} );

app.listen(clientConfig, () => {
  console.log(`Client listening on ${clientConfig.host}:${clientConfig.port}`);
});