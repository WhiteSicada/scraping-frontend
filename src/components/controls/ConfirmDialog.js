import React from "react";

import MuiButton from "./Button";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { NotListedLocation } from "@mui/icons-material";
import { MyButton } from "../../Utils";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(1),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    "&:hover": {
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocation sx={{ color: "#2fa561" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <MyButton
          variant="contained"
          width="70%"
          className="btn"
          color1="#FF0000"
          color2="#FF0000"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          Non
        </MyButton>
        <MyButton
          variant="contained"
          width="70%"
          className="btn"
          color1="#2FA561"
          color2="#0faf52"
          onClick={confirmDialog.onConfirm}
        >
          Oui
        </MyButton>
        {/* <MuiButton
          text="Yes"
          color="primary"
          
        /> */}
        {/* <Button variant="contained">Contained</Button> */}
      </DialogActions>
    </Dialog>
  );
}
