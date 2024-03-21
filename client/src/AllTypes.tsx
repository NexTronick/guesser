export interface AnimalType {
  animal: string;
  image: string;
  fact: string;
  image_id: string;
  fact_id: string;
}

// export interface ImagesType {
//   images: Array<string>;
//   type: string;
// }

export interface ImageDataType {
  generatedNumbers: {
    positions: Array<ImagePositonType>;
    xSize: number;
    ySize: number;
  };
  images: {
    chosenPositions: Array<ImagePositonType>;
    urls: Array<string>;
  };
}

export interface ImagePositonType {
  x: number;
  y: number;
}

export interface ThemeType {
  value: "light" | "dark";
}
