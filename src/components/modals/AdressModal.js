import React from "react";
import AdressForm from "../../forms/clients/AdressForm";
import MyModal from "../MyModal";

function AdressModal({ openDialogAdress, handleCloseDialogAdress }) {
	return (
		<MyModal
			openDialog={openDialogAdress}
			handleCloseDialog={handleCloseDialogAdress}
		>
			<AdressForm handleCloseDialogAdress={handleCloseDialogAdress} />
		</MyModal>
	);
}

export default AdressModal;
