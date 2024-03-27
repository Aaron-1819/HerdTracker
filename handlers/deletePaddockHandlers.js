const oracledb = require('oracledb');
require('dotenv').config();

async function deletePaddockHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const id = parseInt(req.params.id, 10); 

    console.log('Deleting paddock with id:', id); 
    const result = await connection.execute(
      `DELETE FROM paddocks WHERE id = :id`,
      [id], 
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      res.status(404).json({ message: 'paddock not found' });
    } else {
      res.json({ message: 'paddock deleted successfully' });
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
    deletePaddockHandler
};
