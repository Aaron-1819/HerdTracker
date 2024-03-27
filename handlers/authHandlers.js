const oracledb = require('oracledb');
require('dotenv').config();

async function loginUser(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const { email, password } = req.body;

    const result = await connection.execute(
      `SELECT id FROM users WHERE email = :email AND password = :password`,
      [email, password], 
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

  
    if (result.rows.length > 0) {

      res.json({ message: 'Login successful', userId: result.rows[0].ID });
    } else {

      res.status(401).json({ message: 'Login failed. Email or password is incorrect.' });
    }
  } catch (err) {
    console.error("Error:", err);

    res.status(500).json({ message: 'Internal server error' });
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
  loginUser
};
