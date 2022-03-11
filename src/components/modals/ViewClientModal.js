import React from "react";
import MyModal from "../MyModal";
import ViewClient from "../ViewClient";

function ViewClientModal({
	openDialogViewClient,
	handleCloseDialogViewClient,
}) {
	return (
		<MyModal
			openDialog={openDialogViewClient}
			handleCloseDialog={handleCloseDialogViewClient}
		>
			<ViewClient />
		</MyModal>
	);
}

export default ViewClientModal;
