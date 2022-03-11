import { Lock, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
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
import React, { useEffect, useState } from "react";
import { MyButton } from "../Utils";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/users/UserSlice";
import { TextField } from "formik-mui";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
		marginTop: 30,
	},
}));

const initialValuesUpdateUserForm = {
	id: null,
	nom: "",
	prenom: "",
	email: "",
	dateBirth: null,
};

function UpdateUserForm({ userEdit, handleCloseDialog, setNotify }) {
	const classes = useStyles();
	const [formValues, setFormValues] = useState(initialValuesUpdateUserForm);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	useEffect(() => {
		if (userEdit != null) {
			setFormValues(userEdit);
		}
	}, [userEdit]);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	return (
		<div className={classes.root}>
			<h4>Modifier un utilisateur</h4>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// console.log(JSON.stringify(values, null, 2));
					dispatch(
						updateUser({
							oldUser: {
								nom: values.nom,
								prenom: values.prenom,
								email: values.email,
								dateBirth: values.dateBirth,
							},
							id: userEdit.id,
						})
					)
						.then((response) => {
							resetForm();
							handleCloseDialog();
							enqueueSnackbar("Utilisateur modifié avec succés!", {
								variant: "success",
							});
						})
						.catch((error) => {
							resetForm();
							handleCloseDialog();
							enqueueSnackbar("Oups, erreur !", { variant: "error" });
						});
				}}
			>
				{({
					values,
					isSubmitting,
					handleChange,
					dirty,
					isValid,
					setFieldValue,
				}) => (
					<Form>
						<Grid container spacing={2}>
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
										"Modifier"
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

export default UpdateUserForm;
