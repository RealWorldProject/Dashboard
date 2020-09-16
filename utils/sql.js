const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "",
	username: "",
	database: "node",
	password: "",
	port: 3306,
});

module.exports = pool.promise();
