const oracledb = require("oracledb");
require("dotenv").config();

async function editHerdHandler(req, res) {
  let connection;

  const id = parseInt(req.params.id, 10);

  try {
    const {
      herdName,
      landOwner,
      paddockNumber,
      cattleClass,
      headSize,
      auValue,
      herdStatus,
      comments,
      dateEntered,
      exitDate,
    } = req.body;

    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const sql = `
      UPDATE Herds
      SET
        herdName = :herdName,
        landOwner = :landOwner,
        paddockNumber = :paddockNumber,
        cattleClass = :cattleClass,
        headSize = :headSize,
        auValue = :auValue,
        herdStatus = :herdStatus,
        comments = :comments,
        dateEntered = TO_DATE(:dateEntered, 'YYYY-MM-DD'),
        exitDate = TO_DATE(:exitDate, 'YYYY-MM-DD')
      WHERE id = :id`;

    const binds = {
      herdName,
      landOwner,
      paddockNumber,
      cattleClass,
      headSize,
      auValue,
      herdStatus,
      comments,
      dateEntered,
      exitDate,
      id,
    };

    await connection.execute(sql, binds, { autoCommit: true });

    res.json({ message: "Herd updated successfully" });
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
  editHerdHandler,
};
