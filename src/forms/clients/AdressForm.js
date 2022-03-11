import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	MenuItem,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
	clivilteList,
	initialValuesAdress,
	initialValuesConjoint,
	regimesocialList,
	validationSchemaAdress,
} from "../../helpers/ClientHelper";
import { useDispatch, useSelector } from "react-redux";
import {
	createAdress,
	createConjoint,
	sClientToEdit,
	sConjointToEdit,
	selectAdressToEdit,
	selectClientToEdit,
	selectConjointToEdit,
	updateAdress,
	updateConjoint,
} from "../../features/clients/ClientsSlice";

import { useSnackbar } from "notistack";
import { TextField } from "formik-mui";

function AdressForm({ handleCloseDialogAdress }) {
	const dispatch = useDispatch();
	const adressToEdit = useSelector(selectAdressToEdit);
	const clientToEdit = useSelector(selectClientToEdit);
	const [formValues, setFormValues] = useState(initialValuesAdress);
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (adressToEdit !== null) {
			setFormValues(adressToEdit);
		}
	}, [adressToEdit]);
	const titre =
		adressToEdit !== null ? "Modification Adress" : "Création Adress";
	return (
		<div>
			<h4 style={{ marginBootom: 20 }}>{titre}</h4>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchemaAdress}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					if (adressToEdit !== null) {
						dispatch(updateAdress({ clientId: clientToEdit.id, data: values }))
							.then((response) => {
								enqueueSnackbar("Adress modifié avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
					} else {
						dispatch(createAdress({ id: clientToEdit.id, adress: values }))
							.then((response) => {
								enqueueSnackbar("Adress crée avec succés!", {
									variant: "success",
								});
							})
							.catch((error) => {
								enqueueSnackbar(error, { variant: "error" });
							});
					}
					resetForm();
					setSubmitting(false);
					handleCloseDialogAdress();
				}}
			>
				{({ values, setFieldValue, isSubmitting, isValid, dirty }) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Field
									name={"streetName"}
									label="streetName"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"streetNumber"}
									label="streetNumber"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"streetType"}
									label="streetType"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"repetition"}
									label="repetition"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"cityName"}
									label="cityName"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"cityZipCode"}
									label="cityZipCode"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"complement"}
									label="complement"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									name={"codeInsee"}
									label="codeInsee"
									variant="standard"
									component={TextField}
									fullWidth
								/>
							</Grid>
						</Grid>
						<center>
							<Button
								type="submit"
								variant="contained"
								disabled={isSubmitting || !dirty || !isValid}
								style={{
									color: "#FFF",
									width: 150,
									marginTop: 30,
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
						{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AdressForm;
