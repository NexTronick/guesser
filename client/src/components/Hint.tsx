import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectAnimal } from "../features/animal/animalSlice";
import { printUnderline } from "../util/Funtionalitise";

export default function Hint() {
  const animal = useAppSelector(selectAnimal);
  return (
    <>
      <Box>
        <Typography variant="h5">
          Hint: <br />"{animal.value.animal[0].toUpperCase()}
          {printUnderline(animal.value.animal)}"
        </Typography>
      </Box>
    </>
  );
}
