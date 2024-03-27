const oracledb = require("oracledb");
require("dotenv").config();

async function addSingleAnimalHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const { herdId, dateOfBirth, tagNumber, cattleClass, status, comments } =
      req.body;

    const insertQuery = `
      INSERT INTO Animals (herdId, dateOfBirth, tagNumber, cattleClass, status, comments)
      VALUES (:herdId, TO_DATE(:dateOfBirth, 'YYYY-MM-DD'), :tagNumber, :cattleClass, :status, :comments)
      RETURNING id INTO :id`;

    const result = await connection.execute(
      insertQuery,
      {
        herdId,
        dateOfBirth,
        tagNumber,
        cattleClass,
        status,
        comments,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );

    const newAnimalId = result.outBinds.id[0];

    res.json({
      message: "Animal added successfully",
      animalId: newAnimalId,
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
  addSingleAnimalHandler,
};
