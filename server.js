const express = require("express");
const { registerUser } = require("./handlers/SignUpUserHandlers");
const { loginUser } = require("./handlers/authHandlers");
const { addHerdHandler } = require("./handlers/addHerdHandlers");
const { HerdsHandlers } = require("./handlers/Herds");
const { deleteHerdHandler } = require("./handlers/deleteHerdHandlers");
const { editHerdHandler } = require("./handlers/editHerdHandlers");
const { addPaddockHandler } = require("./handlers/addPaddockHandlers");
const { PaddocksHandlers } = require("./handlers/paddocks");
const { deletePaddockHandler } = require("./handlers/deletePaddockHandlers");
const { editPaddocksHandler } = require("./handlers/editPaddockHandlers");
const { UsersHandlers } = require("./handlers/users");
const { editPasswordHandler } = require("./handlers/editPasswordHandlers");
const { editEmailHandler } = require("./handlers/editEmailHandlers");
const {
  addSingleAnimalHandler,
} = require("./handlers/addSingleAnimalHandlers");
const {
  removeSingleAnimalHandler,
} = require("./handlers/removeSingleAnimalHandlers");
const { getAnimalsHandler } = require("./handlers/getAnimalsHandlers");
const { moveAnimalsHandler } = require("./handlers/moveAnimalsHandlers");

const app = express();

app.use(express.json());

app.post("/users/register", registerUser);
app.post("/users/login", loginUser);
app.post("/herds/create", addHerdHandler);
app.post("/animal/create", HerdsHandlers);
app.get("/herds/view", HerdsHandlers);
app.get("/herds/view/:id", HerdsHandlers);
app.delete("/herds/delete/:id", deleteHerdHandler);
app.post("/herds/edit/:id", editHerdHandler);
app.post("/paddocks/create", addPaddockHandler);
app.get("/paddocks/view", PaddocksHandlers);
app.delete("/paddocks/delete/:id", deletePaddockHandler);
app.get("/users/view", UsersHandlers);
app.post("/paddocks/edit/:id", editPaddocksHandler);
app.get("/users/view", UsersHandlers);
app.put("/users/edit/:password", editPasswordHandler);
app.put("/users/edits/:email", editEmailHandler);
app.post("/animals/create", addSingleAnimalHandler);
app.get("/animals/view/:id", getAnimalsHandler);
app.delete("/animals/delete/:id", removeSingleAnimalHandler);
app.post("/animals/move", moveAnimalsHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
