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
import { useSnackbar } from "notistack";
import LoginForm from "../forms/LoginForm";

const initialValuesSignIn = {
	username: "admin",
	password: "kun123456789+",
};
function Login({ message }) {
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const [show, setShow] = useState(true);
	const [user, setUser] = useState(initialValuesSignIn);
	const { enqueueSnackbar } = useSnackbar();
	return (
		<div className="login-container">
			<div className="login-container-left">
				<h1>Bienvenue !</h1>
				<LoginForm />
			</div>
			<div className="login-container-right">
				<img
					src={require("../images/confortAssuranceLogo.png")}
					alt="Banque populaire logo"
				/>
			</div>
		</div>
	);
}

export default Login;
