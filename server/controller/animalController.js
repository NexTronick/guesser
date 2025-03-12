const request = require("request").defaults({ encoding: null });
const fs = require("fs");
// const path = require("path");
const Animality = require("animality");
const Jimp = require("jimp");
const sharp = require("sharp");
const { createHash } = require("crypto");
const path = require("path");
require("dotenv").config();

//variable const data
const animals = [
  "cat",
  "dog",
  "bird",
  "panda",
  "redpanda",
  "koala",
  "fox",
  "whale",
  "dolphin",
  "kangaroo",
  "rabbit",
  "lion",
  "bear",
  "frog",
  "duck",
  "penguin",
  "axolotl",
  "capybara",
  "hedgehog",
  "turtle",
  "narwhal",
  "squirrel",
  "fish",
  "horse",
];

//helper functions
function getRandomAnimal(min, max) {
  let randomNo = min + Math.random() * (max - min);
  return animals[randomNo];
}

//updated function for get random animal image
async function getRandomAnimalImage(
  chosenPositions,
  positions,
  xSize,
  ySize,
  urls,
  imageSrc,
  amount,
  userHashKey
) {
  let image = await Jimp.read(imageSrc);
  let newPositions = chooseRandomNewPositions(
    chosenPositions,
    positions,
    amount
  );

  for (let i = 0, urlIndex = urls.length; i < amount; i++, urlIndex++) {
    let clone = await createCloneImage(
      image,
      newPositions[urlIndex],
      xSize,
      ySize,
      userHashKey,
      urlIndex
    );
    urls.push(clone.url);
  }
  return {
    chosenPositions: newPositions,
    urls: urls,
  };
}

//create storage Directory based on user for storing images
function createStorageDirectory(userHashKey) {
  const storeLocation = path.join(__dirname, "storage", userHashKey);
  if (!fs.existsSync(storeLocation)) {
    fs.mkdirSync(storeLocation);
    console.log("Directory created:", storeLocation);
  }
  return storeLocation;
}

//helper method
async function createCloneImage(
  image,
  randomPosition,
  xSize,
  ySize,
  userHashKey,
  index
) {
  //clone new image
  let cloneImg = await image.clone();
  //write the cropped image
  const imageFileType = cloneImg.getMIME().split("/")[1];
  const storeLocation = createStorageDirectory(userHashKey);

  try {
    console.log(
      "randomPosition:",
      Number(randomPosition.x),
      Number(randomPosition.y)
    );

    console.log(cloneImg.getWidth(), cloneImg.getHeight());

    await cloneImg
      .crop(Number(randomPosition.x), Number(randomPosition.y), xSize, ySize)
      .writeAsync(`${storeLocation}/${index}.${imageFileType}`);

    //get buffer from cropImage new image
    let url = `${process.env.BACKEND_URL}/api/animal/storage/${userHashKey}/${index}.${imageFileType}`;
    return { url: url };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

//new way to get random points
function chooseRandomNewPositions(chosenPositions, positions, amount) {
  let newChosenPositions = [];
  let randomIndex = 0;
  while (newChosenPositions.length < amount) {
    randomIndex = Math.floor(Math.random() * (positions.length - 1)) + 0;
    if (
      !newChosenPositions.includes(positions[randomIndex]) &&
      !chosenPositions.includes(positions[randomIndex])
    ) {
      newChosenPositions.push(positions[randomIndex]);
    }
  }

  let chosen = [...chosenPositions, ...newChosenPositions];
  console.log(chosen);
  return chosen;
}

//generate random positions
function generateRandomPositions(width, height, percent) {
  let xSize = width * percent;
  let ySize = height * percent;
  let area = xSize * ySize;
  let cutAmount = (width * height) / area;
  let positions = [];

  for (let i = 0, nextX = 0, nextY = 0; i < cutAmount; i++) {
    positions.push({ x: nextX, y: nextY });
    nextX = nextX + xSize > width ? 0 : nextX + xSize;
    nextY = i > 0 && nextX == 0 ? nextY + ySize : nextY;
  }
  return { positions: positions, xSize: xSize, ySize: ySize };
}

//create a grid
function generateGrid(width, height) {
  console.log(width + " x " + height + " y ");
  return { width, height };
}

function deleteInside(userid) {
  const directory = path.join("../storage/", userid);
  if (!fs.existsSync(directory)) {
    return;
  }
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

function autoDelete(userid) {
  //every 1h it will delete the images
  setTimeout(() => {
    deleteInside(userid);
  }, 1000 * 60 * 60);

  //every 1 month it will delete the userid whole folder
}

function getStoragePath(userHashKey, fileName) {
  const baseDirectory = path.join(__dirname, "storage");
  const sanitizedUserHashKey = sanitizePath(userHashKey);
  const sanitizedFileName = sanitizePath(fileName);
  const fullPath = path.join(
    baseDirectory,
    sanitizedUserHashKey,
    sanitizedFileName
  );

  if (!fullPath.startsWith(baseDirectory)) {
    throw new Error("Invalid path");
  }

  return fullPath; // Use this path for file operations
}

function validateInput(input) {
  const regex = /^[a-zA-Z0-9_-]+$/; // Adjust as necessary
  if (!regex.test(input)) {
    throw new Error("Invalid input");
  }
}

module.exports = {
  handleRandom: async function (req, res) {
    let randomAnimal = getRandomAnimal(0, animals.length - 1);
    const result = await Animality.getAsync(randomAnimal);
    if (!result) {
      res.status(500);
      res.end();
      return;
    }
    result.animal = result.animal === "redpanda" ? "red panda" : result.animal; //changing redpanda to red panda
    let current_date = new Date().valueOf().toString();
    let random = Math.random().toString();
    let userHashKey = createHash("sha256")
      .update(current_date + random)
      .digest("hex");
    try {
      autoDelete(userHashKey);
    } catch (e) {
      console.log(e);
    }

    res.status(200).send({ animalData: result, userHashKey: userHashKey });
    res.end();
  },
  handleRandomCroppedImage: async function (req, res) {
    const image = req.body.image;
    const reShuffled = req.body.reShuffled;
    const generatedNumbers = req.body.generatedNumbers
      ? req.body.generatedNumbers
      : [];
    const urls = req.body.urls ? req.body.urls : [];
    const chosenPositions = req.body.chosenPositions
      ? req.body.chosenPositions
      : [];
    const difficulty = req.body.difficulty;
    const userHashKey = req.body.userHashKey;

    // console.log("image", image);
    // console.log("reShuffled", reShuffled);
    // //console.log("generatedNumbers", generatedNumbers);
    // console.log("urls", req.body.urls);
    // console.log("chosenPositions", chosenPositions);
    //this can adjust to make the difficulty level of the game (easier - hard) (less amount and less size makes it harder to guess)
    //changing size to width and height that can be divided equally with grid.

    console.log(image);
    try {
      request.get(image, async (err, response, body) => {
        if (err) {
          res.status(404);
          res.end();
          return;
        }

        //create a new buffer with sharp format png
        let newBuffer = await sharp(body).toFormat("png").toBuffer();

        let img = await Jimp.read(newBuffer);
        let amount = 3;
        let size = 100 / difficulty.value; //convert to a division of value
        let percentage = size / 100; //(value x value) grid size for the picture
        //generate new numbers
        let generated =
          !generatedNumbers.length || !reShuffled
            ? generateRandomPositions(
                img.getWidth(),
                img.getHeight(),
                percentage
              )
            : generatedNumbers;

        console.log("Generated position length " + generated.positions.length);
        var images = await getRandomAnimalImage(
          chosenPositions,
          generated.positions,
          generated.xSize,
          generated.ySize,
          urls,
          newBuffer,
          amount,
          userHashKey
        );
        console.log("images:", images);
        //use the new buffer to get the images
        // var imageBuffers = await getRandomBuffersWithImageType(
        //   generatedNumbers,
        //   urls,
        //   newBuffer,
        //   size,
        //   amount,
        //   req.ip
        // );
        res.status(200);
        res.json({
          //imageBuffers: imageBuffers,
          generatedNumbers: generated,
          images: images,
        });
        res.end();
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Error 500");
      res.end();
    }
  },
  handleStorage: async function (req, res) {
    try {
      const { userHashKey, fileName } = req.params;
      //this will make the storage full , maybe need to find better solution here...
      //another solution is to use mongodb to store json data or more like objects with the array type
      // let newIp = ip.replace(/::/g, "_");

      // Validate and sanitize inputs
      validateInput(userHashKey);
      validateInput(fileName);

      const storagePath = getStoragePath(userHashKey, fileName);
      const read = fs.readFileSync(storagePath);

      // let read = fs.readFileSync("./storage/" + userHashKey + "/" + fileName);
      console.log(read);
      res.send(read);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(400).send("Invalid request");
    }
  },
};
