import React from "react";
import { useDispatch } from "react-redux";
import {
	clivilteList,
	initialValuesAddClient,
	regimesocialList,
	validationSchema,
} from "../../helpers/ClientHelper";
import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	MenuItem,
	TextField as OTextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { createClient } from "../../features/clients/ClientsSlice";

import { TextField } from "formik-mui";
import { useSnackbar } from "notistack";

function AddClientForm({ handleCloseDialogCreateClient }) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={initialValuesAddClient}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// console.log(JSON.stringify(values, null, 2));
					setSubmitting(true);
					dispatch(createClient(values))
						.then((response) => {
							resetForm();
							setSubmitting(false);
							handleCloseDialogCreateClient();
							enqueueSnackbar("Client crée avec succés!", {
								variant: "success",
							});
						})
						.catch((error) => {
							setSubmitting(false);
							handleCloseDialogCreateClient();
							enqueueSnackbar(error, { variant: "error" });
						});
				}}
			>
				{({ values, isSubmitting, dirty, isValid, setFieldValue }) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Field
									name={"nom"}
									label="Nom"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"prenom"}
									label="Prenom"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4}>
								<Field
									name={"email"}
									label="Email"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name="civilite"
									select
									component={TextField}
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
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name={"mobile"}
									label="Mobile"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<Field
									name={"immatriculation"}
									label="Immatriculation"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"birthPlace"}
									label="Ville de Naissance"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"birthCountry"}
									label="Pays de naissance"
									variant="standard"
									component={TextField}
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
											<Field
												as={OTextField}
												variant="standard"
												fullWidth
												{...params}
											/>
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
											<Field
												as={OTextField}
												variant="standard"
												fullWidth
												{...params}
											/>
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
											<Field
												as={OTextField}
												variant="standard"
												fullWidth
												{...params}
											/>
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={2}>
								<Field
									name="regimeSocialSouscripteur"
									select
									component={TextField}
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
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AddClientForm;
