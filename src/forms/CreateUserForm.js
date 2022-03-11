import { Lock, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	TextField as OTextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { MyButton } from "../Utils";
import { useDispatch } from "react-redux";
import { createUser } from "../features/users/UserSlice";
import { TextField } from "formik-mui";
import { initialValuesCreation, validationSchema } from "../helpers/UserHelper";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
		marginTop: 30,
	},
}));

const initialValuesCreateUserForm = {
	id: null,
	nom: "test2",
	username: "test2",
	prenom: "user2",
	email: "test2@user2.com",
	password: "kun123456789+",
};

function CreateUserForm({ handleCloseDialog, setNotify }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [dateBirth, setDteBirth] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
  const { enqueueSnackbar } = useSnackbar();
	return (
		<div className={classes.root}>
			<h4>Ajouter un utilisateur</h4>
			<Formik
				enableReinitialize={true}
				initialValues={initialValuesCreation}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// console.log(JSON.stringify(values, null, 2));
					dispatch(createUser(values))
						.then((response) => {
							resetForm();
							handleCloseDialog();
							enqueueSnackbar("Utilisateur crée avec succés!", {
								variant: "success",
							});
						})
						.catch((error) => {
							enqueueSnackbar(error, { variant: "error" });
						});
				}}
			>
				{({ values, isSubmitting, setFieldValue, dirty, isValid }) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Field
									name="username"
									type="input"
									component={TextField}
									variant="standard"
									label="Username"
									className="input-field"
									margin="normal"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="nom"
									type="input"
									component={TextField}
									variant="standard"
									label="Nom"
									className="input-field"
									margin="normal"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="prenom"
									type="input"
									component={TextField}
									variant="standard"
									label="Prenom"
									className="input-field"
									margin="normal"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="email"
									type="input"
									component={TextField}
									variant="standard"
									label="Email"
									className="input-field"
									margin="normal"
								/>
							</Grid>
							<Grid item xs={6}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Année de naissance"
										value={values.dateBirth}
										onChange={(newValue) => {
											setFieldValue("dateBirth", newValue);
										}}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<OTextField
												variant="standard"
												className="input-field"
												margin="normal"
												{...params}
											/>
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={6}>
								<Field
									name="password"
									type={showPassword ? "text" : "password"}
									component={TextField}
									variant="standard"
									label="Password 5 characters"
									className="input-field"
									margin="normal"
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
								/>
							</Grid>

							<Grid item xs={12} mt={5}>
								<Button
									type="submit"
									variant="contained"
									disabled={isSubmitting || !dirty || !isValid}
									style={{ color: "#FFF", width: 150 }}
								>
									{isSubmitting ? (
										<div style={{ display: "flex" }}>
											<CircularProgress size={25} sx={{ color: "#FFF" }} />
										</div>
									) : (
										"Créer"
									)}
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CreateUserForm;
