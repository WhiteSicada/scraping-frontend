import { Container } from "@mui/material";
import React, { useEffect } from "react";
import "../styles/Home.css";
import ClientsTable from "../components/ClientsTable";
import { useDispatch } from "react-redux";
import { getClients, selectClients } from "../features/clients/ClientsSlice";
import { useSelector } from "react-redux";

const headCells = [
  { id: "none", label: "" },
  { id: "nom", label: "Nom" },
  { id: "prenom", label: "Prenom" },
  { id: "email", label: "Email" },
  { id: "dateBirth", label: "Date de naissance" },
];

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, []);
  const clients = useSelector(selectClients);

  return (
    <div>
      <Container fixed>
        <ClientsTable list={clients} headCells={headCells} />
      </Container>
    </div>
  );
}

export default Home;
