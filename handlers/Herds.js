const oracledb = require("oracledb");
require("dotenv").config();

async function HerdsHandlers(req, res) {
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
        herdName,
        landOwner,
        paddockNumber,
        cattleClass,
        headSize,
        herdStatus,
        auValue,
        comments,
        TO_CHAR(dateEntered, 'YYYY-MM-DD') AS dateEntered,
        TO_CHAR(exitDate, 'YYYY-MM-DD') AS exitDate,
        differenceInDays,
        imageUrl
       FROM Herds`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const herds = result.rows.map((herd) => {
      return {
        id: herd.ID,
        herdName: herd.HERDNAME,
        landOwner: herd.LANDOWNER,
        paddockNumber: herd.PADDOCKNUMBER,
        cattleClass: herd.CATTLECLASS,
        headSize: herd.HEADSIZE,
        herdStatus: herd.HERDSTATUS,
        auValue: herd.AUVALUE,
        comments: herd.COMMENTS,
        dateEntered: herd.DATEENTERED,
        exitDate: herd.EXITDATE,
        differenceInDays: herd.DIFFERENCEINDAYS,
        imageUrl: herd.IMAGEURL,
      };
    });
    res.json({ herds });
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
  HerdsHandlers,
};
