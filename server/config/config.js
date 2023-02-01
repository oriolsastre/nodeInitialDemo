require("dotenv").config({ path: __dirname + "/./../../.env" });

const serverConfig = {
  host: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT || 3000,
};
const mysqlConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  name: process.env.MYSQL_NAME || "chat",
};

module.exports = { serverConfig, mysqlConfig };
