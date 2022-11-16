const Sequelize = require("sequelize");

require("dotenv").config();

// create connection to our db (Postgres)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER_POSTGRES,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
      }
    );

sequelize
.authenticate()
.then(
  () => console.log("----- Connection has been established successfully -----"),
  () => console.log("----- Unable to connect to the database -----")
)
.catch((err) => console.log(`----- Error: ${err}`));

module.exports = sequelize;
