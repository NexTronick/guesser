import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  ReactHTMLElement,
  useCallback,
} from "react";
import DisplayImage from "./DisplayImage";
import { ImagePositonType } from "../AllTypes";
interface Props {
  image: string;
  partialImages: Array<string>;
  chosenPositions: Array<ImagePositonType>;
  generatedNumbers: Array<ImagePositonType>;
}

//runing useEffect for shuffle
const useImages = (partialImages: Array<string>) => {
  const [images, updateImages] = useState<Array<any>>([]);
  useEffect(() => {
    updateImages(showImages(partialImages));
  }, [partialImages]);
  return { images };
};

const showImages = (urls: Array<string>) => {
  return urls.map((url: string, i) => <DisplayImage url={url} key={i} />);
};

function SeperateImage(props: Props) {
  // const [imgs, setImgs] = useState<JSX.Element[]>(
  //   showImages(props.partialImages)
  // );
  const [imageSrc, setImageSrc] = useState<string>(props.image);
  const [partialImages, setPartialImages] = useState<Array<string>>(
    props.partialImages
  );
  const [reshuffle, setReshuffle] = useState<boolean>(false);
  const [chosenPositions, setChosenPositions] = useState<
    Array<ImagePositonType>
  >(props.chosenPositions);
  const { images } = useImages(partialImages);

  useEffect(() => {
    setImageSrc(props.image);
    setPartialImages(props.partialImages);
    setChosenPositions(props.chosenPositions);
    setReshuffle(false);
  }, [props]);

  const reshuffleImage = async () => {
    console.log(JSON.stringify(partialImages));
    let randomImage = await axios.post("/api/animal/random/img", {
      image: imageSrc,
      reShuffled: true,
      generatedNumbers: props.generatedNumbers,
      chosenPositions: chosenPositions,
      urls: partialImages,
    });

    //checks for status result
    if (randomImage.status !== 200) {
      return;
    }

    //load from urls
    console.log(randomImage.data.images.urls);

    const urls = randomImage.data.images.urls;
    setPartialImages(urls);
    setChosenPositions(randomImage.data.images.chosenPositions);
    setReshuffle(true);
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
