const oracledb = require("oracledb");
require("dotenv").config();

async function deleteHerdHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const id = parseInt(req.params.id, 10);

    const checkResult = await connection.execute(
      `SELECT COUNT(*) AS animal_count FROM Animals WHERE herdId = :id`,
      [id]
    );

    if (checkResult.rows[0][0] > 0) {
      return res.status(400).json({
        message:
          "Cannot delete herd because it has associated animals. Please move or delete the animals before attempting to delete the herd.",
      });
    }

    const deleteResult = await connection.execute(
      `DELETE FROM Herds WHERE id = :id`,
      [id],
      { autoCommit: true }
    );

    if (deleteResult.rowsAffected === 0) {
      res.status(404).json({ message: "Herd not found" });
    } else {
      res.json({ message: "Herd deleted successfully" });
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

module.exports = {
  deleteHerdHandler,
};
