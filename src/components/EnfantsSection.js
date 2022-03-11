import { ClearOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import {
	Avatar,
	Card,
	CardHeader,
	Grid,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteEnfant,
	selectClientToEdit,
	sEnfantToEdit,
} from "../features/clients/ClientsSlice";
import EnfantForm from "../forms/clients/EnfantForm";

function EnfantsSection({ setConfirmDialog }) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const clientToEdit = useSelector(selectClientToEdit);
	const onDelete = (id) => {
		setConfirmDialog({
			title: "Are you sure to delete this record?",
			subTitle: "You can't undo this operation",
			isOpen: false,
		});
		dispatch(deleteEnfant({ clientId: clientToEdit.id, enfantId: id }))
			.then((response) => {
				enqueueSnackbar("Enfant supprimé avec succés!", {
					variant: "success",
				});
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: "error" });
			});
	};
	return (
		<div>
			<h4 style={{ marginBottom: 20 }}>Enfant Form</h4>
			<EnfantForm clientToEdit={clientToEdit} />
			<h4 style={{ marginTop: 20 }}>Liste des enfants</h4>
			{/* <pre>{JSON.stringify(enfantToEdit, null, 2)}</pre> */}
			<Grid container spacing={2}>
				{clientToEdit?.enfantList?.map((item, index) => (
					<Grid item xs={4} key={index}>
						<Card>
							<CardHeader
								avatar={
									<Avatar sx={{ width: 30, height: 30 }} aria-label="enfant">
										R
									</Avatar>
								}
								action={
									<>
										<Tooltip title="Modifier" arrow>
											<IconButton
												aria-label="Modifier"
												onClick={() => {
													dispatch(sEnfantToEdit(item));
												}}
											>
												<ModeEditOutlineOutlined />
											</IconButton>
										</Tooltip>
										<Tooltip title="Supprimer" arrow>
											<IconButton
												aria-label="Supprimer"
												onClick={() => {
													setConfirmDialog({
														isOpen: true,
														title: "Vous voulez vraiment supprimer cet enfant?",
														subTitle: "Vous ne pouvez pas annuler.",
														onConfirm: () => {
															onDelete(item.id);
														},
													});
												}}
											>
												<ClearOutlined />
											</IconButton>
										</Tooltip>
									</>
								}
								title={"Enfant " + (index + 1)}
							/>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default EnfantsSection;
