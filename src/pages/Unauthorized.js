import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import ReactLogo from "../images/unauthorized.svg";
import { MyButton } from "../Utils";

const useStyles = makeStyles((theme) => ({
	title1: {
		marginBottom: 20,
		color: "#2fa561",
		textAlign: "center",
		fontSize: 90,
		fontWeight: 800,
	},
	title2: {
		color: "#455d7a",
		textAlign: "center",
		fontSize: 30,
		textTransform: "uppercase",
	},
	container: {
		// height: "88vh",
	},
}));

function Unauthorized() {
	const classes = useStyles();
	return (
		<Container fixed maxWidth="md" className={classes.container}>
			<img src={ReactLogo} alt="React Logo" className="whistle" />
			<h1 className={classes.title1}>403</h1>
			<h2 className={classes.title2}>Pas cette fois, accès interdit !</h2>
		</Container>
	);
}

export default Unauthorized;
