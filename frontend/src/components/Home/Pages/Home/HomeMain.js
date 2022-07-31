import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import "./HomeMain.css";

function HomeText() {
  return (
    <React.Fragment className="Home__text">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <div className="Home__div">
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}
          className="Home__textdiv"
        >
          <Typography
            className="text--left"
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            With Shopper World, you can sell and buy goods easily.
          </Typography>
          <Typography
            variant="h5"
            align="left"
            className="text--left"
            color="text.secondary"
            component="p"
          >
            Imagine getting a warranty NFT with your goods! This is amazing, right? Utilizing web-3 to its full potential.
          </Typography>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function HomeMain() {
  return (
    <div className="Home__grid">
      <HomeText />
      <img src={require("./pic1.jfif")} className="Home__img" alt="map" />
    </div>
  );
}
