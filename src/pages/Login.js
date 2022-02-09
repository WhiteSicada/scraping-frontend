import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, InputAdornment, Alert } from "@mui/material";

import { Link } from "react-router-dom";
import "../styles/Login.css";
import { MyButton } from "../Utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser, setNewUser } from "../features/auth/AuthSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Home } from "@mui/icons-material";
const initialValuesSignIn = {
  username: "admin",
  password: "kun123456789+",
};
function Login({ message }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(initialValuesSignIn);

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <Formik
            initialValues={user}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              dispatch(authenticateUser(data))
                .then((response) => {
                  navigate("/");
                })
                .catch((error) => {
                  console.log(error.message);
                  setShow(true);
                  resetForm();
                  setError("Invalid username and password");
                });
            }}
          >
            {({ values, isSubmitting, handleChange, errors, touched }) => (
              <Form className="login-form sign-up-form" autoComplete="off">
                {show && message && (
                  <Alert
                    variant="primary"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    {message}
                  </Alert>
                )}
                {show && error && (
                  <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}
                <h2 className="title">Se Connecter</h2>
                <TextField
                  id="usernameSignin"
                  name={"username"}
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  variant="standard"
                  className="input-field"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: "#2FA561" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  className="input-field"
                  id="passwordSignin"
                  name={"password"}
                  label={"Password"}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="standard"
                  type="password"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#2FA561" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Link to="/forgot-password" className="forgotPassword">
                  <h5>Mot de passe oublié ?</h5>
                </Link>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <MyButton
                  type="submit"
                  variant="contained"
                  width="70%"
                  className="btn"
                  color1="#2FA561"
                  color2="#0faf52"
                  disabled={
                    values.username.length === 0 || values.password.length === 0
                  }
                >
                  Sign Up
                </MyButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Bienvenue !</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={require("../images/log.png")} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
