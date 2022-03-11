import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTable from "./controls/useTable";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Button, InputAdornment, Toolbar, Tooltip } from "@mui/material";
import {
	Add,
	AttachMoney,
	ClearOutlined,
	Face,
	Female,
	ModeEditOutlineOutlined,
	Search,
	Visibility,
	Home,
} from "@mui/icons-material";
import { Controls } from "./controls/controls";
import { MyButton } from "../Utils";
import { getFullName } from "../helpers/ClientHelper";
import {
	deleteClient,
	sAdressToEdit,
	sClientToEdit,
	sConjointToEdit,
	tarifierClient,
} from "../features/clients/ClientsSlice";
import { useSnackbar } from "notistack";

function Row({
	client,
	setConfirmDialog,
	confirmDialog,
	setopenDialogUpdateClient,
	setopenDialogViewClient,
	setopenDialogAdress,
	setopenDialogConjoint,
	setopenDialogEnfants,
}) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		console.log(id);
		dispatch(deleteClient(id))
			.then((response) => {
				enqueueSnackbar("Client supprimé avec succés!", {
					variant: "success",
				});
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: "error" });
			});
	};
	return (
		<TableRow>
			<TableCell>{getFullName(client.nom, client.prenom)}</TableCell>
			{/* <TableCell>{client.prenom}</TableCell> */}
			<TableCell>{client.email}</TableCell>
			{/* <TableCell>
				{client?.dateNaissanceSouscripteur &&
					moment(client.dateNaissanceSouscripteur).format("DD/MM/yyyy")}
			</TableCell> */}
			<TableCell>
				<center>
					<Tooltip title="Tarification" arrow>
						<IconButton
							aria-label="Tarification"
							onClick={() => {
								dispatch(tarifierClient(client.id));
							}}
						>
							<AttachMoney />
						</IconButton>
					</Tooltip>
					<Tooltip title="Enfants" arrow>
						<IconButton
							aria-label="Enfants"
							onClick={() => {
								setopenDialogEnfants(true);
								dispatch(sClientToEdit(client));
							}}
						>
							<Face />
						</IconButton>
					</Tooltip>
					<Tooltip title="Conjoint" arrow>
						<IconButton
							aria-label="Conjoint"
							onClick={() => {
								dispatch(sClientToEdit(client));
								dispatch(sConjointToEdit(client.conjoint));
								setopenDialogConjoint(true);
							}}
						>
							<Female />
						</IconButton>
					</Tooltip>
					<Tooltip title="Adresse" arrow>
						<IconButton
							aria-label="Adresse"
							onClick={() => {
								dispatch(sClientToEdit(client));
								dispatch(sAdressToEdit(client.adress));
								setopenDialogAdress(true);
							}}
						>
							<Home />
						</IconButton>
					</Tooltip>
					<Tooltip title="Visualiser" arrow>
						<IconButton
							aria-label="Visualiser"
							onClick={() => {
								setopenDialogViewClient(true);
								dispatch(sClientToEdit(client));
							}}
						>
							<Visibility />
						</IconButton>
					</Tooltip>
					<Tooltip title="Modifier" arrow>
						<IconButton
							aria-label="Modifier"
							onClick={() => {
								setopenDialogUpdateClient(true);
								dispatch(sClientToEdit(client));
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
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(client.id);
									},
								});
							}}
						>
							<ClearOutlined />
						</IconButton>
					</Tooltip>
				</center>
			</TableCell>
		</TableRow>
	);
}

const useStyles = makeStyles((theme) => ({
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	pageContent: {
		marginTop: 5,
		padding: 15,
	},
	searchInput: {
		width: "50%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

function ClientsTable({
	list,
	headCells,
	setopenDialogCreateUser,
	setopenDialogUpdateClient,
	setopenDialogConjoint,
	setopenDialogAdress,
	setopenDialogViewClient,
	setopenDialogEnfants,
	setConfirmDialog,
	confirmDialog,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [filterFn, setFilterFn] = useState({
		fn: (list) => {
			return list;
		},
	});
	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(list, headCells, filterFn);
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (list) => {
				if (target.value == "") return list;
				else
					return list.filter((x) => {
						let fullname = getFullName(x.nom, x.prenom);
						return fullname.toLowerCase().includes(target.value);
					});
			},
		});
	};
	return (
		<div>
			<Paper className={classes.pageContent}>
				<Toolbar className={classes.toolbar}>
					<Controls.Input
						label="Cherchez par nom"
						className={classes.searchInput}
						id="search"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
					{/* <Link to="/create-client" className="no-Link-style"> */}
					<Button
						onClick={() => setopenDialogCreateUser(true)}
						startIcon={<Add />}
						variant="contained"
					>
						Ajouter utilisateur
					</Button>

					{/* </Link> */}
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPadingAndSorting().map((client, index) => (
							<Row
								key={index}
								client={client}
								setConfirmDialog={setConfirmDialog}
								setopenDialogUpdateClient={setopenDialogUpdateClient}
								setopenDialogViewClient={setopenDialogViewClient}
								setopenDialogConjoint={setopenDialogConjoint}
								setopenDialogAdress={setopenDialogAdress}
								setopenDialogEnfants={setopenDialogEnfants}
								confirmDialog={confirmDialog}
							/>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</div>
	);
}

export default ClientsTable;
