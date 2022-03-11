import React from "react";
import MyModal from "../MyModal";
import EnfantsSection from "../EnfantsSection";

function EnfantsModal({
	openDialogEnfants,
	handleCloseDialogEnfants,
	setConfirmDialog,
}) {
	return (
		<MyModal
			openDialog={openDialogEnfants}
			handleCloseDialog={handleCloseDialogEnfants}
		>
			<EnfantsSection setConfirmDialog={setConfirmDialog} />
		</MyModal>
	);
}

export default EnfantsModal;
