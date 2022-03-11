import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	MenuItem,
	TextField as OTextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
	clivilteList,
	initialValuesConjoint,
	regimesocialList,
	validationSchemaConjoint,
} from "../../helpers/ClientHelper";
import { useDispatch, useSelector } from "react-redux";
import {
	createConjoint,
	selectClientToEdit,
	selectConjointToEdit,
	updateConjoint,
} from "../../features/clients/ClientsSlice";

import { useSnackbar } from "notistack";
import { TextField } from "formik-mui";

function ConjointForm({ handleCloseDialogConjoint }) {
	const dispatch = useDispatch();
	const conjointToEdit = useSelector(selectConjointToEdit);
	const clientToEdit = useSelector(selectClientToEdit);
	const [formValues, setFormValues] = useState(initialValuesConjoint);
	const [update, setUpdate] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (conjointToEdit != null) {
			setFormValues(conjointToEdit);
			setUpdate(true);
		}
	}, [conjointToEdit]);
	const titre = update ? "Modification Conjoint" : "Création conjoint";
	return (
		<div>
			<h4>{titre}</h4>
			<Formik
				enableReinitialize={true}
				validationSchema={validationSchemaConjoint}
				initialValues={formValues}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					if (update) {
						// console.log(
						// 	JSON.stringify(
						// 		{ clientId: clientToEdit.id, data: values },
						// 		null,
						// 		2
						// 	)
						// );
						dispatch(
							updateConjoint({ clientId: clientToEdit.id, data: values })
						)
							.then((response) => {
								setSubmitting(false);
								enqueueSnackbar("Conjoint modifié avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
					} else {
						dispatch(createConjoint({ id: clientToEdit.id, conjoint: values }))
							.then((response) => {
								setSubmitting(false);
								enqueueSnackbar("Conjoint crée avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
					}
					resetForm();

					handleCloseDialogConjoint();
				}}
			>
				{({ values, setFieldValue, dirty, isValid, isSubmitting }) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Field
									name={"firstName"}
									label="Nom"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"lastName"}
									label="Prenom"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Année de naissance"
										value={values.dateNaissanceConjoint}
										onChange={(value) =>
											setFieldValue("dateNaissanceConjoint", value)
										}
										inputFormat="dd/MM/yyyy"
										toolbarFormat="dd/MM/yyyy"
										renderInput={(params) => (
											<OTextField variant="standard" fullWidth {...params} />
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={3}>
								<Field
									name="civility"
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
							<Grid item xs={3}>
								<Field
									name={"numeroSecuriteSocial"}
									label="numero Securite Social"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"numeroOrganisme"}
									label="Numero Organisme"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name="regimeSocialConjoint"
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
							<Grid item xs={3}>
								<Field
									name="beneficiaryOf"
									select
									component={TextField}
									variant="standard"
									fullWidth
									label="beneficiaryOf"
								>
									<MenuItem value={1}>Moi</MenuItem>
									<MenuItem value={2}>mon conjoint</MenuItem>
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
								<Field type="checkbox" as={Checkbox} name="isDisabled" />{" "}
								<span>Handicap</span>
							</Grid>
						</Grid>
						<center>
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
									"submit"
								)}
							</Button>
						</center>
						{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default ConjointForm;
