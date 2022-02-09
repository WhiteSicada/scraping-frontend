import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import ReactLogo from "../images/logo.svg";
import { MyButton } from "../Utils";

const useStyles = makeStyles((theme) => ({
  title1: {
    fontSize: "7.5em",
    margin: "15px 0px",
    fontWeight: "bold",
  },
  title2: {
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    alignItems: "center",
    height: "91vh",
  },
  rightContainer: { textAlign: "center" },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <Container fixed>
      <Grid container className={classes.container}>
        <Grid item md={6} sm={12} xs={12} className={classes.leftContainer}>
          <img src={ReactLogo} alt="React Logo" />
        </Grid>
        <Grid item md={6} sm={12} xs={12} className={classes.rightContainer}>
          <h1 className={classes.title1}>404</h1>
          <h2 className={classes.title2}>UH OH! Vous etes perdus</h2>
          <p>
            La page que vous recherchez n'existe pas. Comment vous êtes arrivé
            ici est un mystère. Mais vous pouvez cliquer sur le bouton
            ci-dessous pour revenir à la page d'accueil.
          </p>
          <Link to="/" className="no-Link-style">
            <MyButton
              variant="contained"
              width="70%"
              className="btn"
              color1="#2FA561"
              color2="#0faf52"
            >
              HOME
            </MyButton>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
