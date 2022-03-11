import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
	clivilteList,
	initialValuesEnfants,
	regimesocialList,
	validationSchemaEnfants,
} from "../../helpers/ClientHelper";
import { useDispatch, useSelector } from "react-redux";
import {
	createEnfant,
	selectClientToEdit,
	selectEnfantToEdit,
	sEnfantToEdit,
	updateEnfant,
} from "../../features/clients/ClientsSlice";

import { useSnackbar } from "notistack";

function EnfantForm({ clientToEdit }) {
	const dispatch = useDispatch();
	const enfantToEdit = useSelector(selectEnfantToEdit);
	const [formValues, setFormValues] = useState(initialValuesEnfants);
	const [update, setUpdate] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (enfantToEdit != null) {
			setFormValues(enfantToEdit);
			setUpdate(true);
		} else {
			setFormValues(initialValuesEnfants);
			setUpdate(false);
		}
	}, [enfantToEdit]);
	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchemaEnfants}
				onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
					console.log(
						JSON.stringify({ clientId: clientToEdit.id, data: values }, null, 2)
					);
					if (update) {
						dispatch(
							updateEnfant({
								clientId: clientToEdit.id,
								enfantId: values.id,
								data: values,
							})
						)
							.then((response) => {
								setFormValues(initialValuesEnfants);
								setFieldValue("dateNaissance", null);
								enqueueSnackbar("Enfant modifié avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
						setUpdate(false);
					} else {
						dispatch(createEnfant({ clientId: clientToEdit.id, data: values }))
							.then((response) => {
								setFormValues(initialValuesEnfants);
								setFieldValue("dateNaissance", null);
								enqueueSnackbar("Enfant crée avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
					}
					resetForm();
				}}
			>
				{({
					values,
					setFieldValue,
					resetForm,
					isSubmitting,
					isValid,
					dirty,
				}) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Field
									name={"firstName"}
									label="Nom"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"lastName"}
									label="Prenom"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Année de naissance"
										value={values.dateNaissance}
										onChange={(value) => setFieldValue("dateNaissance", value)}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<TextField variant="standard" fullWidth {...params} />
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={3}>
								<Field
									name="civility"
									select
									as={TextField}
									variant="standard"
									fullWidth
									label="Civilite"
								>
									{clivilteList.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"numeroSecuriteSocial"}
									label="numero Securite Social"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"numeroOrganisme"}
									label="Numero Organisme"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name="regimeSocial"
									select
									as={TextField}
									variant="standard"
									fullWidth
									label="Regime Social"
								>
									{regimesocialList.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
							</Grid>
							<Grid item xs={3}>
								<Field
									name="beneficiaryOf"
									select
									as={TextField}
									variant="standard"
									fullWidth
									label="beneficiaryOf"
								>
									<MenuItem value={1}>Moi</MenuItem>
									<MenuItem value={2}>mon conjoint</MenuItem>
								</Field>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"justificatif"}
									label="Justificatif"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={2}
								style={{
									marginTop: 7,
									display: "flex",
									alignItems: "center",
								}}
							>
								<Field type="checkbox" as={Checkbox} name="isDisabled" />{" "}
								<span>Handicap</span>
							</Grid>
						</Grid>
						<center>
							<Button
								size="small"
								variant="contained"
								style={{ backgroundColor: "#FF6C37", marginRight: 20 }}
								onClick={() => {
									resetForm();
									dispatch(sEnfantToEdit(null));
									setFormValues(initialValuesEnfants);
									setFieldValue("dateNaissance", null);
									setUpdate(false);
								}}
							>
								reset
							</Button>
							<Button
								type="submit"
								size="small"
								variant="contained"
								disabled={isSubmitting || !dirty || !isValid}
								style={{
									color: "#FFF",
									width: 150,
								}}
							>
								{isSubmitting ? (
									<div style={{ display: "flex" }}>
										<CircularProgress size={25} sx={{ color: "#FFF" }} />
									</div>
								) : (
									<div style={{ display: "flex" }}>submit</div>
								)}
							</Button>
						</center>
						{/* <pre>{JSON.stringify({ values: values }, null, 2)}</pre> */}
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EnfantForm;
