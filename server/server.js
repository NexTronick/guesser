require("dotenv").config();
const express = require("express");
const app = express();
const animalAPI = require("./routes/animal");
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/animal", animalAPI);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
