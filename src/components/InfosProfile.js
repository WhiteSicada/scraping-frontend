import { Send } from "@mui/icons-material";
import {
	Grid,
	TextField as OTextField,
	CircularProgress,
	Button,
} from "@mui/material";
import { TextField } from "formik-mui";

import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isoFormatDMY, MyButton, parseISOString } from "../Utils";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { updateUser } from "../features/auth/AuthSlice";
import { useStylesInfosProfile } from "../styles/ComponentStyles";
import { Controls } from "./controls/controls";
import { useSnackbar } from "notistack";
function InfosProfile({ user }) {
	const classes = useStylesInfosProfile();
	const dispatch = useDispatch();
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const { enqueueSnackbar } = useSnackbar();
	const { nom, prenom, email, dateBirth, authorities } = user;
	const [dteBirth, setDteBirth] = useState(dateBirth);
	const initialValuesInfosProfile = {
		nom: nom || "",
		prenom: prenom || "",
		email: email || "",
		dateBirth: dateBirth || "",
	};
	return (
		<div className={classes.infoProfileContainer}>
			<h3 className={classes.infoProfilecTitle}>
				Modifier les informations Personnelles
			</h3>
			<Formik
				initialValues={initialValuesInfosProfile}
				enableReinitialize={true}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					dispatch(
						updateUser({
							oldUser: values,
							id: user.id,
						})
					)
						.then((response) => {
							setSubmitting(false);
							enqueueSnackbar("Utilisateur modifié avec succés!", {
								variant: "success",
							});
						})
						.catch((error) => {
							setSubmitting(false);
							enqueueSnackbar(error, { variant: "error" });
						});
					console.log(JSON.stringify(values, null, 2));
				}}
			>
				{({ values, isSubmitting, setFieldValue, dirty, isValid }) => (
					<Form autoComplete="off">
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
										"Créer"
									)}
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
			<Controls.Notification notify={notify} setNotify={setNotify} />
		</div>
	);
}

export default InfosProfile;
