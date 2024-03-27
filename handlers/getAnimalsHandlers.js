const oracledb = require("oracledb");
require("dotenv").config();

async function getAnimalsHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const herdId = req.params.id;
    if (!herdId) {
      return res.status(400).json({ message: "Herd ID is required." });
    }

    const result = await connection.execute(
      `SELECT id, tagNumber FROM Animals WHERE herdId = :herdId`,
      { herdId }
    );

    res.json({
      animals: result.rows.map((row) => ({ id: row[0], tagNumber: row[1] })),
    });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ message: "Error fetching animals" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
module.exports = { getAnimalsHandler };
