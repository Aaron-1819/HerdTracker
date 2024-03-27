const oracledb = require("oracledb");
require("dotenv").config();

async function changePasswordHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const { email, password } = req.body;
    const sql = `
      UPDATE users
      SET password = :password
      WHERE email = :email`;
    const bindVars = {
      email,
      password,
    };

    const result = await connection.execute(sql, bindVars, {
      autoCommit: true,
    });
    if (result.rowsAffected === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "Password changed successfully" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
