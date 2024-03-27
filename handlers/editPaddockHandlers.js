const oracledb = require("oracledb");
require("dotenv").config();

async function editPaddocksHandler(req, res) {
  let connection;

  const id = parseInt(req.params.id, 10);

  try {
    const {
      paddockName,
      sizeAcres,
      unitCost,
      yearRenovated,
      yearSeeded,
      paddockNumber,
      landOwner,
      imageUrl,
      cropType,
      costType,
    } = req.body;

    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const sql = `
      UPDATE paddocks
      SET
      paddockName = :paddockName,
      sizeAcres = :sizeAcres,
      unitCost = :unitCost,
      yearRenovated = :yearRenovated,
      yearSeeded = :yearSeeded,
      paddockNumber = :paddockNumber,
      landOwner = :landOwner,
      imageUrl = :imageUrl,
      cropType = :cropType,
      costType= :costType
      WHERE id = :id`;

    const binds = {
      paddockName,
      sizeAcres,
      unitCost,
      yearRenovated,
      yearSeeded,
      paddockNumber,
      landOwner,
      imageUrl,
      cropType,
      costType,
      id,
    };

    await connection.execute(sql, binds, { autoCommit: true });

    res.json({ message: "paddock updated successfully" });
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
  editPaddocksHandler,
};
