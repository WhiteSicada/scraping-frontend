import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { selectClientToEdit } from "../features/clients/ClientsSlice";
import { getFullName } from "../helpers/ClientHelper";

function ViewClient() {
	const client = useSelector(selectClientToEdit);
	const civiliteFormatter = (civilite) => {
		return civilite === 1 ? "Monsieur" : "Madame";
	};
	const checkDataIsExisting = (x) => {
		return x ? x : "N/A";
	};
	return (
		<div>
			<h4 style={{ marginBottom: 20 }}>Client Infos</h4>
			<Grid container spacing={2}>
				<Grid item md={4}>
					<div>
						Nom :
						{client?.nom &&
							" " +
								civiliteFormatter(client.civilite) +
								" " +
								getFullName(client.nom, client.prenom)}
					</div>
					<div>Email : {checkDataIsExisting(client?.email)}</div>
					<div>Phone : {checkDataIsExisting(client?.phone)}</div>
					<div>Mobile : {checkDataIsExisting(client?.mobile)}</div>
					<div>
						Date de naissance :{" "}
						{moment(client?.dateNaissanceSouscripteur).format("DD/MM/yyyy")}
						{client?.birthPlace &&
							" à " + checkDataIsExisting(client?.birthPlace)}
						{client?.birthCountry &&
							" / " + checkDataIsExisting(client?.birthCountry)}
					</div>
					<div>
						Regime Social :{" "}
						{checkDataIsExisting(client?.regimeSocialSouscripteur)}
					</div>
					<div>
						Immatriculation : {checkDataIsExisting(client?.immatriculation)}
					</div>
				</Grid>
				<Grid item md={4}>
					<div>
						Date Effet : {moment(client?.dateEffet).format("DD/MM/yyyy")}
					</div>
					<div>
						Date Effet Complemet :{" "}
						{moment(client?.dateEffetComplementaire).format("DD/MM/yyyy")}
					</div>
					<div>Fumeur : {client?.nonFumeur ? "non" : "oui"}</div>
					<div>
						Pris En Charge 100% Secu :{" "}
						{client?.nonPrisEnChargeCentPourCentSecu ? "non" : "oui"}
					</div>
					<div>
						Titulaire Rente Invalidite :{" "}
						{client?.nonTitulaireRenteInvalidite ? "non" : "oui"}
					</div>
					<div>
						En Arret Professionnelle :{" "}
						{client?.pasEnArretProfessionnelle ? "non" : "oui"}
					</div>
					<div>Handicap : {!client?.isDisabled ? "non" : "oui"}</div>
				</Grid>
				<Grid item md={4}>
					<div>
						Ville :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.cityName)}
					</div>
					<div>
						Nom de la Rue :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.streetName)}
					</div>
					<div>
						Numéro de la Rue :{" "}
						{client?.adress &&
							checkDataIsExisting(client?.adress?.streetNumber)}
					</div>{" "}
					<div>
						Type de la Rue :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.streetType)}
					</div>
					<div>
						Repetition :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.repetition)}
					</div>
					<div>
						Code Postale :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.cityZipCode)}
					</div>
					<div>
						Complement :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.complement)}
					</div>
					<div>
						Code Insee :{" "}
						{client?.adress && checkDataIsExisting(client?.adress?.codeInsee)}
					</div>
				</Grid>
			</Grid>
			<h4 style={{ margin: "20px 0px" }}>Conjoint</h4>
			<Grid container spacing={2}>
				<Grid item md={4}>
					<div>
						Nom :{" "}
						{client?.conjoint &&
							" " +
								civiliteFormatter(client.conjoint.civilite) +
								" " +
								getFullName(client.conjoint.firstName, client.conjoint.lastName)}
					</div>
					<div>Handicap : {!client?.conjoint?.isDisabled ? "non" : "oui"}</div>
					<div>
						Date de naissance :{" "}
						{moment(client?.conjoint?.dateNaissanceConjoint).format(
							"DD/MM/yyyy"
						)}
					</div>
				</Grid>
				<Grid item md={4}>
					<div>
						Numéro Securite Social :{" "}
						{client?.conjoint &&
							checkDataIsExisting(client?.conjoint?.numeroSecuriteSocial)}
					</div>
					<div>
						Numéro Organisme :{" "}
						{client?.conjoint &&
							checkDataIsExisting(client?.conjoint?.numeroOrganisme)}
					</div>
				</Grid>
				<Grid item md={4}>
					<div>
						Régime Social :{" "}
						{client?.conjoint &&
							checkDataIsExisting(client?.conjoint?.regimeSocial)}
					</div>
					<div>
						Numéro Organisme :{" "}
						{client?.conjoint &&
							checkDataIsExisting(client?.conjoint?.numeroOrganisme)}
					</div>
				</Grid>
			</Grid>
			<h4 style={{ margin: "20px 0px" }}>Enfants</h4>
			{client?.enfantList?.length > 0 ? (
				<div>
					{client?.enfantList?.map((item, index) => (
						<div key={index}>
							Enfant {index + 1} : date de naissance :{" "}
							{moment(item.dateNaissance).format("DD/MM/yyyy")} Régime Sociale :{" "}
							{item.regimeSocial}
						</div>
					))}
				</div>
			) : (
				<div style={{ marginTop: 10 }}>Pas d'enfants pour ce client</div>
			)}
		</div>
	);
}

export default ViewClient;
