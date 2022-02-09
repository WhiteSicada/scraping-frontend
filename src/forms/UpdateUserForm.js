import { Lock, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { MyButton } from "../Utils";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/users/UserSlice";

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
};

function UpdateUserForm({ userEdit, handleCloseDialog, setNotify }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState(initialValuesUpdateUserForm);
  const [dateBirth, setDteBirth] = useState(null);
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
      setDteBirth(userEdit.dateBirth);
    }
  }, [userEdit]);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <h4>Modifier un utilisateur</h4>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            updateUser({
              oldUser: {
                nom: values.nom,
                prenom: values.prenom,
                email: values.email,
                dateBirth: dateBirth,
              },
              id: userEdit.id,
            })
          )
            .then((response) => {
              resetForm();
              handleCloseDialog();
              setNotify({
                isOpen: true,
                message: "Utilisateur modifié avec succés !",
                type: "success",
              });
            })
            .catch((error) => {
              resetForm();
              handleCloseDialog();
              setNotify({
                isOpen: true,
                message: error,
                type: "error",
              });
            });
        }}
      >
        {({
          values,
          isSubmitting,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form>
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
                  type="submit"
                  endIcon={<Send />}
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

export default UpdateUserForm;
