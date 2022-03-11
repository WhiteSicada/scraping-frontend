import {
	Add,
	ClearOutlined,
	ModeEditOutlineOutlined,
	Search,
} from "@mui/icons-material";
import moment from "moment";
import {
	InputAdornment,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/users/UserSlice";
import { MyButton } from "../../Utils";
import { Controls } from "./controls";
import useTable from "./useTable";
import { useSnackbar } from "notistack";

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

function MyTable({
	list,
	headCells,
	handleOpenDialogCreationUser,
	handleOpenDialogUpdateUser,
	setConfirmDialog,
	confirmDialog,
	setNotify,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openPopup, setOpenPopup] = useState(false);
	const [filterFn, setFilterFn] = useState({
		fn: (list) => {
			return list;
		},
	});
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (list) => {
				if (target.value == "") return list;
				else
					return list.filter((x) => x.nom.toLowerCase().includes(target.value));
			},
		});
	};
	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(list, headCells, filterFn);
	const { enqueueSnackbar } = useSnackbar();
	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteUser(id))
			.then((response) => {
				enqueueSnackbar("Utilisateur supprimé avec succés!", {
					variant: "success",
				});
			})
			.catch((error) => {
				enqueueSnackbar(error, { variant: "error" });
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

					<MyButton
						onClick={handleOpenDialogCreationUser}
						color1="#2FA561"
						color2="#0faf52"
						startIcon={<Add />}
					>
						Ajouter utilisateur
					</MyButton>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPadingAndSorting().map((user, index) => (
							<TableRow key={index}>
								{/* <TableCell>{itResponsable.id}</TableCell> */}
								<TableCell>{user.nom}</TableCell>
								<TableCell>{user.prenom}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									{user?.dateBirth &&
										moment(user.dateBirth).format("DD/MM/yyyy")}
								</TableCell>
								<TableCell>
									<Controls.ActionButton
										text={"Edit"}
										color="primary"
										onClick={() => {
											handleOpenDialogUpdateUser(user);
										}}
									>
										<ModeEditOutlineOutlined />
									</Controls.ActionButton>
									<Controls.ActionButton
										text={"Delete"}
										color="primary"
										onClick={() => {
											setConfirmDialog({
												isOpen: true,
												title: "Are you sure to delete this record?",
												subTitle: "You can't undo this operation",
												onConfirm: () => {
													onDelete(user.id);
												},
											});
										}}
									>
										<ClearOutlined />
									</Controls.ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</div>
	);
}

export default MyTable;
