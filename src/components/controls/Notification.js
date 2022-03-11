import React from "react";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	closeNotification,
	selectNotification,
} from "../../features/notifications/notificationSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(9),
		backgroundColor: "#2FA561",
		color: "#fff",
	},
}));

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const notify = useSelector(selectNotification);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(closeNotification());
	};

	return (
		<Snackbar
			className={classes.root}
			open={notify.isOpen}
			autoHideDuration={2000}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			onClose={handleClose}
		>
			<Alert variant="filled" severity={notify.type} onClose={handleClose}>
				{notify.message}
			</Alert>
		</Snackbar>
	);
}
