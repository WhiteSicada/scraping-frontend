import { Button, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		// minWidth: 0,
		// margin: theme.spacing(0.5),
		// fontSize: "0.7rem",
	},
	secondary: {
		border: "1px solid #ef630b",
		"& .MuiButton-label": {
			color: theme.palette.secondary.main,
		},
	},
	primary: {
		border: "1px solid #2FA561",
		"& .MuiButton-label": {
			color: theme.palette.primary.main,
		},
	},
}));

export default function ActionButton(props) {
	const { color, children, onClick, text } = props;
	const classes = useStyles();

	return (
		<Tooltip title={text} arrow>
			<Button size="small" className={` ${classes[color]}`} onClick={onClick}>
				{children}
			</Button>
		</Tooltip>
	);
}
