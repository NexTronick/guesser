import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  ReactHTMLElement,
  useCallback,
} from "react";
import DisplayImage from "./DisplayImage";
import { ImageDataType, ImagePositonType } from "../AllTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import imageDataSlice, {
  selectImageData,
  setImageData,
} from "../features/imageData/imageDataSlice";
import { selectAnimal } from "../features/animal/animalSlice";
import { selectGameSettings } from "../features/gameSettings/gameSettingsSlice";
import Loading from "./Loading";
import { Status, selectStatus } from "../features/dataStatus/dataStatusSlice";
import { selectTheme } from "../features/theme/themeSlice";
import ButtonVarient from "./parts/ButtonVarient";
import { IoMdRefresh } from "react-icons/io";
import { IconButton, Typography } from "@mui/material";

interface Props {
  image: string;
  urls: Array<string>;
  chosenPositions: Array<ImagePositonType>;
  generatedNumbers: Array<ImagePositonType>;
}

//runing useEffect for shuffle
const useImages = (urls: Array<string>) => {
  const [images, updateImages] = useState<Array<any>>([]);
  useEffect(() => {
    updateImages(showImages(urls));
  }, [urls]);
  return { images };
};

const showImages = (urls: Array<string>) => {
  return urls.map((url: string, i) => <DisplayImage url={url} key={i} />);
};

function SeperateImage() {
  const dispatch = useAppDispatch();
  const animal = useAppSelector(selectAnimal);
  const gameSettings = useAppSelector(selectGameSettings);
  const imageData = useAppSelector(selectImageData);
  const status = useAppSelector(selectStatus);
  const theme = useAppSelector(selectTheme);

  const [reshuffle, setReshuffle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  //const [imageSrc, setImageSrc] = useState<string>(animal.value.image);
  // const [urls, setUrls] = useState<Array<string>>(imageData.images.urls);
  // const [chosenPositions, setChosenPositions] = useState<
  //   Array<ImagePositonType>
  // >(imageData.images.chosenPositions);
  const { images } = useImages(imageData.images.urls);

  // useEffect(() => {
  //   setImageSrc(props.image);
  //   setUrls(props.urls);
  //   setChosenPositions(props.chosenPositions);
  //   setReshuffle(false);
  // }, [props]);

  useEffect(() => {
    console.log("new animal added: called in SeperateImages");

    if (status.status === Status.Loaded) {
      setLoading(false);
    } else {
      setReshuffle(false);
      setLoading(true);
    }
  }, [animal, imageData, status]);

  const reshuffleImage = async () => {
    // console.log(JSON.stringify(urls));
    let randomImage = await axios.post("/api/animal/random/img", {
      image: animal.value.image,
      reShuffled: true,
      difficulty: gameSettings.difficulty,
      generatedNumbers: imageData.generatedNumbers,
      chosenPositions: imageData.images.chosenPositions,
      urls: imageData.images.urls,
    });

    console.log(randomImage);
    //checks for status result
    if (randomImage.status !== 200) {
      return;
    }
    const randomImageData: ImageDataType = randomImage.data;
    //update the imageData redux
    dispatch(setImageData(randomImageData));

    setReshuffle(true);
  };

  const showReshuffle = () => {
    return !reshuffle ? (
      // <button
      //   onClick={reshuffleImage}
      //   type="button"
      //   className="m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8"
      // >
      //   Reshuffle
      // </button>
      // <ButtonVarient
      //   color="primary"
      //   // === "light" ? "light" : "dark"
      //   theme={theme}
      //   ariaLabel="Submit"
      //   value="Re-Shuffle"
      //   onclick={reshuffleImage}
      //   className="md:w-52 mx-auto my-8 w-1/2"
      //   //m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8
      // />
      <IconButton sx={{ margin: "10px 0px" }} onClick={reshuffleImage}>
        <Typography className="">
          <IoMdRefresh
            color={theme === "light" ? "black" : "white"}
            size={30}
          />
        </Typography>
      </IconButton>
    ) : (
      ""
    );
  };

  return (
    <div className=" ">
      {showReshuffle()}

      <div id="showImages" className="justify-center flex">
        <div id="partial-images" className="grid grid-cols-3 gap-2">
          {loading ? (
            <div className=" col-span-3">
              <Loading />
            </div>
          ) : (
            images.map((image) => image)
          )}
        </div>
      </div>
    </div>
  );
}

export default SeperateImage;
