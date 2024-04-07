require("dotenv").config();
const express = require("express");
const app = express();
const animalAPI = require("./routes/animal");
const path = require("path");
const port = 5000;
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/build");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/animal", animalAPI);
app.use(express.static(buildpath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) res.status(500).send(err);
    }
  );
});
app.listen(port, () => {
  console.log("Listening on port " + port);
  console.log("view link url: http://localhost:" + port);
});
