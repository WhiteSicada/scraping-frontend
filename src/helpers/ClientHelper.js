import * as yup from "yup";

export const initialValuesAddClient = {
	dateNaissanceSouscripteur: "1960-09-12T23:00:00.000Z",
	regimeSocialSouscripteur: "SAL",
	nom: "test",
	prenom: "client",
	civilite: 1,
	email: "test.client@hmail.com",
	phone: "ee",
	mobile: "0663990469",
	isDisabled: false,
	immatriculation: "eee",
	birthPlace: "eeeee",
	birthCountry: "eeeee",
	dateEffet: "2023-02-28T23:00:00.000Z",
	dateEffetComplementaire: "2023-12-31T23:00:00.000Z",
	nonFumeur: true,
	nonPrisEnChargeCentPourCentSecu: true,
	nonTitulaireRenteInvalidite: true,
	pasEnArretProfessionnelle: true,
};

export const validationSchema = yup.object({
	nom: yup.string("Entez le nom").required("nom est requis"),
	prenom: yup.string("Entez le prenom").required("nom est requis"),
	email: yup
		.string("Entez le email")
		.email("Must be a valid email")
		.max(255)
		.required("Email is required"),
	phone: yup.string("Entez phone").required("nom est requis"),
	mobile: yup.string("Entez mobile").required("nom est requis"),
	immatriculation: yup
		.string("Entez immatriculation")
		.required("nom est requis"),
	birthPlace: yup.string("Entez phone").required("nom est requis"),
	birthCountry: yup.string("Entez mobile").required("nom est requis"),
	dateNaissanceSouscripteur: yup
		.string("Entez immatriculation")
		.required("nom est requis"),
	dateEffet: yup.string("Entez immatriculation").required("nom est requis"),
	dateEffetComplementaire: yup
		.string("Entez immatriculation")
		.required("nom est requis"),
});

export const clivilteList = [
	{
		label: "Monsieur",
		value: 1,
	},
	{
		label: "Madame",
		value: 2,
	},
];

export const regimesocialList = [
	{
		label: "General",
		value: "General",
	},
	{
		label: "Agricole",
		value: "Agricole",
	},
	{
		label: "TNS",
		value: "TNS",
	},
	{
		label: "AlsaceMoselle",
		value: "AlsaceMoselle",
	},
	{
		label: "CaisseFrancaisEtranger",
		value: "CaisseFrancaisEtranger",
	},
	{
		label: "HorsSecuriteSociale",
		value: "HorsSecuriteSociale",
	},
	{
		label: "SAL",
		value: "SAL",
	},
];

export const stepsClientCreation = [
	"Informations Client",
	"Information Adresse",
	"Conjoint",
	"Enfants",
];

export const getFullName = (nom, prenom) => {
	if (nom != undefined && prenom != undefined) {
		return nom + " " + prenom;
	} else if (nom == undefined && prenom == undefined) {
		return "Non définie";
	} else if (nom == undefined) {
		return prenom;
	} else if (prenom == undefined) {
		return nom;
	}
};

export const initialValuesConjoint = {
	firstName: "",
	lastName: "",
	civility: 2,
	isDisabled: false,
	numeroSecuriteSocial: "",
	numeroOrganisme: "",
	regimeSocialConjoint: "",
	beneficiaryOf: 1,
	dateNaissanceConjoint: null,
};

export const validationSchemaConjoint = yup.object({
	firstName: yup.string("Entez le nom").required("nom est requis"),
	lastName: yup.string("Entez le prenom").required("prenom est requis"),

	numeroSecuriteSocial: yup
		.string("Entez numero securite social")
		.required("numero securite social est requis"),
	numeroOrganisme: yup
		.string("Entez numero organisme")
		.required("numero organisme est requis"),
	regimeSocialConjoint: yup
		.string("Entez regime socail")
		.required("regime socail est requis"),

	dateNaissanceConjoint: yup
		.string("Entez date de naissance")
		.required("date de naissance est requis"),
});

export const initialValuesAdress = {
	streetName: "",
	streetNumber: 0,
	streetType: "",
	repetition: "",
	cityName: "",
	cityZipCode: "",
	complement: "",
	codeInsee: "",
};

export const validationSchemaAdress = yup.object({
	streetName: yup.string("Entez le nom").required("nom est requis"),
	streetType: yup.string("Entez le nom").required("nom est requis"),
	repetition: yup.string("Entez le nom"),
	cityName: yup.string("Entez le nom de la ville").required("nom est requis"),
	cityZipCode: yup.string("Entez le nom").required("nom est requis"),
	complement: yup.string("Entez le nom"),
	codeInsee: yup.string("Entez le nom"),
	streetNumber: yup.number("doit etre un nombre").required("nom est requis"),
});

export const initialValuesEnfants = {
	dateNaissance: null,
	regimeSocial: "",
	justificatif: "",
	firstName: "",
	lastName: "",
	civility: 1,
	isDisabled: false,
	numeroSecuriteSocial: "",
	numeroOrganisme: "",
	beneficiaryOf: 1,
};

export const validationSchemaEnfants = yup.object({
	firstName: yup.string("Entez le nom"),
	lastName: yup.string("Entez le prenom"),
	justificatif: yup.string("Entez le justificatif"),
	numeroSecuriteSocial: yup
		.string("Entez numero securite social")
		.required("numero securite social est requis"),
	numeroOrganisme: yup
		.string("Entez numero organisme")
		.required("numero organisme est requis"),
	regimeSocial: yup
		.string("Entez regime socail")
		.required("regime socail est requis"),

	dateNaissance: yup
		.string("Entez date de naissance")
		.required("date de naissance est requis"),
});
