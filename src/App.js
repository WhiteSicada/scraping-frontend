import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Clients from "./pages/Clients";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2FA561",
      light: "#fcd1b6",
    },
    secondary: {
      main: "#4682B4",
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

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          {/* authenticated */}
          {/* Role Users */}
          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.ROLE_USER, ROLES.ROLE_ADMIN]} />
            }
          >
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ROLE_USER]} />}>
            <Route exact path="/clients" element={<Clients />} />
          </Route>

          {/* Role Admin */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ROLE_ADMIN]} />}>
            <Route exact path="/users" element={<Users />} />
          </Route>

          {/* Not authenticated */}
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/logout"
            exact
            element={<Login message="User Logged Out Successfully." />}
          />
          <Route exact path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
