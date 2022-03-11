import {
	Avatar,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { deepOrange, lightBlue } from "@mui/material/colors";
import {
	logoutUser,
	selectIsLoggedIn,
	selectUser,
} from "../features/auth/AuthSlice";
import { StyledBadge, getFullName } from "../Utils";
import { useStylesHeader } from "../styles/ComponentStyles.js";
import useAuth from "../hooks/useAuth";

const settingsAdmin = [
	{ name: "Profile", link: "/profile" },
	{ name: "Users", link: "/users" },
];

function Header() {
	const classes = useStylesHeader();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const dispatch = useDispatch();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logout = () => {
		dispatch(logoutUser());
	};
	const user = useSelector(selectUser);

	const guestLinks = (
		<>
			<Link to="/login" className={classes.loginButton}>
				<span>Se connecter</span>
			</Link>
		</>
	);
	const userLinks = (
		<>
			<div className={classes.headerOption}>
				<h5>Bienvenue, {user && getFullName(user)}</h5>
			</div>
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							variant="dot"
						>
							<Avatar sx={{ bgcolor: lightBlue[300] }}>N</Avatar>
						</StyledBadge>
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: "45px" }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{settingsAdmin.map((setting, index) => (
						<Link key={index} to={setting.link} className="no-Link-style">
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">{setting.name}</Typography>
							</MenuItem>
						</Link>
					))}
					<MenuItem>
						<Link to={"/logout"} className="no-Link-style" onClick={logout}>
							<Typography textAlign="center">Se déconnecter</Typography>
						</Link>
					</MenuItem>
				</Menu>
			</Box>
		</>
	);

	return (
		<Container fixed maxWidth="md">
			<div className={classes.header}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<img
						className={classes.header__logo}
						src={require("../images/instagram.png")}
						alt="amazon img"
					/>
				</Link>
				<div className={classes.headerOptions}>
					{user ? userLinks : guestLinks}
				</div>
			</div>
		</Container>
	);
}

export default Header;
