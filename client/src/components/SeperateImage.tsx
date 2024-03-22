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
import {
  selectImageData,
  setImageData,
} from "../features/imageData/imageDataSlice";
import { selectAnimal } from "../features/animal/animalSlice";
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
  const imageData = useAppSelector(selectImageData);
  const [reshuffle, setReshuffle] = useState<boolean>(false);

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
  }, [animal]);

  const reshuffleImage = async () => {
    // console.log(JSON.stringify(urls));
    let randomImage = await axios.post("/api/animal/random/img", {
      image: animal.value.image,
      reShuffled: true,
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

    setReshuffle(false);
    // console.log(randomImage.data.images.urls);

    // const urls = randomImage.data.images.urls;
    // setUrls(urls);
    // setChosenPositions(randomImage.data.images.chosenPositions);
    // setReshuffle(true);
    // const newImg = showImages(urls);
    // setImgs(newImg);
  };

  const showReshuffle = () => {
    return !reshuffle ? (
      <button
        onClick={reshuffleImage}
        type="button"
        className="m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8"
      >
        Reshuffle
      </button>
    ) : (
      ""
    );
  };

  return (
    <div className=" ">
      {showReshuffle()}
      {/* <div className="flex justify-center">
        <img
          src={imageSrc + "?" + new Date().getTime()}
          alt="animal"
          width={400}
        />
      </div> */}
      <div id="showImages" className="justify-center flex">
        <div id="partial-images" className="grid grid-cols-3 gap-2">
          {images.map((image) => image)}
        </div>
      </div>
    </div>
  );
}

export default SeperateImage;
