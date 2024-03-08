import React, { useEffect, useState } from "react";
import axios from "axios";
import type { AnimalType, ImagePositonType } from "./AllTypes";
import SeperateImage from "./components/SeperateImage";
import FormGuessAnswer from "./components/FormGuessAnswer";

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
      //let test = await axios.get("/api/animal/test");
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
  };

  const handleModeChange = (e: any) => {
    let html = document.getElementsByTagName("html")[0];

    html.className = !darkTheme ? "darkTheme" : "brightTheme";
    console.log(!darkTheme);
    setDarkTheme(!darkTheme);
  };
  window.onload = () => {
    loadData();
  };
  const getFactAndReshuffle = async () => {
    await loadData();
  };
  return (
    <div className="App text-center">
      <h1 className="text-3xl font-bold underline">Guess the Animal</h1>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleModeChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium">Change Theme</span>
      </label>
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
