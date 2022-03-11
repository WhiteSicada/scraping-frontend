import { Lock, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MyButton } from "../Utils";
import { useStylesPasswordProfileReset } from "../styles/ComponentStyles";

const initialValuesPasswordReset = {
	oldPassword: "",
	newPassword: "",
};

function PasswordResetProfile() {
	const classes = useStylesPasswordProfileReset();
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const handleClickShowPasswordOld = () => {
		setShowOldPassword(!showOldPassword);
	};

	const handleMouseDownPasswordOld = (event) => {
		event.preventDefault();
	};
	const handleClickShowPasswordNew = () => {
		setShowNewPassword(!showNewPassword);
	};

	const handleMouseDownPasswordNew = (event) => {
		event.preventDefault();
	};

	return (
		<div className={classes.passwordResetontainer}>
			<h3 className={classes.passwordTitle}>Modifier Mot de passe</h3>
			<Formik
				initialValues={initialValuesPasswordReset}
				enableReinitialize={true}
			>
				{({ values, isSubmitting, handleChange, errors, touched }) => (
					<Form autoComplete="off">
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									id="oldPassword"
									name={"oldPassword"}
									label={"Old Password"}
									value={values.oldPassword}
									onChange={handleChange}
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									variant="standard"
									type={showOldPassword ? "text" : "password"}
									margin="normal"
									className={classes.inputPassword}
									disabled
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Lock sx={{ color: "#1565C0" }} />
											</InputAdornment>
										),
										endAdornment: (
											<IconButton
												onClick={handleClickShowPasswordOld}
												onMouseDown={handleMouseDownPasswordOld}
											>
												{!showOldPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										),
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="newPassword"
									name={"newPassword"}
									label={"New Password"}
									value={values.newPassword}
									onChange={handleChange}
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									variant="standard"
									type={showNewPassword ? "text" : "password"}
									margin="normal"
									className={classes.inputPassword}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Lock sx={{ color: "#1565C0" }} />
											</InputAdornment>
										),
										endAdornment: (
											<IconButton
												onClick={handleClickShowPasswordNew}
												onMouseDown={handleMouseDownPasswordNew}
											>
												{!showNewPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} mt={5}>
								<Button startIcon={<Send />} variant="contained">
									Upload
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default PasswordResetProfile;
