import React, { useEffect, useState } from "react";
import axios from "axios";
import type { AnimalType, ImagePositonType } from "./AllTypes";
import SeperateImage from "./components/SeperateImage";
import FormGuessAnswer from "./components/FormGuessAnswer";
import NavBar from "./components/NavBar";

function App() {
  const [animalData, setAnimalData] = useState<AnimalType>();
  const [partialImages, setPartialImages] = useState<string[]>();
  const [chosenPositions, setChosenPositions] =
    useState<Array<ImagePositonType>>();
  const [generatedNumbers, setGeneratedNumbers] =
    useState<Array<ImagePositonType>>();
  const [darkTheme, setDarkTheme] = useState(false);

  const loadData = async () => {
    try {
      await handleRandom();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRandom = async () => {
    try {
      let randomAnimal = await axios.get("/api/animal/random");
      if (randomAnimal.status !== 200) {
        return;
      }
      console.log(randomAnimal.data.animalData);
      setAnimalData(randomAnimal.data.animalData);
      await handleRandomImage(randomAnimal.data.animalData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRandomImage = async (newAnimalData: AnimalType) => {
    //makes sure to check for animal data exists
    if (!newAnimalData) {
      return;
    }

    //random images gotten here
    let randomImage = await axios.post("/api/animal/random/img", {
      image: newAnimalData.image,
      reShuffled: false,
    });

    //checks for status result
    if (randomImage.status !== 200) {
      return;
    }

    //load from urls
    setPartialImages(randomImage.data.images.urls);
    setGeneratedNumbers(randomImage.data.generatedNumbers);
    setChosenPositions(randomImage.data.images.chosenPositions);
    console.log(chosenPositions);
    console.log(randomImage.data.images.chosenPositions);
  };

  window.onload = () => {
    loadData();
  };
  const getFactAndReshuffle = async () => {
    await loadData();
  };
  return (
    <div className="App text-center">
      {/* <Counter></Counter> */}
      <NavBar />
      <h1 className="text-3xl font-bold underline m-2">Guess the Animal</h1>
      <button
        type="button"
        id="loadButton"
        className=" m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8"
        onClick={loadData}
      >
        Start
      </button>
      <div className="main mt-12">
        <h1 className=" text-xl">Loaded Data Here: </h1>
        {animalData == null ||
        partialImages == null ||
        chosenPositions == null ||
        generatedNumbers == null ? (
          ""
        ) : (
          <>
            <SeperateImage
              image={animalData?.image}
              partialImages={partialImages}
              chosenPositions={chosenPositions}
              generatedNumbers={generatedNumbers}
            />
            <FormGuessAnswer
              animalName={animalData?.animal}
              getFactAndReshuffle={getFactAndReshuffle}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
