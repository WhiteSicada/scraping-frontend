import {
  Backdrop,
  Box,
  Dialog,
  Fade,
  Modal,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const style = {
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 5,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function MyModal({ openDialog, handleCloseDialog, children }) {
  return (
    <>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={style}>{children}</Box>
      </Dialog>
    </>
  );
}

export default MyModal;
