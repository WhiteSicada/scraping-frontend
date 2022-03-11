import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Notification from "./components/controls/Notification";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1565C0",
			light: "#fcd1b6",
		},
		secondary: {
			main: "#1565C0",
			light: "#f8324526",
		},
		background: {
			default: "#fff",
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: "translateZ(0)",
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

const ROLES = {
	ROLE_USER: "ROLE_USER",
	ROLE_ADMIN: "ROLE_ADMIN",
};

const AppLayout = () => (
	<>
		<Header />
		<main>
			<Container fixed maxWidth="md">
				<Outlet />
			</Container>
			<Notification />
		</main>
	</>
);

function App() {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			autoHideDuration={2500}
		>
			<Router>
				<ThemeProvider theme={theme}>
					<Routes>
						{/* authenticated */}
						{/* Role Users */}
						<Route path="/" element={<AppLayout />}>
							<Route
								element={
									<RequireAuth
										allowedRoles={[ROLES.ROLE_USER, ROLES.ROLE_ADMIN]}
									/>
								}
							>
								<Route exact path="/" element={<Home />} />
								<Route exact path="/profile" element={<Profile />} />
							</Route>

							{/* <Route element={<RequireAuth allowedRoles={[ROLES.ROLE_USER]} />}>
							<Route exact path="/clients" element={<Clients />} />
						</Route> */}

							{/* Role Admin */}
							<Route
								element={<RequireAuth allowedRoles={[ROLES.ROLE_ADMIN]} />}
							>
								<Route exact path="/users" element={<Users />} />
							</Route>
						</Route>

						{/* Not authenticated */}
						<Route exact path="/login" element={<Login />} />
						<Route
							path="/logout"
							exact
							element={<Login message="User Logged Out Successfully." />}
						/>
						{/* Error routes */}
						<Route path="/" element={<AppLayout />}>
							<Route exact path="/unauthorized" element={<Unauthorized />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</Router>
		</SnackbarProvider>
	);
}

export default App;
