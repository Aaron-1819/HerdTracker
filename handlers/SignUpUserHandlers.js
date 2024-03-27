const oracledb = require('oracledb');
require('dotenv').config();

async function registerUser(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const { firstName, lastName, email, password } = req.body;
    const sql = `
      INSERT INTO users (firstName, lastName, email, password) 
      VALUES (:firstName, :lastName, :email, :password) 
      RETURNING id INTO :id`;
    const bindVars = {
      firstName,
      lastName,
      email,
      password,
      id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    };

    const result = await connection.execute(sql, bindVars, { autoCommit: true });
    const userId = result.outBinds.id[0];

    res.json({ message: 'User registered successfully', userId: userId });
  } catch (err) {
    console.error("Error:", err);
   
    if (err.errorNum === 1) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Failed to register user' });
    }
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
  registerUser
};
