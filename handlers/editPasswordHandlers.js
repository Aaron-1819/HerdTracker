const oracledb = require("oracledb");
require("dotenv").config();

async function editPasswordHandler(req, res) {
  let connection;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const sql = `
      UPDATE users
      SET
        password = :password
      WHERE email = :email`;

    const binds = {
      email,
      password,
    };

    const result = await connection.execute(sql, binds, { autoCommit: true });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password updated successfully" });
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

module.exports = {
  editPasswordHandler,
};
