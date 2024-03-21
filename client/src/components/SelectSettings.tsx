import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../app/hooks";

interface Props {
  options: Array<{ text: string; value: number }>;
  label: string;
  onChange: Function;
}

export default function SelectSettings(props: Props) {
  const [item, setItem] = React.useState(0);
  const theme = useAppSelector((state) => state.theme.value);

  const handleChange = (event: SelectChangeEvent) => {
    const index: any = event.target.value;
    setItem(index);

    console.log("selected: " + event.target.value);
    props.onChange(props.options[index]);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size="medium"
      className="w-1/2 md:w-48 FormControl"
    >
      <InputLabel id="demo-select-small-label">{props.label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={item.toString()}
        label={props.label}
        onChange={handleChange}
      >
        {props.options.map(({ text, value }, index) => (
          <MenuItem key={index} value={index}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
