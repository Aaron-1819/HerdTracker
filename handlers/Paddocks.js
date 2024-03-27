const oracledb = require("oracledb");
require("dotenv").config();

async function PaddocksHandlers(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(
      `SELECT
        id,
        paddockName,
        paddockNumber,
        sizeAcres,
        landOwner,
        costType,
        unitCost,
        cropType,
        yearSeeded,
        yearRenovated,
        imageUrl
       FROM Paddocks`,
      [], // No bind parameters
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const paddocks = result.rows.map((paddock) => {
      return {
        id: paddock.ID,
        paddockName: paddock.PADDOCKNAME,
        paddockNumber: paddock.PADDOCKNUMBER,
        sizeAcres: paddock.SIZEACRES,
        landOwner: paddock.LANDOWNER,
        costType: paddock.COSTTYPE,
        unitCost: paddock.UNITCOST,
        cropType: paddock.CROPTYPE,
        yearSeeded: paddock.YEARSEEDED,
        yearRenovated: paddock.YEARRENOVATED,
        imageUrl: paddock.IMAGEURL,
      };
    });
    res.json({ paddocks });
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
  PaddocksHandlers,
};
