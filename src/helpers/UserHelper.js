import * as yup from "yup";

export const initialValuesCreation = {
	nom: "test2",
	username: "test2",
	prenom: "user2",
	email: "test2@user2.com",
	password: "kun123456789+",
	dateBirth: "1989-03-16T19:07:39.000Z",
};

export const validationSchema = yup.object({
	nom: yup.string("Entez le nom").required("nom est requis"),
	username: yup.string("Entez le username").required("nom est requis"),
	prenom: yup.string("Entez le prenom").required("nom est requis"),
	email: yup
		.string("Entez le email")
		.email("Must be a valid email")
		.max(255)
		.required("Email is required"),
	password: yup
		.string("Entez le password")
		.min(6, "Minumum 6 caractères")
		.required("nom est requis"),
	dateBirth: yup
		.string("Entez le date de naissance")
		.required("date de naissance est requis"),
});
