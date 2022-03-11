import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import ClientsTable from "../components/ClientsTable";
import { useDispatch } from "react-redux";
import {
	getClients,
	sAdressToEdit,
	sClientToEdit,
	sConjointToEdit,
	selectClients,
	sEnfantToEdit,
} from "../features/clients/ClientsSlice";
import { useSelector } from "react-redux";
import { getProfile, selectUser } from "../features/auth/AuthSlice";
import MyModal from "../components/MyModal";
import AddClientForm from "../forms/clients/AddClientForm";
import ConfirmDialog from "../components/controls/ConfirmDialog";
import UpdateClientForm from "../forms/clients/UpdateClientForm";
import ConjointForm from "../forms/clients/ConjointForm";
import Notification from "../components/controls/Notification";
import ViewClient from "../components/ViewClient";
import EnfantsSection from "../components/EnfantsSection";
import CreateClientModal from "../components/modals/CreateClientModal";
import UpdateClientModal from "../components/modals/UpdateClientModal";
import ViewClientModal from "../components/modals/ViewClientModal";
import ConjointModal from "../components/modals/ConjointModal";
import EnfantsModal from "../components/modals/EnfantsModal";
import AdressModal from "../components/modals/AdressModal";

const headCells = [
	{ id: "nom", label: "Nom" },
	// { id: "prenom", label: "Prenom" },
	{ id: "email", label: "Email" },
	// { id: "dateBirth", label: "Date de naissance" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

function Home() {
	const dispatch = useDispatch();

	// open dialogs
	const [openDialogCreateClient, setopenDialogCreateClient] = useState(false);
	const [openDialogUpdateClient, setopenDialogUpdateClient] = useState(false);
	const [openDialogViewClient, setopenDialogViewClient] = useState(false);
	const [openDialogConjoint, setopenDialogConjoint] = useState(false);
	const [openDialogAdress, setopenDialogAdress] = useState(false);
	const [openDialogEnfants, setopenDialogEnfants] = useState(false);

	// handleClosedialog
	const handleCloseDialogCreateClient = () => setopenDialogCreateClient(false);
	const handleCloseDialogUpdateClient = () => {
		dispatch(sClientToEdit(null));
		setopenDialogUpdateClient(false);
	};
	const handleCloseDialogViewClient = () => {
		dispatch(sClientToEdit(null));
		setopenDialogViewClient(false);
	};
	const handleCloseDialogConjoint = () => {
		dispatch(sClientToEdit(null));
		dispatch(sConjointToEdit(null));
		setopenDialogConjoint(false);
	};
	const handleCloseDialogAdress = () => {
		dispatch(sClientToEdit(null));
		dispatch(sAdressToEdit(null));
		setopenDialogAdress(false);
	};
	const handleCloseDialogEnfants = () => {
		dispatch(sClientToEdit(null));
		dispatch(sEnfantToEdit(null));
		setopenDialogEnfants(false);
	};

	// delete dialog and notification
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	// load DAta
	useEffect(() => {
		dispatch(getClients());
		dispatch(getProfile());
	}, []);

	// get data from state
	const clients = useSelector(selectClients);

	return (
		<div>
			{/* ClientsTable */}
			<ClientsTable
				list={clients}
				headCells={headCells}
				setopenDialogCreateUser={setopenDialogCreateClient}
				setopenDialogUpdateClient={setopenDialogUpdateClient}
				setopenDialogConjoint={setopenDialogConjoint}
				setopenDialogAdress={setopenDialogAdress}
				setopenDialogViewClient={setopenDialogViewClient}
				setopenDialogEnfants={setopenDialogEnfants}
				setConfirmDialog={setConfirmDialog}
			/>
			{/* create client */}
			<CreateClientModal
				openDialogCreateClient={openDialogCreateClient}
				handleCloseDialogCreateClient={handleCloseDialogCreateClient}
			/>

			{/* update client */}
			<UpdateClientModal
				openDialogUpdateClient={openDialogUpdateClient}
				handleCloseDialogUpdateClient={handleCloseDialogUpdateClient}
			/>

			{/* view client */}
			<ViewClientModal
				openDialogViewClient={openDialogViewClient}
				handleCloseDialogViewClient={handleCloseDialogViewClient}
			/>

			{/* Adress */}
			<AdressModal
				openDialogAdress={openDialogAdress}
				handleCloseDialogAdress={handleCloseDialogAdress}
			/>

			{/* conjoint */}
			<ConjointModal
				openDialogConjoint={openDialogConjoint}
				handleCloseDialogConjoint={handleCloseDialogConjoint}
			/>
			{/* Enfants */}
			<EnfantsModal
				openDialogEnfants={openDialogEnfants}
				handleCloseDialogEnfants={handleCloseDialogEnfants}
				setConfirmDialog={setConfirmDialog}
			/>

			{/* Alerts */}

			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}

export default Home;
