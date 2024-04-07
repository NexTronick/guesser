import {
  Box,
  Container,
  Paper,
  Typography,
  BottomNavigation,
} from "@mui/material";
import React from "react";
import { ThemeType } from "../AllTypes";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

export default function Footer() {
  const theme = useAppSelector(selectTheme);
  return (
    <div className="bottom-0 absolute w-full">
      {/* <Paper
        sx={{
          marginTop: "calc(10% + 60px)",
          width: "100%",
          position: "fixed",
          bottom: 0,
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
            }}
          >
            <div>
              <img
                src="/logo-picomystery.png"
                width={75}
                height={30}
                alt="Logo"
              />
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©{new Date(Date.now()).getFullYear()}. [] Limited
            </Typography>
          </Box>
        </Container>
      </Paper> */}
      <div
        className={` p-6 text-center ${
          theme === "light"
            ? "bg-neutral-200 text-neutral-900"
            : "bg-neutral-900 text-neutral-200"
        }`}
      >
        <span> © {new Date(Date.now()).getFullYear()} </span>
        <a
          className={`font-semibold hover:underline no-underline ${
            theme === "light" ? "text-neutral-600" : "text-neutral-300"
          }`}
          href="/"
        >
          Natraj Padwani
        </a>
        <span>. All rights Reserved.</span>
      </div>
    </div>
  );
}
