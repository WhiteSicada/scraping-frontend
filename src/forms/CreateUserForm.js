import { Lock, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MyButton } from "../Utils";
import { useDispatch } from "react-redux";
import { createUser } from "../features/users/UserSlice";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: 30,
  },
}));

const initialValuesCreateUserForm = {
  id: null,
  nom: "test2",
  username : "testuser",
  prenom: "user2",
  email: "test2@user2.com",
  password: "test2user2",
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

  return (
    <div className={classes.root}>
      <h4>Ajouter un utilisateur</h4>
      <Formik
        enableReinitialize={true}
        initialValues={initialValuesCreateUserForm}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(createUser({ ...values, dateBirth: dateBirth }))
            .then((response) => {
              resetForm();
              handleCloseDialog();
              setNotify({
                isOpen: true,
                message: "Utilisateur crée avec succés!",
                type: "success",
              });
            })
            .catch((error) => {
              setNotify({
                isOpen: true,
                message: error,
                type: "error",
              });
            });
        }}
      >
        {({ values, isSubmitting, handleChange, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="username"
                  name={"username"}
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  variant="standard"
                  className="input-field"
                  margin="normal"
                  autoComplete="off"
                />
              </Grid>
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Année de naissance"
                    value={dateBirth}
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
              <Grid item xs={6}>
                <TextField
                  id="password"
                  name={"password"}
                  label={"Password"}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  className="input-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#2FA561" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} mt={5}>
                <MyButton
                  color1="#2FA561"
                  color2="#0faf52"
                  width="70%"
                  type="submit"
                  endIcon={<Send />}
                >
                  Créer
                </MyButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateUserForm;
