import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
  },
  label: {
    textTransform: "none",
  },
}));

export default function MuiButton(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </Button>
  );
}
