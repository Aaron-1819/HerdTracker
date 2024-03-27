const oracledb = require("oracledb");
require("dotenv").config();

async function addHerdHandler(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

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
      differenceInDays,
      imageUrl,
    } = req.body;

    const result = await connection.execute(
      `INSERT INTO Herds (
        herdName, landOwner, paddockNumber, cattleClass, headSize,auValue,herdStatus,
        comments, dateEntered, exitDate, differenceInDays, imageUrl
      ) VALUES (
        :herdName, :landOwner, :paddockNumber, :cattleClass, :headSize, :auValue, :herdStatus,
        :comments, TO_DATE(:dateEntered, 'YYYY-MM-DD'), TO_DATE(:exitDate, 'YYYY-MM-DD'),
        :differenceInDays, :imageUrl
      ) RETURNING id INTO :id`,
      {
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
        differenceInDays,
        imageUrl,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );

    const insertedId = result.outBinds.id[0];

    res.json({ message: "Herd added successfully", herdId: insertedId });
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
  addHerdHandler,
};
