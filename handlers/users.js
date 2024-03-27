const oracledb = require("oracledb");
require("dotenv").config();

async function UsersHandlers(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(
      `SELECT
        id,
        firstName,
        lastName,
        email,
        password
       FROM Users`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const users = result.rows.map((user) => {
      return {
        id: user.ID,
        firstName: user.FIRSTNAME,
        lastName: user.LASTNAME,
        email: user.EMAIL,
        password: user.PASSWORD,
      };
    });
    res.json({ users });
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
  UsersHandlers,
};
