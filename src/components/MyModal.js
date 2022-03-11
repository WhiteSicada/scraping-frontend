import { Box, Dialog, Slide } from "@mui/material";
import React, { useState } from "react";

const style = {
	borderRadius: 5,
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
				fullWidth
				maxWidth={"md"}
				onClose={handleCloseDialog}
			>
				<Box sx={style}>{children}</Box>
			</Dialog>
		</>
	);
}

export default MyModal;
