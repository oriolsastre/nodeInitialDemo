require("dotenv").config({ path: __dirname + "/./../../.env" });

const serverConfig = {
  host: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT || 3000,
};

const clientConfig = {
  host: process.env.CLIENT_HOST || "localhost",
  port: process.env.CLIENT_PORT || 5000,
};

const mysqlConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD || null,
  name: process.env.MYSQL_NAME || "chat",
};

const chatAdminPswd = process.env.CHAT_ADMIN_PSWD || 1234;

const JWT_Secret = process.env.JWT_SECRET || 'chatOSR'

module.exports = { serverConfig, clientConfig, mysqlConfig, chatAdminPswd, JWT_Secret };