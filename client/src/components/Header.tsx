import React, { useState } from "react";
import { GitHub, LinkedIn, Twitter, Web } from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Switch,
  FormControlLabel,
  ThemeProvider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createTheme,
  Theme,
  Box,
} from "@mui/material";
import ReactEmoji from "react-emoji-render";
import SwtichTheme from "./SwitchTheme";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import { useNavigate } from "react-router-dom";

const globalTheme = createTheme({
  typography: {
    h4: {
      color: "black",
    },
    body1: {
      color: "black",
    },
  },
});

// const useStyles: Theme = makeStyles((theme: Theme) => ({
//   modalContent: {
//     backgroundColor: "#fff",
//     margin: "10% auto",
//     padding: "20px",
//     outline: "none",
//     borderRadius: "8px",
//     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//     maxHeight: "450px",
//     maxWidth: "450px",
//     color: "black !important",
//     overflowY: "auto",
//     "&::-webkit-scrollbar": {
//       width: "8px",
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "#f0f0f0",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#888",
//       borderRadius: "4px",
//     },
//     "&::-webkit-scrollbar-thumb:hover": {
//       backgroundColor: "#555",
//     },
//   },
// }));

export default function Header() {
  //const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useAppSelector(selectTheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const handleThemeChange = () => {
  //     const newTheme = theme === "light" ? "dark" : "light";
  //     setTheme(newTheme);
  //     // You can implement the theme switch logic here
  //   };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        borderColor: "transparent",
        boxShadow:
          theme === "light"
            ? "0px 1px 1px -1px rgba(0,0,0,0.16),0px 4px 4px 0px rgba(0,0,0,0.12),0px 1px 5px 0px rgba(0,0,0,0.08) !important"
            : "0px 1px 1px -1px rgba(255,255,255,0.16),0px 4px 4px 0px rgba(255,255,255,0.14),0px 1px 5px 0px rgba(255,255,255,0.08) !important",
      }}
    >
      <Toolbar className="flex justify-center">
        {/* Logo on the left style={{ flexGrow: 1 }}      style={{ marginRight: "auto" }}*/}

        <div
          // sx={{
          //   marginRight: ["20%", "40%", "450px"],
          // }}
          className="md:mx-0 lg:mr-[450px] md:mr-[300px] sm:mr-[200px] xs:mr-[20px] float-start mx-auto"
        >
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme === "light" ? "black" : "white",
                fontSize: ["22px", "30px", "2.125rem"],
              }}
            >
              Pic'OMystery
              <ReactEmoji text="🕵️‍♂️" />
            </Typography>
          </IconButton>
        </div>
        <div className="flex justify-end float-right md:mx-0 mx-auto">
          <Typography variant="h4">
            <SwtichTheme />
          </Typography>

          {/* Settings icon on the right */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="settings"
            onClick={handleOpen}
          >
            <ReactEmoji text="⚙️" className=" md:text-4xl text-3xl" />
          </IconButton>
        </div>

        <ThemeProvider theme={globalTheme}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  position: "absolute" as "absolute",
                  top: ["50%", "50%", "40%"],
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  // border: "2px solid #000",
                  // boxShadow: 24,
                  p: 2,
                  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  maxHeight: ["80vh", "80vh", "500px"],
                  maxWidth: ["80vw", "80vw", "500px"],
                  width: ["80vw", "80vw", "500px"],
                  color: "black !important",
                  overflow: "auto",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f0f0f0",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                <Box
                  className="flex justify-around static"
                  sx={{
                    boxShadow:
                      theme === "light"
                        ? "0px 0px 0px 0px rgba(0,0,0,0.16),0px 2px 2px 0px rgba(0,0,0,0.12),0px 0px 0px 0px rgba(0,0,0,0.08) !important"
                        : "0px 1px 1px -1px rgba(255,255,255,0.16),0px 2px 2px 0px rgba(255,255,255,0.12),0px 1px 5px 0px rgba(255,255,255,0.08) !important",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "black",
                      marginRight: "75%",
                      alignItems: "bottom",
                    }}
                  >
                    Settings
                  </Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="settings"
                    onClick={handleClose}
                    sx={{
                      transform: "translate(-10%,0)",
                      marginTop: "0px",
                      paddingTop: "0px",
                    }}
                  >
                    <ReactEmoji text="✖️" className=" text-xl" />
                  </IconButton>
                </Box>
                {/* Theme switch */}
                {/* <FormControlLabel
                control={
                  <Switch
                    checked={theme === "dark"}
                    onChange={handleThemeChange}
                    name="themeSwitch"
                    color="primary"
                  />
                }
                label="Dark Mode"
              /> */}
                <Typography variant="h6" className="text-black">
                  How to Play?
                </Typography>
                <Typography className="text-black">
                  This game is pretty simple. Before you get started, you must
                  set your difficulty level and Guess?. Then you click Play. To
                  get started... You will be given 3 cropped picture. You can
                  then start the guessing! Enjoy and have fun!
                </Typography>
                <br />
                <Typography className="text-black">
                  Want to get in touch? Use the following links:
                </Typography>
                <List component="nav" aria-label="social links">
                  <ListItem
                    button
                    component="a"
                    href="https://github.com/NexTronick"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemIcon>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText primary="GitHub" />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="https://www.linkedin.com/in/natraj-niranjan-padwani-6587b1223/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemIcon>
                      <LinkedIn />
                    </ListItemIcon>
                    <ListItemText primary="LinkedIn" />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="https://twitter.com/PadwaniNatraj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemIcon>
                      <Twitter />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="https://www.natrajpadwani.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemIcon>
                      <Web />
                    </ListItemIcon>
                    <ListItemText primary="Portfolio Website" />
                  </ListItem>
                </List>
              </Box>
            </Fade>
          </Modal>
        </ThemeProvider>
      </Toolbar>
    </AppBar>
  );
}
