import * as yup from "yup";

export const initialValues = {
	username: "admin",
	password: "kun123456789+",
};

export const validationSchema = yup.object({
	username: yup
		.string("Enter your username")
		.min(2, "Username should be of minimum (2) characters length")
		.required("Username is required"),
	password: yup
		.string("Enter your password")
		.min(2, "Password should be of minimum (2) characters length")
		.required("Password is required"),
});

export const roleList = [
	{
		label: "Admin",
		value: "admin",
	},
	{
		label: "Moderator",
		value: "moderator",
	},
	{
		label: "User",
		value: "user",
	},
];
