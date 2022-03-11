import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { TextField } from "formik-mui";
import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { initialValues, validationSchema } from "../helpers/AuthHelper";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../features/auth/AuthSlice";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(data, { setSubmitting, resetForm }) => {
				dispatch(authenticateUser(data))
					.unwrap()
					.then((response) => {
						enqueueSnackbar("Welcome, " + response.username, {
							variant: "success",
						});
						navigate("/", { replace: true });
					})
					.catch((e) => {
						setSubmitting(false);
						resetForm();
						enqueueSnackbar(e, { variant: "error" });
					});
			}}
		>
			{({ values, dirty, isValid, isSubmitting }) => (
				<Form className="form-login">
					<div className="input-margin">
						<Field
							name="username"
							type="input"
							component={TextField}
							variant="outlined"
							label="Username"
							fullWidth
						/>
					</div>
					<div className="input-margin">
						<Field
							name="password"
							type={showPassword ? "text" : "password"}
							component={TextField}
							variant="outlined"
							label="Password 5 characters"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							fullWidth
						/>
					</div>
					<div className="input-margin">
						<Button
							type="submit"
							variant="contained"
							// disabled={isSubmitting || !dirty || !isValid}
							style={{ color: "#FFF" }}
							fullWidth
						>
							{isSubmitting ? (
								<div style={{ display: "flex" }}>
									<CircularProgress size={25} />
									<span style={{ marginLeft: 15 }}>Loading ...</span>
								</div>
							) : (
								"Login"
							)}
						</Button>
					</div>

					{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
