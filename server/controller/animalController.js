const request = require("request").defaults({ encoding: null });
const fs = require("fs");
// const path = require("path");
const Animality = require("animality");
const Jimp = require("jimp");
const sharp = require("sharp");
const { createHash } = require("crypto");

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

//gets the random cropped buffers of animal
// async function getRandomBuffersWithImageType(
//   generatedNumbers,
//   urls,
//   imageSrc,
//   size,
//   amount,
//   ip
// ) {
//   let image = await Jimp.read(imageSrc);
//   let grids = generateGrid(image.getWidth(), image.getHeight());

//   //get random amount images
//   for (let i = 0, index = urls.length; i < amount; i++, index++) {
//     //generates random images with previous images as contrains
//     const imageInfo = await generateRandomCroppedImage(
//       generatedNumbers,
//       image,
//       size,
//       ip,
//       index
//     );

//     //store the the new data.
//     generatedNumbers.push(imageInfo.position);
//     urls.push(imageInfo.url);
//   }

//   const data = {
//     urls: urls,
//     type: image.getMIME(),
//     generatedNumbers: generatedNumbers,
//   };
//   return data;
// }
//change size to height and width
// fix
// async function generateRandomCroppedImage(
//   generatedNumbers,
//   image,
//   size,
//   ip,
//   index
// ) {
//   //clone new image
//   let cloneImg = await image.clone();
//   let cloneTestImg = await image.clone();

//   //get random points
//   let randomPosition = generateRandomPosition(
//     generatedNumbers,
//     size,
//     0,
//     0,
//     cloneImg.bitmap.width - size,
//     cloneImg.bitmap.height - size
//   );
//   console.log(randomPosition);

//   //write the cropped image
//   const imageFileType = cloneImg.getMIME().split("/")[1];
//   try {
//     let newIp = ip.replace(/::/g, "_");
//     let storeLocation = "./storage/" + newIp;
//     if (!fs.existsSync(storeLocation)) {
//       fs.mkdirSync(storeLocation);
//       console.log("Directory created:", storeLocation);
//     }
//     await cloneImg
//       .crop(randomPosition.x, randomPosition.y, size, size)
//       .writeAsync(`${storeLocation}/${index}.${imageFileType}`);
//     await cloneTestImg
//       .crop(0, 0, size, size)
//       .writeAsync(`${storeLocation}/position00.${imageFileType}`);
//     //get buffer from cropImage new image
//     let url = `http://localhost:5000/api/animal/storage/${newIp}/${index}.${imageFileType}`;
//     return { position: randomPosition, url: url };
//   } catch (e) {
//     console.log(e);
//     throw new Error(e);
//   }
// }

//TODO: size changed to width and height
//TODO: adding constraints for grid random selectors.
//5 by 5 grid then choose between those 25 positions of x and y.
// function generateRandomPosition(
//   generatedNumbers,
//   size,
//   minX,
//   minY,
//   maxX,
//   maxY
// ) {
//   var randomNumberX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
//   var randomNumberY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

//   let position = { x: randomNumberX, y: randomNumberY };

//   //Check if generated number already exists
//   //TODO: change size to width and height
//   //TODO: FIX THIS IMPORTANT TO GENERATE THIS!
//   const index = generatedNumbers.findIndex((num) =>
//     // (num.x === position.x && num.y === position.y) ||
//     // (num.x + size > position.x &&
//     //   num.x < position.x &&
//     //   num.y + size > position.y &&
//     //   num.y < position.y) ||
//     // (position.x + size > num.x &&
//     //   position.x > num.x &&
//     //   position.y + size > num.y &&
//     //   position.y < num.y) ||
//     // (position.x + size < num.x + size && position.x + size > num.x) ||
//     positionValidation(num, position, size)
//   );
//   console.log("index: " + index);
//   //if it exists then do recursive behaviour
//   if (index !== -1) {
//     console.log("index: " + index);
//     generatedNumbers.splice(index, 1);
//     return generateRandomPosition(
//       generatedNumbers,
//       size,
//       minX,
//       minY,
//       maxX,
//       maxY
//     );
//   }

//   return position; //returns position (when found a proper size)
// }

//position validation
// function positionValidation(previous, current, size) {
//   if (previous.x === current.x && previous.y === current.y) {
//     return true;
//   } else if (
//     current.x > previous.x &&
//     current.x < previous.x + size &&
//     previous.y === current.y
//   ) {
//     return true;
//   } else if (
//     current.y < previous.y + size &&
//     current.y > previous.y &&
//     previous.x === current.x
//   ) {
//     return true;
//   } else if (
//     !(current.x - previous.x > 100 || current.x - previous.x < -100) ||
//     !(current.y - previous.y > 100 || current.y - previous.y < -100) ||
//     !(
//       current.x - previous.x > 100 ||
//       current.x - previous.x < -100 ||
//       current.y - previous.y > 100 ||
//       current.y - previous.y < -100
//     )
//   ) {
//     return true;
//   }

//   //if(previous.x + size > current.x && current.x > previous.x && previous.y +size > current.y && previous.y < current.y)
//   //if(previous.x +size )
// }

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
  try {
    let storeLocation = "./storage/" + userHashKey;
    if (!fs.existsSync(storeLocation)) {
      fs.mkdirSync(storeLocation);
      console.log("Directory created:", storeLocation);
    }
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
    let url = `http://localhost:5000/api/animal/storage/${userHashKey}/${index}.${imageFileType}`;
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

module.exports = {
  handleRandom: async function (req, res) {
    let randomAnimal = getRandomAnimal(0, animals.length - 1);
    const result = await Animality.getAsync(randomAnimal);
    if (!result) {
      res.status(500);
      res.end();
      return;
    }
    let current_date = new Date().valueOf().toString();
    let random = Math.random().toString();
    let userHashKey = createHash("sha256")
      .update(current_date + random)
      .digest("hex");

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
    const { userHashKey, fileName } = req.params;
    //this will make the storage full , maybe need to find better solution here...
    //another solution is to use mongodb to store json data or more like objects with the array type
    // let newIp = ip.replace(/::/g, "_");
    let read = fs.readFileSync("./storage/" + userHashKey + "/" + fileName);
    console.log(read);
    res.send(read);
    res.end();
  },
};
