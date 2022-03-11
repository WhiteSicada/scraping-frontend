import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clivilteList,
	initialValuesAddClient,
	regimesocialList,
} from "../../helpers/ClientHelper";
import { Button, Checkbox, Grid, MenuItem, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	selectClientToEdit,
	updateClient,
} from "../../features/clients/ClientsSlice";

import { useSnackbar } from "notistack";

function UpdateClientForm({ handleCloseDialogUpdateClient }) {
	const clientToEdit = useSelector(selectClientToEdit);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [formValues, setFormValues] = useState(initialValuesAddClient);
	useEffect(() => {
		if (clientToEdit != null) {
			setFormValues(clientToEdit);
		}
	}, [clientToEdit]);
	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					var client = Object.assign({}, values);
					delete client.adress;
					delete client.conjoint;
					delete client.enfantList;
					console.log(JSON.stringify(client, null, 2));
					setSubmitting(true);
					dispatch(updateClient(client))
						.then((response) => {
							resetForm();
							handleCloseDialogUpdateClient();
							enqueueSnackbar("Client modifié avec succés!", {
								variant: "success",
							});
						})
						.catch((error) => {
							enqueueSnackbar(error, { variant: "error" });
						});
				}}
			>
				{({ values, isSubmitting, handleChange, setFieldValue }) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Field
									name={"nom"}
									label="Nom"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"prenom"}
									label="Prenom"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4}>
								<Field
									name={"email"}
									label="Email"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name="civilite"
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
							<Grid item xs={2}>
								<Field
									name={"phone"}
									label="phone"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name={"mobile"}
									label="Mobile"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name={"immatriculation"}
									label="Immatriculation"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"birthPlace"}
									label="Ville de Naissance"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"birthCountry"}
									label="Pays de naissance"
									variant="standard"
									as={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Année de naissance"
										value={values.dateNaissanceSouscripteur}
										onChange={(value) =>
											setFieldValue("dateNaissanceSouscripteur", value)
										}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<TextField variant="standard" fullWidth {...params} />
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={3}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Date d'effet"
										value={values.dateEffet}
										onChange={(value) => setFieldValue("dateEffet", value)}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<TextField variant="standard" fullWidth {...params} />
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={4}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Date Effet Complementaire"
										value={values.dateEffetComplementaire}
										onChange={(value) =>
											setFieldValue("dateEffetComplementaire", value)
										}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<TextField variant="standard" fullWidth {...params} />
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={2}>
								<Field
									name="regimeSocialSouscripteur"
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
							<Grid
								item
								xs={2}
								style={{
									marginTop: 7,
									display: "flex",
									alignItems: "center",
								}}
							>
								<Field type="checkbox" as={Checkbox} name="isDisabled" />
								<span>Handicap</span>
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
								<Field type="checkbox" as={Checkbox} name="nonFumeur" />
								<span>non Fumeur</span>
							</Grid>
							<Grid
								item
								xs={4}
								style={{
									marginTop: 7,
									display: "flex",
									alignItems: "center",
								}}
							>
								<Field
									type="checkbox"
									as={Checkbox}
									name="nonPrisEnChargeCentPourCentSecu"
								/>
								<span>nonPrisEnCharge100%Secu</span>
							</Grid>
							<Grid
								item
								xs={4}
								style={{
									marginTop: 7,
									display: "flex",
									alignItems: "center",
								}}
							>
								<Field
									type="checkbox"
									as={Checkbox}
									name="nonTitulaireRenteInvalidite"
								/>
								<span>nonTitulaireRenteInvalidite</span>
							</Grid>
							<Grid
								item
								xs={4}
								style={{
									marginTop: 7,
									display: "flex",
									alignItems: "center",
								}}
							>
								<Field
									type="checkbox"
									as={Checkbox}
									name="pasEnArretProfessionnelle"
								/>
								<span>pasEnArretProfessionnelle</span>
							</Grid>

							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
						</Grid>
						<center>
							<Button
								size="small"
								variant="contained"
								style={{ backgroundColor: "#0FAF52" }}
								type="submit"
							>
								Submit
							</Button>
						</center>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default UpdateClientForm;
