import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MyButton } from "../Utils";
import React, { useEffect, useState } from "react";
import MyModal from "../components/MyModal";
import { useDispatch } from "react-redux";
import { getUsers } from "../features/users/UserSlice";
import UsersTable from "../components/UsersTable";

const useStyles = makeStyles((theme) => ({
  usersHeaders: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function Users() {
  const classes = useStyles();

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <Container fixed>
        <div className={classes.usersHeaders}>
          <h3>Gestion des utilisateurs</h3>
        </div>
        <UsersTable />
      </Container>
    </div>
  );
}

export default Users;
