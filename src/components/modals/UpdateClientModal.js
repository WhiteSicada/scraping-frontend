import React from "react";
import MyModal from "../MyModal";
import UpdateClientForm from "../../forms/clients/UpdateClientForm";

function UpdateClientModal({
	openDialogUpdateClient,
	handleCloseDialogUpdateClient,
}) {
	return (
		<MyModal
			openDialog={openDialogUpdateClient}
			handleCloseDialog={handleCloseDialogUpdateClient}
		>
			<h4 style={{ marginBottom: 20 }}>Modification de client</h4>
			<UpdateClientForm
				handleCloseDialogUpdateClient={handleCloseDialogUpdateClient}
			/>
		</MyModal>
	);
}

export default UpdateClientModal;
