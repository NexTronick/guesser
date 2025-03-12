require("dotenv").config();
const express = require("express");
const app = express();
const animalAPI = require("./routes/animal");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5001;
const _dirname = path.dirname("");
//const buildpath = path.join(_dirname, "../client/build");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
  })
);

//run on client build folder
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path(__dirname, "../client/build")));
// }

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://guesser-natrajpadwani.netlify.app"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("This is an api server. Status 200.");
//   res.end();
// });

app.use("/api/animal", animalAPI);

app.listen(port, () => {
  console.log("Listening on port " + port);
  console.log("view link url: http://localhost:" + port);
});
