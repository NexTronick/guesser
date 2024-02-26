const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  handleRandom,
  handleRandomCroppedImage,
  handleStorage,
} = require("../controller/animalController");

router.use(cors());

router.get("/random", handleRandom);

router.post("/random/img", handleRandomCroppedImage);

router.get("/storage/:ip/:fileName", handleStorage);
module.exports = router;
