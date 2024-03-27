const oracledb = require("oracledb");
require("dotenv").config();

async function moveAnimalsHandler(req, res) {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const { animalIds, destinationHerdId } = req.body;

    if (!animalIds || animalIds.length === 0 || !destinationHerdId) {
      return res
        .status(400)
        .json({ message: "Missing animal IDs or destination herd ID." });
    }

    const movePromises = animalIds.map((animalId) => {
      return connection.execute(
        `UPDATE Animals SET herdId = :destinationHerdId WHERE id = :animalId`,
        { destinationHerdId, animalId },
        { autoCommit: false }
      );
    });

    await Promise.all(movePromises);
    await connection.commit();

    res.json({ message: "Animals moved successfully." });
  } catch (err) {
    console.error("Error moving animals:", err);
    await connection.rollback();
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
  moveAnimalsHandler,
};
