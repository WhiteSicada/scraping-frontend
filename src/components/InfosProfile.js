import { Send } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { isoFormatDMY, MyButton, parseISOString } from "../Utils";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { updateUser } from "../features/auth/AuthSlice";
import { useStylesInfosProfile } from "../styles/ComponentStyles";

function InfosProfile({ user }) {
  const classes = useStylesInfosProfile();
  const dispatch = useDispatch();
  const { nom, prenom, email, dateBirth, authorities } = user;
  const [dteBirth, setDteBirth] = useState(dateBirth);
  const initialValuesInfosProfile = {
    nom: nom || "",
    prenom: prenom || "",
    email: email || "",
  };
  return (
    <div className={classes.infoProfileContainer}>
      <h3 className={classes.infoProfilecTitle}>
        Modifier les informations Personnelles
      </h3>
      <Formik
        initialValues={initialValuesInfosProfile}
        enableReinitialize={true}
        onSubmit={(values) => {
          dispatch(
            updateUser({
              oldUser: { ...values, dateBirth: dteBirth },
              id: user.id,
            })
          );
          console.log(
            JSON.stringify({ ...values, dateBirth: dteBirth }, null, 2)
          );
        }}
      >
        {({ values, isSubmitting, handleChange, errors, touched }) => (
          <Form autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="nom"
                  name={"nom"}
                  label="Nom"
                  value={values.nom}
                  onChange={handleChange}
                  error={touched.nom && Boolean(errors.nom)}
                  helperText={touched.nom && errors.nom}
                  variant="standard"
                  className="input-field"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="prenom"
                  name={"prenom"}
                  label="Prenom"
                  value={values.prenom}
                  onChange={handleChange}
                  error={touched.prenom && Boolean(errors.prenom)}
                  helperText={touched.prenom && errors.prenom}
                  variant="standard"
                  className="input-field"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  name={"email"}
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  variant="standard"
                  className="input-field"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Année de naissance"
                    value={dteBirth}
                    onChange={(newValue) => {
                      setDteBirth(newValue);
                    }}
                    inputFormat="dd/MM/yyyy"
                    toolbarFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
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
                <MyButton
                  color1="#2FA561"
                  color2="#0faf52"
                  width="70%"
                  endIcon={<Send />}
                  type="submit"
                  disabled={
                    values.nom === 0 ||
                    values.prenom === 0 ||
                    values.email === 0
                  }
                >
                  Modifier
                </MyButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InfosProfile;
