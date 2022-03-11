import React from "react";
import ConjointForm from "../../forms/clients/ConjointForm";
import MyModal from "../MyModal";

function ConjointModal({ openDialogConjoint, handleCloseDialogConjoint }) {
	return (
		<MyModal
			openDialog={openDialogConjoint}
			handleCloseDialog={handleCloseDialogConjoint}
		>
			<ConjointForm handleCloseDialogConjoint={handleCloseDialogConjoint} />
		</MyModal>
	);
}

export default ConjointModal;
