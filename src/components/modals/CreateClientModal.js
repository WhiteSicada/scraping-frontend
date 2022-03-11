import React from "react";
import AddClientForm from "../../forms/clients/AddClientForm";
import MyModal from "../MyModal";

function CreateClientModal({
	openDialogCreateClient,
	handleCloseDialogCreateClient,
}) {
	return (
		<MyModal
			openDialog={openDialogCreateClient}
			handleCloseDialog={handleCloseDialogCreateClient}
		>
			<h4>Création de client</h4>
			<AddClientForm
				handleCloseDialogCreateClient={handleCloseDialogCreateClient}
			/>
		</MyModal>
	);
}

export default CreateClientModal;
