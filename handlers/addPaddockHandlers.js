const oracledb = require("oracledb");
require("dotenv").config();

async function addPaddockHandler(req, res) {
  console.log(req.body);
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const {
      paddockName,
      paddockNumber,
      sizeAcres,
      landOwner,
      costType,
      unitCost,
      cropType,
      yearSeeded,
      yearRenovated,
      imageUrl,
    } = req.body;

    const result = await connection.execute(
      `INSERT INTO Paddocks (
                paddockName, paddockNumber, sizeAcres, landOwner, costType,
                unitCost, cropType, yearSeeded, yearRenovated, imageUrl
            ) VALUES (
                :paddockName, :paddockNumber, :sizeAcres, :landOwner, :costType,
                :unitCost, :cropType, :yearSeeded, :yearRenovated, :imageUrl
            ) RETURNING id INTO :id`,
      {
        paddockName,
        paddockNumber,
        sizeAcres,
        landOwner,
        costType,
        unitCost,
        cropType,
        yearSeeded,
        yearRenovated,
        imageUrl,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );

    const insertedId = result.outBinds.id[0];

    res.json({ message: "Paddock added successfully", paddockId: insertedId });
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
  addPaddockHandler,
};
