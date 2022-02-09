import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useTable from "./controls/useTable";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { InputAdornment, Toolbar } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { Controls } from "./controls/controls";
import { MyButton } from "../Utils";
import moment from "moment";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row({ user }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{user.nom}</TableCell>
        <TableCell>{user.prenom}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {user?.dateBirth && moment(user.dateBirth).format("DD/MM/yyyy")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageContent: {
    marginTop: 20,
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

function ClientsTable({ list, headCells }) {
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
          return list.filter((x) => x.nom.toLowerCase().includes(target.value));
      },
    });
  };
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Toolbar className={classes.toolbar}>
          <Controls.Input
            label="Search Employees"
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
            // onClick={handleOpenDialogCreationUser}
            color1="#2FA561"
            color2="#0faf52"
            startIcon={<Add />}
          >
            Ajouter utilisateur
          </MyButton>
        </Toolbar>
        <TblContainer>
          <Table aria-label="collapsible table">
            <TblHead />
            <TableBody>
              {recordsAfterPadingAndSorting().map((user, index) => (
                <Row key={index} user={user} />
              ))}
            </TableBody>
          </Table>
        </TblContainer>
        <TblPagination />
      </Paper>
    </div>
  );
}

export default ClientsTable;
