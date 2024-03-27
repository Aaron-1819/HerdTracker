const oracledb = require("oracledb");
require("dotenv").config();

async function editEmailHandler(req, res) {
  let connection;
  const { email, newEmail, password, id } = req.body;
  console.log("Received request body:", req.body);

  if (!newEmail) {
    return res
      .status(400)
      .json({ message: "New email and password are required$" });
  }

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    const sql = `
      UPDATE users
      SET email = :newEmail
      WHERE id = :id`;

    const binds = { newEmail, id };
    const result = await connection.execute(sql, binds, { autoCommit: true });

    console.log(`Update result: ${result.rowsAffected} rows affected.`);

    if (result.rowsAffected === 0) {
      return res
        .status(404)
        .json({ message: "User not found or email unchanged" });
    }

    return res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error("Error during database operation:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

module.exports = { editEmailHandler };
