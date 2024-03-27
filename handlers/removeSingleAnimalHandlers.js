const oracledb = require("oracledb");
require("dotenv").config();

async function removeSingleAnimalHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const id = parseInt(req.params.id, 10);
    console.log("Deleting animal with id:", id);
    const result = await connection.execute(
      `DELETE FROM Animals WHERE id = :id`,
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Animal not found." });
    }

    res.json({
      message: "Animal removed successfully",
      id: id,
    });
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
  removeSingleAnimalHandler,
};
